import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTemplateById } from '../templates/templateRegistry.js';
import { getOccasionById } from '../data/occasions.js';
import { SAMPLE_PHOTOS } from '../data/samplePhotos.js';

export function Customize() {
  const { templateId, occasion: routeOccasion } = useParams();
  const navigate = useNavigate();
  const template = getTemplateById(templateId);
  const fileInputRef = useRef(null);

  // Occasion metadata
  const occasion = template ? getOccasionById(template.occasion) : null;

  // Customization Form State
  const [formData, setFormData] = useState(() => {
    if (!template) return {};
    return {
      recipientName: '',
      senderName: '',
      message: '',
      photos: template.defaultData?.photos ? [...template.defaultData.photos] : [],
      photoCaptions: {},
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
  const [generatedModal, setGeneratedModal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // For mobile: 'editor' | 'preview'

  // Update when templateId changes
  useEffect(() => {
    if (template) {
      setFormData((prev) => ({
        ...prev,
        photos: template.defaultData?.photos ? [...template.defaultData.photos] : prev.photos,
        date: template.defaultData?.date || prev.date,
        age: template.defaultData?.age || prev.age,
        years: template.defaultData?.years || prev.years,
        degree: template.defaultData?.degree || prev.degree,
        classYear: template.defaultData?.classYear || prev.classYear,
        teamName: template.defaultData?.teamName || prev.teamName,
        achievement: template.defaultData?.achievement || prev.achievement
      }));
    }
  }, [templateId]);

  // Clean up object URLs on component unmount
  useEffect(() => {
    const urls = createdObjectUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          // ignore cleanup errors
        }
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

  // Browser Multi-Photo Upload Handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPhotoUrls = [];
    files.forEach((file) => {
      // Validate image type
      if (!file.type.startsWith('image/')) {
        alert(`File "${file.name}" is not an image.`);
        return;
      }
      // Validate size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File "${file.name}" is too large (max 10MB).`);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      createdObjectUrlsRef.current.add(objectUrl);
      newPhotoUrls.push(objectUrl);
    });

    if (newPhotoUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: [...(prev.photos || []), ...newPhotoUrls]
      }));
      triggerDraftSaved();
    }

    // Reset file input so re-selecting same file works
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Quick sample photo pick
  const handleAddSamplePhoto = (sampleUrl) => {
    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), sampleUrl]
    }));
    triggerDraftSaved();
  };

  // Remove photo
  const handleRemovePhoto = (index) => {
    const removedUrl = formData.photos[index];
    if (createdObjectUrlsRef.current.has(removedUrl)) {
      try {
        URL.revokeObjectURL(removedUrl);
        createdObjectUrlsRef.current.delete(removedUrl);
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
    setFormData((prev) => ({
      ...prev,
      photoCaptions: {
        ...prev.photoCaptions,
        [index]: caption
      }
    }));
  };

  // Reset form to template defaults
  const handleResetToDefault = () => {
    if (window.confirm('Reset all fields to template default preview?')) {
      setFormData({
        recipientName: '',
        senderName: '',
        message: '',
        photos: template.defaultData?.photos ? [...template.defaultData.photos] : [],
        photoCaptions: {},
        ...template.defaultData
      });
      setValidationError('');
    }
  };

  // Prepare safe preview data with graceful fallback defaults
  const previewData = {
    ...formData,
    recipientName: formData.recipientName?.trim() || 'Someone Special',
    senderName: formData.senderName?.trim() || 'Someone who cares',
    message: formData.message?.trim() || template.defaultData?.message || 'Your heartfelt wishes and memories will appear here.',
    photos: formData.photos && formData.photos.length > 0 ? formData.photos : (template.defaultData?.photos || SAMPLE_PHOTOS.slice(0, 2))
  };

  // Generate Wish Handler
  const handleGenerateWish = () => {
    // 1. Validation
    if (!formData.recipientName || !formData.recipientName.trim()) {
      setValidationError('Tell us who this wish is for 💛');
      // Scroll to top of form panel if on desktop or mobile
      const input = document.getElementById('recipientName');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // 2. Build Project Object
    const projectId = Math.random().toString(36).substring(2, 9);
    const wishPayload = {
      projectId,
      occasion: template.occasion,
      templateId: template.id,
      recipientName: formData.recipientName.trim(),
      senderName: formData.senderName.trim() || 'A Secret Admirer',
      message: formData.message.trim() || template.defaultData?.message || 'Wishing you the best!',
      photos: formData.photos || [],
      photoCaptions: formData.photoCaptions || {},
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

    // 3. Save to localStorage
    try {
      localStorage.setItem(`wishly_project_${projectId}`, JSON.stringify(wishPayload));
    } catch (e) {
      console.warn('Could not save full payload to localStorage (likely quota from blob URLs)', e);
    }

    // 4. Open Generated Modal & Shareable Link
    const shareUrl = `${window.location.origin}/w/${projectId}`;
    setGeneratedModal({
      projectId,
      shareUrl,
      recipientName: wishPayload.recipientName
    });
  };

  const handleCopyShareLink = () => {
    if (generatedModal) {
      navigator.clipboard.writeText(generatedModal.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
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
            >
              ✨ Generate Wish
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

          <form className="studio-form" onSubmit={(e) => e.preventDefault()}>
            {/* Section 1: Basic Details */}
            <div className="form-section">
              <h3 className="section-title-sm">1. Basic Details</h3>

              {/* Recipient Name (Required) */}
              <div className="form-field-group">
                <label htmlFor="recipientName" className="form-label">
                  Recipient Name <span className="required-star">*</span>
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
                    Heartfelt Message / Wishes
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

            {/* Section 3: Photos Uploader */}
            {supported.includes('photos') && (
              <div className="form-section">
                <div className="section-title-row">
                  <h3 className="section-title-sm">3. Photos & Memories</h3>
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
                    accept="image/*"
                    className="hidden-file-input"
                    onChange={handleFileUpload}
                  />
                  <div className="dropzone-icon">📸</div>
                  <h4 className="dropzone-title">Add your memories</h4>
                  <p className="dropzone-sub">Click to browse or drag photos from your device</p>
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

                {/* Selected Photos Grid with Captions & Remove Buttons */}
                {formData.photos && formData.photos.length > 0 && (
                  <div className="uploaded-thumbnails-list">
                    {formData.photos.map((url, idx) => (
                      <div key={idx} className="thumbnail-card">
                        <div className="thumbnail-img-wrap">
                          <img src={url} alt={`Memory ${idx + 1}`} />
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
                          value={formData.photoCaptions?.[idx] || ''}
                          onChange={(e) => handleCaptionChange(idx, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section 4: Template-Specific Dynamic Fields */}
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
              >
                ✨ Generate Wish
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
                {/* Dynamically render the template component with reactive user data */}
                {React.createElement(template.component, {
                  data: previewData
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Generated Wish Celebration Modal */}
      {generatedModal && (
        <div className="preview-modal-backdrop" onClick={() => setGeneratedModal(null)}>
          <div className="share-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="share-modal-content text-center">
              <span className="share-celebrate-emoji">🎉</span>
              <h2>Your Wish for {generatedModal.recipientName} is Ready!</h2>
              <p>
                A personalized website has been generated. Anyone opening this link will see your customized keepsake immediately without logging in.
              </p>

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
                  {copied ? '✅ Copied!' : 'Copy Link'}
                </button>
              </div>

              <div className="share-modal-footer-btns">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => navigate(`/w/${generatedModal.projectId}`)}
                >
                  Open Generated Website ↗
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setGeneratedModal(null)}
                >
                  Keep Editing
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
