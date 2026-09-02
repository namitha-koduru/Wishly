import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTemplateById } from '../templates/templateRegistry.js';
import { getOccasionById } from '../data/occasions.js';
import { SAMPLE_PHOTOS } from '../data/samplePhotos.js';
import { createWish, uploadImages, deleteImage, APP_BASE_URL } from '../services/api.js';

export function Customize() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const template = getTemplateById(templateId);
  const fileInputRef = useRef(null);

  // Occasion metadata
  const occasion = template ? getOccasionById(template.occasion) : null;

  // Customization Form State
  const [formData, setFormData] = useState(() => {
    if (!template) return {};
    const defaultPhotos = template.defaultData?.photos
      ? template.defaultData.photos.map((url, i) => ({
          id: `sample_${i}`,
          url,
          status: 'uploaded',
          caption: ''
        }))
      : [];

    return {
      recipientName: '',
      senderName: '',
      message: '',
      photos: defaultPhotos,
      date: template.defaultData?.date || '',
      age: template.defaultData?.age || '',
      years: template.defaultData?.years || '',
      degree: template.defaultData?.degree || '',
      classYear: template.defaultData?.classYear || '',
      teamName: template.defaultData?.teamName || '',
      achievement: template.defaultData?.achievement || '',
      reasons: template.defaultData?.reasons ? [...template.defaultData.reasons] : [],
      milestones: template.defaultData?.milestones ? [...template.defaultData.milestones] : []
    };
  });

  // Track local created object URLs to properly revoke on cleanup
  const createdObjectUrlsRef = useRef(new Set());

  // UI States
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [validationError, setValidationError] = useState('');
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedModal, setGeneratedModal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // For mobile: 'editor' | 'preview'
  const [uploadError, setUploadError] = useState('');

  // Clean up object URLs on component unmount
  useEffect(() => {
    const urls = createdObjectUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      });
    };
  }, []);

  if (!template) {
    return (
      <div className="container text-center py-5">
        <h2>Template Not Found</h2>
        <p>The template you selected could not be found.</p>
        <Link to="/templates" className="btn btn-primary mt-3">Browse Templates</Link>
      </div>
    );
  }

  const supported = template.supportedFields || [];
  const isUploadingPhotos = formData.photos?.some((p) => p.status === 'uploading');

  // Field change handler
  const handleFieldChange = (field, value) => {
    if (field === 'recipientName' && validationError) {
      setValidationError('');
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    triggerDraftSaved();
  };

  // Trigger gentle "Draft saved" pulse
  const triggerDraftSaved = () => {
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 2000);
  };

  // Multi-Photo Upload Handler with Instant Preview + Background Cloudinary Upload
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadError('');

    // 1. Validate files
    const validFiles = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setUploadError(`File "${file.name}" is not an image (JPEG, PNG, WebP only).`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`File "${file.name}" is too large (maximum 10MB).`);
        return;
      }
      validFiles.push(file);
    }

    if (!validFiles.length) return;

    // 2. Create instant local previews immediately for zero perceived latency
    const pendingItems = validFiles.map((file, i) => {
      const tempUrl = URL.createObjectURL(file);
      createdObjectUrlsRef.current.add(tempUrl);
      return {
        id: `upload_${Date.now()}_${i}`,
        file,
        url: tempUrl,
        status: 'uploading', // 'uploading' | 'uploaded' | 'error'
        caption: ''
      };
    });

    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ...pendingItems]
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // 3. Upload to backend/Cloudinary concurrently
    try {
      const uploadRes = await uploadImages(validFiles, template.occasion || 'general');

      if (uploadRes.success && uploadRes.images) {
        setFormData((prev) => {
          const updated = [...(prev.photos || [])];
          pendingItems.forEach((pending, index) => {
            const uploadedImage = uploadRes.images[index];
            const targetIdx = updated.findIndex((p) => p.id === pending.id);
            if (targetIdx !== -1 && uploadedImage) {
              updated[targetIdx] = {
                ...updated[targetIdx],
                url: uploadedImage.url,
                publicId: uploadedImage.publicId,
                width: uploadedImage.width,
                height: uploadedImage.height,
                status: 'uploaded'
              };
            }
          });
          return { ...prev, photos: updated };
        });
        triggerDraftSaved();
      }
    } catch (err) {
      console.error('Photo upload failed:', err);
      setUploadError('Failed to upload photos to cloud storage. You can still preview locally.');
      // Mark failed uploads
      setFormData((prev) => {
        const updated = [...(prev.photos || [])];
        pendingItems.forEach((pending) => {
          const targetIdx = updated.findIndex((p) => p.id === pending.id);
          if (targetIdx !== -1 && updated[targetIdx].status === 'uploading') {
            updated[targetIdx] = {
              ...updated[targetIdx],
              status: 'error'
            };
          }
        });
        return { ...prev, photos: updated };
      });
    }
  };

  // Quick sample photo pick
  const handleAddSamplePhoto = (sampleUrl) => {
    setFormData((prev) => ({
      ...prev,
      photos: [
        ...(prev.photos || []),
        {
          id: `sample_${Date.now()}`,
          url: sampleUrl,
          status: 'uploaded',
          caption: ''
        }
      ]
    }));
    triggerDraftSaved();
  };

  // Remove photo
  const handleRemovePhoto = (index) => {
    const photo = formData.photos[index];
    if (photo?.publicId) {
      // Background delete from Cloudinary
      deleteImage(photo.publicId).catch(() => {});
    }
    if (photo?.url && createdObjectUrlsRef.current.has(photo.url)) {
      try {
        URL.revokeObjectURL(photo.url);
        createdObjectUrlsRef.current.delete(photo.url);
      } catch (e) {}
    }

    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    triggerDraftSaved();
  };

  // Photo caption update
  const handleCaptionChange = (index, caption) => {
    setFormData((prev) => {
      const updatedPhotos = [...prev.photos];
      if (updatedPhotos[index]) {
        updatedPhotos[index] = {
          ...updatedPhotos[index],
          caption
        };
      }
      return {
        ...prev,
        photos: updatedPhotos
      };
    });
  };

  // Reset form to template defaults
  const handleResetToDefault = () => {
    if (window.confirm('Reset all fields to template default preview?')) {
      const defaultPhotos = template.defaultData?.photos
        ? template.defaultData.photos.map((url, i) => ({
            id: `sample_${i}`,
            url,
            status: 'uploaded',
            caption: ''
          }))
        : [];

      setFormData({
        recipientName: '',
        senderName: '',
        message: '',
        photos: defaultPhotos,
        ...template.defaultData
      });
      setValidationError('');
      setUploadError('');
    }
  };

  // Extract plain photo URLs for template rendering
  const photoUrls = (formData.photos || [])
    .map((p) => (typeof p === 'object' ? p.url : p))
    .filter(Boolean);

  // Prepare safe preview data with graceful fallback defaults
  const previewData = {
    ...formData,
    recipientName: formData.recipientName?.trim() || 'Someone Special',
    senderName: formData.senderName?.trim() || 'Someone who cares',
    message: formData.message?.trim() || template.defaultData?.message || 'Your heartfelt wishes and memories will appear here.',
    photos: photoUrls.length > 0 ? photoUrls : (template.defaultData?.photos || SAMPLE_PHOTOS.slice(0, 2))
  };

  // Generate Wish Handler with Cloudinary image URLs and backend persistence
  const handleGenerateWish = async () => {
    // 1. Validation
    if (!formData.recipientName || !formData.recipientName.trim()) {
      setValidationError('Tell us who this wish is for 💛');
      const input = document.getElementById('recipientName');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (isUploadingPhotos) {
      alert('Please wait for photos to finish uploading before generating.');
      return;
    }

    setIsGenerating(true);

    try {
      // 2. Prepare permanent photos payload
      const permanentPhotos = (formData.photos || []).map((p) => {
        if (typeof p === 'object' && p.url) {
          return {
            url: p.url,
            publicId: p.publicId || null,
            caption: p.caption || ''
          };
        }
        return { url: p };
      });

      const wishPayload = {
        occasion: template.occasion,
        templateId: template.id,
        recipientName: formData.recipientName.trim(),
        senderName: formData.senderName.trim() || '',
        message: formData.message.trim() || template.defaultData?.message || '',
        photos: permanentPhotos,
        customData: {
          date: formData.date || '',
          age: formData.age || '',
          years: formData.years || '',
          degree: formData.degree || '',
          classYear: formData.classYear || '',
          teamName: formData.teamName || '',
          achievement: formData.achievement || ''
        }
      };

      // 3. Call backend API
      const result = await createWish(wishPayload);
      const projectId = result.projectId;

      // Also mirror to localStorage for instant local backup
      try {
        localStorage.setItem(`wishly_project_${projectId}`, JSON.stringify({
          projectId,
          ...wishPayload,
          createdAt: new Date().toISOString()
        }));
      } catch (e) {}

      // 4. Construct share URL with configurable base URL
      const baseUrl = APP_BASE_URL.replace(/\/$/, '');
      const shareUrl = `${baseUrl}/w/${projectId}`;

      setGeneratedModal({
        projectId,
        shareUrl,
        recipientName: wishPayload.recipientName,
        senderName: wishPayload.senderName
      });
    } catch (error) {
      console.error('Failed to save wish to backend:', error);

      // Graceful fallback for local development if server is unreachable
      const fallbackId = Math.random().toString(36).substring(2, 9);
      const fallbackPayload = {
        projectId: fallbackId,
        occasion: template.occasion,
        templateId: template.id,
        recipientName: formData.recipientName.trim(),
        senderName: formData.senderName.trim() || '',
        message: formData.message.trim() || '',
        photos: (formData.photos || []).map((p) => (typeof p === 'object' ? p.url : p)),
        customData: {
          date: formData.date,
          age: formData.age,
          years: formData.years,
          degree: formData.degree,
          classYear: formData.classYear,
          teamName: formData.teamName,
          achievement: formData.achievement
        },
        createdAt: new Date().toISOString()
      };

      localStorage.setItem(`wishly_project_${fallbackId}`, JSON.stringify(fallbackPayload));

      const baseUrl = APP_BASE_URL.replace(/\/$/, '');
      const shareUrl = `${baseUrl}/w/${fallbackId}`;

      setGeneratedModal({
        projectId: fallbackId,
        shareUrl,
        recipientName: fallbackPayload.recipientName,
        senderName: fallbackPayload.senderName
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyShareLink = () => {
    if (generatedModal) {
      navigator.clipboard.writeText(generatedModal.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // WhatsApp Share Trigger
  const handleWhatsAppShare = () => {
    if (!generatedModal) return;
    const text = `I made something special for you on Wishly ✨\nOpen your surprise here: ${generatedModal.shareUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Native Web Share API Trigger
  const handleNativeShare = async () => {
    if (!generatedModal) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A special Wishly for ${generatedModal.recipientName} ✨`,
          text: `I created a personalized website for you on Wishly! Open it here:`,
          url: generatedModal.shareUrl
        });
      } catch (err) {
        // User canceled or failed
      }
    } else {
      handleCopyShareLink();
    }
  };

  return (
    <div className="customization-studio">
      {/* Studio Top Control Bar */}
      <header className="studio-topbar">
        <div className="container studio-topbar-inner">
          <div className="studio-topbar-left">
            <Link to={`/templates/${template.occasion}`} className="back-link">
              ← Templates
            </Link>
            <div className="studio-badge-group">
              <span className="studio-occasion-badge" style={{ backgroundColor: `${template.previewColor}15`, color: template.previewColor }}>
                {occasion?.icon || '✨'} {occasion?.name || template.occasion}
              </span>
              <span className="studio-template-name">{template.name}</span>
            </div>
          </div>

          {/* Desktop/Mobile Device Switcher */}
          <div className="studio-topbar-center">
            <div className="device-switcher" role="group" aria-label="Device Preview Mode">
              <button
                type="button"
                className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceMode('desktop')}
                title="Desktop Preview"
              >
                🖥️ Desktop
              </button>
              <button
                type="button"
                className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceMode('mobile')}
                title="Mobile Preview"
              >
                📱 Mobile
              </button>
            </div>
          </div>

          <div className="studio-topbar-right">
            <div className="draft-indicator">
              {isDraftSaved ? (
                <span className="draft-saved-text">✅ Draft saved</span>
              ) : (
                <span className="draft-idle-text">● Auto-saving</span>
              )}
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleResetToDefault}
              title="Reset form"
            >
              Reset
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm studio-generate-btn pulse-glow"
              onClick={handleGenerateWish}
              disabled={isGenerating || isUploadingPhotos}
            >
              {isUploadingPhotos ? 'Uploading memories... ⏳' : (isGenerating ? 'Creating Wishly... ✨' : '✨ Generate Wish')}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Tab Switcher (Customize vs Preview) */}
      <div className="mobile-studio-tabs">
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          ✍️ Customize Form
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Live Preview ({deviceMode})
        </button>
      </div>

      {/* Main Studio Workspace */}
      <main className="container studio-workspace">
        {/* Left Side: Customization Sidebar */}
        <section className={`studio-editor-panel ${activeTab === 'editor' ? 'mobile-visible' : 'mobile-hidden'}`}>
          {/* Occasion Greeting Card */}
          <div className="occasion-greeting-banner" style={{ borderLeftColor: template.previewColor }}>
            <span className="greeting-icon">{occasion?.icon || '✨'}</span>
            <div className="greeting-text">
              <h4>{occasion?.tagline || 'Wishes, made personal.'}</h4>
              <p>Personalize this website for {formData.recipientName || 'your special person'}.</p>
            </div>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div className="validation-alert" role="alert">
              <span className="alert-icon">⚠️</span>
              <span className="alert-msg">{validationError}</span>
            </div>
          )}

          {/* Upload Error Alert */}
          {uploadError && (
            <div className="validation-alert" style={{ background: '#fff0f0', borderColor: '#ffcdd2', color: '#c62828' }} role="alert">
              <span className="alert-icon">⚠️</span>
              <span className="alert-msg">{uploadError}</span>
            </div>
          )}

          <form className="studio-form" onSubmit={(e) => e.preventDefault()}>
            {/* Section 1: Your Person */}
            <div className="form-section">
              <h3 className="section-title-sm">1. Your Person</h3>

              {/* Recipient Name (Required) */}
              <div className="form-field-group">
                <label htmlFor="recipientName" className="form-label">
                  What's their name? <span className="required-star">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="input-prefix-icon">✨</span>
                  <input
                    id="recipientName"
                    type="text"
                    className={`form-control ${validationError ? 'input-error' : ''}`}
                    placeholder="e.g. Ananya, Alex, Mom & Dad"
                    value={formData.recipientName}
                    onChange={(e) => handleFieldChange('recipientName', e.target.value)}
                    autoFocus
                  />
                </div>
                {validationError && (
                  <span className="field-error-text">{validationError}</span>
                )}
              </div>

              {/* Sender Name */}
              {supported.includes('senderName') && (
                <div className="form-field-group">
                  <label htmlFor="senderName" className="form-label">
                    Your Name / Signature
                  </label>
                  <div className="input-with-icon">
                    <span className="input-prefix-icon">✍️</span>
                    <input
                      id="senderName"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Someone who loves you, The Whole Crew"
                      value={formData.senderName}
                      onChange={(e) => handleFieldChange('senderName', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Section 2: Your Message */}
            {supported.includes('message') && (
              <div className="form-section">
                <h3 className="section-title-sm">2. Your Message</h3>
                <div className="form-field-group">
                  <label htmlFor="message" className="form-label">
                    Write something from the heart...
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="form-control textarea-field"
                    placeholder="Write something from the heart..."
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                  ></textarea>
                  <span className="field-hint">
                    Tips: Share a favorite memory, an inside joke, or heartfelt gratitude.
                  </span>
                </div>
              </div>
            )}

            {/* Section 3: Your Memories & Photos */}
            {supported.includes('photos') && (
              <div className="form-section">
                <div className="section-title-row">
                  <h3 className="section-title-sm">3. Your Memories</h3>
                  <span className="photos-count-badge">
                    {formData.photos?.length || 0} photo{formData.photos?.length === 1 ? '' : 's'}
                  </span>
                </div>

                {/* Upload Drag/Click Zone */}
                <div
                  className="photo-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden-file-input"
                    onChange={handleFileUpload}
                  />
                  <div className="dropzone-icon">📸</div>
                  <h4 className="dropzone-title">Add your memories</h4>
                  <p className="dropzone-sub">Upload photos directly to secure cloud storage (JPEG, PNG, WebP)</p>
                  <button type="button" className="btn btn-secondary btn-sm dropzone-btn">
                    + Upload Photos
                  </button>
                </div>

                {/* Quick Add Sample Photos */}
                <div className="quick-samples-row">
                  <span className="quick-sample-label">Or try sample photos:</span>
                  <div className="quick-sample-pills">
                    {SAMPLE_PHOTOS.slice(0, 4).map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        className="sample-pill-btn"
                        onClick={() => handleAddSamplePhoto(url)}
                        title="Add sample celebration photo"
                      >
                        <img src={url} alt={`Sample ${i}`} />
                        <span>+ Sample</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Uploaded Photos Grid with Status Indicators & Captions */}
                {formData.photos && formData.photos.length > 0 && (
                  <div className="uploaded-thumbnails-list">
                    {formData.photos.map((item, idx) => {
                      const photoUrl = typeof item === 'object' ? item.url : item;
                      const status = typeof item === 'object' ? item.status : 'uploaded';
                      const caption = typeof item === 'object' ? item.caption : '';

                      return (
                        <div key={item.id || idx} className="thumbnail-card">
                          <div className="thumbnail-img-wrap">
                            <img src={photoUrl} alt={`Memory ${idx + 1}`} />

                            {/* Status Overlay */}
                            {status === 'uploading' && (
                              <div className="thumbnail-status-overlay">
                                <span className="status-spinner">⏳</span>
                                <span className="status-text">Uploading...</span>
                              </div>
                            )}

                            {status === 'uploaded' && (
                              <div className="thumbnail-status-badge">
                                <span>✓</span>
                              </div>
                            )}

                            {status === 'error' && (
                              <div className="thumbnail-status-overlay error-overlay">
                                <span>⚠️ Error</span>
                              </div>
                            )}

                            <button
                              type="button"
                              className="thumbnail-delete-btn"
                              onClick={() => handleRemovePhoto(idx)}
                              title="Remove photo"
                              aria-label={`Remove photo ${idx + 1}`}
                            >
                              ✕
                            </button>
                          </div>
                          <input
                            type="text"
                            className="thumbnail-caption-input"
                            placeholder="Add caption (optional)..."
                            value={caption}
                            onChange={(e) => handleCaptionChange(idx, e.target.value)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Section 4: Extra Details */}
            {(supported.includes('date') ||
              supported.includes('age') ||
              supported.includes('years') ||
              supported.includes('degree') ||
              supported.includes('classYear') ||
              supported.includes('teamName') ||
              supported.includes('achievement')) && (
              <div className="form-section">
                <h3 className="section-title-sm">4. Extra Details</h3>

                {/* Date */}
                {supported.includes('date') && (
                  <div className="form-field-group">
                    <label htmlFor="date" className="form-label">Occasion Date / Subtitle</label>
                    <input
                      id="date"
                      type="text"
                      className="form-control"
                      placeholder="e.g. October 14, Special Day"
                      value={formData.date}
                      onChange={(e) => handleFieldChange('date', e.target.value)}
                    />
                  </div>
                )}

                {/* Birthday Age */}
                {supported.includes('age') && (
                  <div className="form-field-group">
                    <label htmlFor="age" className="form-label">Age or Milestone</label>
                    <input
                      id="age"
                      type="text"
                      className="form-control"
                      placeholder="e.g. 21, 30th, Sweet 16"
                      value={formData.age}
                      onChange={(e) => handleFieldChange('age', e.target.value)}
                    />
                  </div>
                )}

                {/* Anniversary Years */}
                {supported.includes('years') && (
                  <div className="form-field-group">
                    <label htmlFor="years" className="form-label">Years of Togetherness</label>
                    <input
                      id="years"
                      type="text"
                      className="form-control"
                      placeholder="e.g. 5 Beautiful Years, Silver Jubilee"
                      value={formData.years}
                      onChange={(e) => handleFieldChange('years', e.target.value)}
                    />
                  </div>
                )}

                {/* Graduation Degree & Class */}
                {supported.includes('degree') && (
                  <div className="form-field-group">
                    <label htmlFor="degree" className="form-label">Degree / Field of Study</label>
                    <input
                      id="degree"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Bachelor of Computer Science"
                      value={formData.degree}
                      onChange={(e) => handleFieldChange('degree', e.target.value)}
                    />
                  </div>
                )}

                {supported.includes('classYear') && (
                  <div className="form-field-group">
                    <label htmlFor="classYear" className="form-label">Class Year</label>
                    <input
                      id="classYear"
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2026"
                      value={formData.classYear}
                      onChange={(e) => handleFieldChange('classYear', e.target.value)}
                    />
                  </div>
                )}

                {/* Farewell Team */}
                {supported.includes('teamName') && (
                  <div className="form-field-group">
                    <label htmlFor="teamName" className="form-label">Team / Organization Name</label>
                    <input
                      id="teamName"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Design & Tech Crew"
                      value={formData.teamName}
                      onChange={(e) => handleFieldChange('teamName', e.target.value)}
                    />
                  </div>
                )}

                {/* Congratulations Achievement */}
                {supported.includes('achievement') && (
                  <div className="form-field-group">
                    <label htmlFor="achievement" className="form-label">Achievement / Milestone Title</label>
                    <input
                      id="achievement"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Senior Promotion, Marathon Finisher"
                      value={formData.achievement}
                      onChange={(e) => handleFieldChange('achievement', e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Bottom Generate Button inside sidebar */}
            <div className="editor-bottom-cta">
              <button
                type="button"
                className="btn btn-primary btn-block btn-lg pulse-glow"
                onClick={handleGenerateWish}
                disabled={isGenerating || isUploadingPhotos}
              >
                {isUploadingPhotos ? 'Uploading memories... ⏳' : (isGenerating ? 'Creating your Wishly... ✨' : '✨ Generate Wish')}
              </button>
            </div>
          </form>
        </section>

        {/* Right Side: Reactive Live Preview Studio */}
        <section className={`studio-preview-panel ${activeTab === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}>
          <div className="preview-stage-wrapper">
            <div className={`preview-device-mockup frame-${deviceMode}`}>
              {/* Device Browser Chrome Header */}
              <div className="mockup-chrome-header">
                <div className="browser-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="mockup-address-bar">
                  <span className="lock-icon">🔒</span>
                  <span className="mockup-url">
                    wishly.app/{template.occasion}/{formData.recipientName ? encodeURIComponent(formData.recipientName.toLowerCase().replace(/\s+/g, '-')) : 'your-wish'}
                  </span>
                </div>
                <div className="mockup-live-tag">
                  <span className="live-dot"></span> LIVE
                </div>
              </div>

              {/* Live Preview Viewport */}
              <div className="mockup-viewport">
                {React.createElement(template.component, {
                  data: previewData
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Generated Wish Celebration Share Modal */}
      {generatedModal && (
        <div className="preview-modal-backdrop" onClick={() => setGeneratedModal(null)}>
          <div className="share-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-content text-center">
              <span className="share-celebrate-emoji">🎉</span>
              <h2>Your Wishly is ready!</h2>
              <p>
                Your personalized website for <strong>{generatedModal.recipientName}</strong> has been generated with permanent cloud storage. Anyone opening this link can experience it instantly without logging in!
              </p>

              {/* Public Share Link Box */}
              <div className="share-link-input-box">
                <input
                  type="text"
                  readOnly
                  value={generatedModal.shareUrl}
                  className="share-link-input"
                  onClick={(e) => e.target.select()}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCopyShareLink}
                >
                  {copied ? 'Link copied! ✨' : 'Copy Link'}
                </button>
              </div>

              {/* Share Actions Grid: WhatsApp, Web Share, Open, Edit */}
              <div className="share-actions-grid">
                <button
                  type="button"
                  className="btn btn-whatsapp"
                  onClick={handleWhatsAppShare}
                  title="Share directly via WhatsApp"
                >
                  <span className="action-btn-icon">💬</span> Share on WhatsApp
                </button>

                {typeof navigator !== 'undefined' && navigator.share && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleNativeShare}
                    title="Share using your device options"
                  >
                    <span className="action-btn-icon">📤</span> Share
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate(`/w/${generatedModal.projectId}`)}
                >
                  Open Wish ↗
                </button>
              </div>

              <div className="share-modal-footer-note">
                <button
                  type="button"
                  className="btn-text-link"
                  onClick={() => setGeneratedModal(null)}
                >
                  ← Keep Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customize;
