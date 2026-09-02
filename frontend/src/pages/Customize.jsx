import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemplateById } from '../templates/templateRegistry.js';
import { getOccasionById } from '../data/occasions.js';
import { createWish, uploadImages, APP_BASE_URL } from '../services/api.js';
import PhotoUploader from '../components/PhotoUploader.jsx';
import TimelineEditor from '../components/TimelineEditor.jsx';
import ReasonsEditor from '../components/ReasonsEditor.jsx';
import CharacterCounter from '../components/CharacterCounter.jsx';

export function Customize() {
  const { templateId } = useParams();
  const template = getTemplateById(templateId);
  const occasion = template ? getOccasionById(template.occasion) : null;

  // Local storage draft key
  const draftStorageKey = `wishly_draft_${templateId || 'default'}`;

  // Form State Initialization
  const [formData, setFormData] = useState(() => {
    if (!template) return {};

    // 1. Check local draft
    try {
      const savedDraft = localStorage.getItem(draftStorageKey);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        return {
          ...template.defaultData,
          ...parsed,
          photos: (parsed.photos || []).map((p, i) =>
            typeof p === 'string'
              ? { id: `photo_${i}`, url: p, status: 'ready', caption: '' }
              : { ...p, status: p.status || 'ready' }
          )
        };
      }
    } catch (e) {
      console.warn('Draft load error:', e);
    }

    // 2. Default data
    const defaultPhotos = template.defaultData?.photos
      ? template.defaultData.photos.map((url, i) => ({
          id: `sample_${i}`,
          url,
          status: 'ready',
          caption: ''
        }))
      : [];

    return {
      recipientName: template.defaultData?.recipientName || '',
      senderName: template.defaultData?.senderName || '',
      message: template.defaultData?.message || '',
      photos: defaultPhotos,
      date: template.defaultData?.date || '',
      age: template.defaultData?.age || '',
      years: template.defaultData?.years || '',
      degree: template.defaultData?.degree || '',
      classYear: template.defaultData?.classYear || '',
      teamName: template.defaultData?.teamName || '',
      achievement: template.defaultData?.achievement || '',
      surpriseMessage: template.defaultData?.surpriseMessage || '',
      reasons: template.defaultData?.reasons ? [...template.defaultData.reasons] : [
        'The contagious smile that brightens any day.',
        'Your kindness and thoughtful care for others.',
        'Making every moment together unforgettable.'
      ],
      timeline: template.defaultData?.timeline ? [...template.defaultData.timeline] : [
        { date: 'Chapter 01', title: 'The Beginning', description: 'When our story first began and memories started unfolding.' },
        { date: 'Chapter 02', title: 'The Adventure', description: 'Countless laughs, late night chats, and shared journeys.' },
        { date: 'Today', title: 'Still Celebrating', description: 'Grateful for every step and excited for what comes next.' }
      ],
      milestones: template.defaultData?.milestones ? [...template.defaultData.milestones] : [
        { date: 'Freshman Year', title: 'The Start', description: 'Arriving full of ambition and big dreams.' },
        { date: 'Senior Year', title: 'The Triumph', description: 'Cap in the air, ready for the next adventure.' }
      ]
    };
  });

  // UI States
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [activeTab, setActiveTab] = useState('editor'); // For mobile: 'editor' | 'preview'
  const [validationErrors, setValidationErrors] = useState({});
  const [isDraftRestored, setIsDraftRestored] = useState(() => {
    try {
      return Boolean(localStorage.getItem(draftStorageKey));
    } catch {
      return false;
    }
  });
  const [isDraftSavedPulse, setIsDraftSavedPulse] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Generation & Share modal state
  const [generationStep, setGenerationStep] = useState(0); // 0 = idle, 1 = preparing, 2 = uploading, 3 = saving, 4 = complete
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareModal, setShareModal] = useState(null);
  const [copied, setCopied] = useState(false);

  // Autosave effect
  useEffect(() => {
    if (!templateId) return;

    try {
      const serializableData = {
        recipientName: formData.recipientName,
        senderName: formData.senderName,
        message: formData.message,
        photos: (formData.photos || [])
          .filter((p) => p.status === 'ready' && !p.url.startsWith('blob:'))
          .map((p) => ({ url: p.url, caption: p.caption })),
        date: formData.date,
        age: formData.age,
        years: formData.years,
        degree: formData.degree,
        classYear: formData.classYear,
        teamName: formData.teamName,
        achievement: formData.achievement,
        surpriseMessage: formData.surpriseMessage,
        reasons: formData.reasons,
        timeline: formData.timeline,
        milestones: formData.milestones
      };

      localStorage.setItem(draftStorageKey, JSON.stringify(serializableData));
      setIsDraftSavedPulse(true);
      const timer = setTimeout(() => setIsDraftSavedPulse(false), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.warn('Autosave error:', e);
    }
  }, [formData, templateId, draftStorageKey]);

  if (!template) {
    return (
      <div className="container text-center py-5">
        <h2>Template Not Found</h2>
        <p>The selected template could not be loaded.</p>
        <Link to="/templates" className="btn btn-primary mt-3">Browse Templates</Link>
      </div>
    );
  }

  const supported = template.supportedFields || [];

  // Reset draft to fresh template defaults
  const handleStartFresh = () => {
    try {
      localStorage.removeItem(draftStorageKey);
    } catch {}

    const defaultPhotos = template.defaultData?.photos
      ? template.defaultData.photos.map((url, i) => ({
          id: `sample_${i}`,
          url,
          status: 'ready',
          caption: ''
        }))
      : [];

    setFormData({
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
      surpriseMessage: template.defaultData?.surpriseMessage || '',
      reasons: template.defaultData?.reasons ? [...template.defaultData.reasons] : [],
      timeline: template.defaultData?.timeline ? [...template.defaultData.timeline] : [],
      milestones: template.defaultData?.milestones ? [...template.defaultData.milestones] : []
    });

    setIsDraftRestored(false);
  };

  // Field update handler
  const handleFieldChange = (field, value) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Photo handlers
  const handleUploadFiles = async (files) => {
    setUploadError(null);
    setUploading(true);

    // 1. Create temporary preview objects
    const tempPhotos = files.map((file, i) => ({
      id: `temp_${Date.now()}_${i}`,
      url: URL.createObjectURL(file),
      file,
      status: 'uploading',
      caption: ''
    }));

    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ...tempPhotos]
    }));

    try {
      // 2. Stream to Cloudinary backend
      const uploadResult = await uploadImages(files, template.occasion);

      if (uploadResult && uploadResult.images) {
        setFormData((prev) => {
          const current = [...(prev.photos || [])];
          let resIdx = 0;

          const updated = current.map((p) => {
            if (p.status === 'uploading' && uploadResult.images[resIdx]) {
              const uploadedItem = uploadResult.images[resIdx++];
              return {
                id: uploadedItem.publicId || `cloud_${Date.now()}`,
                url: uploadedItem.url,
                publicId: uploadedItem.publicId,
                status: 'ready',
                caption: p.caption || ''
              };
            }
            return p;
          });

          return { ...prev, photos: updated };
        });
      }
    } catch (err) {
      console.warn('Cloudinary upload issue, keeping local fallback:', err.message);
      // Fall back to ready state so creators are never blocked
      setFormData((prev) => ({
        ...prev,
        photos: (prev.photos || []).map((p) => ({ ...p, status: 'ready' }))
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: (prev.photos || []).filter((_, i) => i !== index)
    }));
  };

  const handleReorderPhotos = (reordered) => {
    setFormData((prev) => ({
      ...prev,
      photos: reordered
    }));
  };

  const handleUpdateCaption = (index, caption) => {
    setFormData((prev) => {
      const updated = [...(prev.photos || [])];
      if (updated[index]) {
        updated[index] = { ...updated[index], caption };
      }
      return { ...prev, photos: updated };
    });
  };

  // Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.recipientName?.trim()) {
      errors.recipientName = "Tell us who this Wishly is for 💌";
    }
    if (supported.includes('message') && !formData.message?.trim()) {
      errors.message = "Add a personal heartfelt message ✨";
    }
    if (formData.message && formData.message.length > 1000) {
      errors.message = "Your message is a little long — try keeping it under 1000 characters.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Generate Wish Handler with cinematic step animation
  const handleGenerateWish = async () => {
    if (!validateForm()) {
      setActiveTab('editor');
      return;
    }

    setIsGenerating(true);
    setGenerationStep(1); // Preparing memories

    setTimeout(async () => {
      setGenerationStep(2); // Uploading & processing

      try {
        const normalizedPhotos = (formData.photos || []).map((p) => ({
          url: typeof p === 'string' ? p : p.url,
          publicId: p.publicId || '',
          caption: p.caption || ''
        }));

        const customDataPayload = {
          date: formData.date,
          age: formData.age,
          years: formData.years,
          degree: formData.degree,
          classYear: formData.classYear,
          teamName: formData.teamName,
          achievement: formData.achievement,
          surpriseMessage: formData.surpriseMessage,
          reasons: formData.reasons,
          timeline: formData.timeline,
          milestones: formData.milestones
        };

        setGenerationStep(3); // Creating Wishly in database

        const response = await createWish({
          occasion: template.occasion,
          templateId: template.id,
          recipientName: formData.recipientName.trim(),
          senderName: formData.senderName.trim() || 'Someone who cares',
          message: formData.message.trim(),
          photos: normalizedPhotos,
          customData: customDataPayload
        });

        setGenerationStep(4); // Finishing touches

        setTimeout(() => {
          setIsGenerating(false);
          setGenerationStep(0);
          const projectUrl = `${APP_BASE_URL.replace(/\/$/, '')}/w/${response.projectId}`;
          setShareModal({
            projectId: response.projectId,
            shareUrl: projectUrl,
            recipientName: formData.recipientName
          });
        }, 600);
      } catch (err) {
        console.error('Wish generation error:', err);
        setIsGenerating(false);
        setGenerationStep(0);
        alert('Could not generate wish. Please check your connection and try again.');
      }
    }, 600);
  };

  const handleCopyShareLink = () => {
    if (!shareModal) return;
    navigator.clipboard.writeText(shareModal.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    if (!shareModal) return;
    const occ = template?.occasion;
    let text = `I made something special for you on Wishly ✨\nOpen your surprise here: ${shareModal.shareUrl}`;

    if (occ === 'birthday') text = `I made something special for you 🎂✨ Open your Wishly: ${shareModal.shareUrl}`;
    else if (occ === 'anniversary') text = `I made a little something for us ❤️ Open it here: ${shareModal.shareUrl}`;
    else if (occ === 'graduation') text = `Your achievement deserves a little celebration 🎓✨ Open this: ${shareModal.shareUrl}`;
    else if (occ === 'valentines') text = `A little piece of my heart for you ❤️ Open it here: ${shareModal.shareUrl}`;
    else if (occ === 'farewell') text = `A collection of our fondest memories 👋✨ Open this: ${shareModal.shareUrl}`;
    else if (occ === 'congratulations') text = `So proud of your achievement! 🎉✨ Open your Wishly: ${shareModal.shareUrl}`;
    else if (occ === 'just-because') text = `Just a little reminder that you are special 🌸✨ Open it here: ${shareModal.shareUrl}`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (!shareModal) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A special Wishly for ${shareModal.recipientName} ✨`,
          text: `A personalized celebration website made with love:`,
          url: shareModal.shareUrl
        });
      } catch (e) {}
    } else {
      handleCopyShareLink();
    }
  };

  // Normalized template preview data
  const templatePreviewData = {
    recipientName: formData.recipientName || template.defaultData?.recipientName || 'Someone Special',
    senderName: formData.senderName || template.defaultData?.senderName || 'From Someone Who Cares',
    message: formData.message || template.defaultData?.message || 'Wishing you all the joy, love, and wonder in the world!',
    photos: (formData.photos || []).map((p) => (typeof p === 'string' ? p : p.url)),
    date: formData.date,
    age: formData.age,
    years: formData.years,
    degree: formData.degree,
    classYear: formData.classYear,
    teamName: formData.teamName,
    achievement: formData.achievement,
    surpriseMessage: formData.surpriseMessage,
    customData: {
      date: formData.date,
      age: formData.age,
      years: formData.years,
      degree: formData.degree,
      classYear: formData.classYear,
      teamName: formData.teamName,
      achievement: formData.achievement,
      surpriseMessage: formData.surpriseMessage,
      reasons: formData.reasons,
      timeline: formData.timeline,
      milestones: formData.milestones
    }
  };

  // Determine section visibility based on supported fields
  const hasAboutSection = supported.includes('recipientName') || supported.includes('teamName');
  const hasMessageSection = supported.includes('message') || supported.includes('senderName');
  const hasPhotosSection = supported.includes('photos');
  const hasTimelineSection = supported.includes('timeline') || supported.includes('milestones');
  const hasReasonsSection = supported.includes('reasons');
  const hasSpecialDetailsSection = [
    'date',
    'age',
    'years',
    'degree',
    'classYear',
    'achievement',
    'surpriseMessage'
  ].some((f) => supported.includes(f));

  return (
    <div className="customize-studio-layout">
      {/* Top Navbar */}
      <header className="customize-topbar">
        <div className="topbar-left">
          <Link to={`/templates/${template.occasion}`} className="topbar-back-btn">
            ← Back to Gallery
          </Link>
          <div className="topbar-template-info">
            <span className="template-badge-chip" style={{ backgroundColor: template.previewColor }}>
              {template.badge || 'Curated'}
            </span>
            <h1 className="topbar-template-name">{template.name}</h1>
          </div>
        </div>

        <div className="topbar-center">
          {isDraftSavedPulse && (
            <span className="draft-status-pill animate-fade-in">
              ✓ Draft saved locally
            </span>
          )}
        </div>

        <div className="topbar-right">
          <button
            type="button"
            className="btn btn-primary btn-md generate-nav-btn pulse-glow"
            onClick={handleGenerateWish}
            disabled={isGenerating || uploading}
          >
            {isGenerating ? 'Creating Wishly... ✨' : 'Generate Wish ✨'}
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="mobile-view-tabs" role="tablist">
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          ✏️ Story Editor
        </button>
        <button
          type="button"
          className={`mobile-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Live Preview
        </button>
      </div>

      {/* Main Studio Body */}
      <div className="customize-studio-body">
        {/* LEFT COLUMN: Story Editor Sidebar */}
        <aside className={`studio-editor-sidebar ${activeTab === 'editor' ? 'mobile-visible' : 'mobile-hidden'}`}>
          {/* Draft Restored Notice */}
          {isDraftRestored && (
            <div className="draft-restored-banner">
              <span>✨ Previous draft restored</span>
              <button
                type="button"
                className="btn-link-sm"
                onClick={handleStartFresh}
                title="Clear draft and use defaults"
              >
                Start fresh
              </button>
            </div>
          )}

          <div className="story-editor-sections">
            {/* SECTION A: ABOUT THEM */}
            {hasAboutSection && (
              <section className="editor-story-section">
                <div className="section-header-row">
                  <span className="section-num-tag">A</span>
                  <div className="section-title-wrap">
                    <h3 className="section-heading">About Them</h3>
                    <p className="section-subheading">Who is this celebration dedicated to?</p>
                  </div>
                </div>

                <div className="section-fields-body">
                  {supported.includes('recipientName') && (
                    <div className="form-group">
                      <div className="label-with-counter">
                        <label className="field-label required">Recipient's Name</label>
                        <CharacterCounter current={(formData.recipientName || '').length} max={60} />
                      </div>
                      <input
                        type="text"
                        className={`form-input ${validationErrors.recipientName ? 'input-error' : ''}`}
                        placeholder="e.g. Sarah Jenkins or Ananya"
                        value={formData.recipientName}
                        maxLength={60}
                        onChange={(e) => handleFieldChange('recipientName', e.target.value)}
                        autoFocus
                      />
                      {validationErrors.recipientName && (
                        <span className="field-error-msg">{validationErrors.recipientName}</span>
                      )}
                    </div>
                  )}

                  {supported.includes('teamName') && (
                    <div className="form-group mt-3">
                      <label className="field-label">Team / Organization Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. The Design & Product Crew"
                        value={formData.teamName || ''}
                        maxLength={80}
                        onChange={(e) => handleFieldChange('teamName', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SECTION B: YOUR MESSAGE */}
            {hasMessageSection && (
              <section className="editor-story-section">
                <div className="section-header-row">
                  <span className="section-num-tag">B</span>
                  <div className="section-title-wrap">
                    <h3 className="section-heading">Your Message</h3>
                    <p className="section-subheading">Write the words they will treasure forever.</p>
                  </div>
                </div>

                <div className="section-fields-body">
                  {supported.includes('message') && (
                    <div className="form-group">
                      <div className="label-with-counter">
                        <label className="field-label required">Heartfelt Message</label>
                        <CharacterCounter current={(formData.message || '').length} max={800} />
                      </div>
                      <textarea
                        className={`form-textarea ${validationErrors.message ? 'input-error' : ''}`}
                        rows={5}
                        placeholder="Write something emotional, warm, or funny..."
                        value={formData.message}
                        maxLength={800}
                        onChange={(e) => handleFieldChange('message', e.target.value)}
                      />
                      {validationErrors.message && (
                        <span className="field-error-msg">{validationErrors.message}</span>
                      )}
                    </div>
                  )}

                  {supported.includes('senderName') && (
                    <div className="form-group mt-3">
                      <div className="label-with-counter">
                        <label className="field-label">From / Signature</label>
                        <CharacterCounter current={(formData.senderName || '').length} max={60} />
                      </div>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Alex & Maya, or With love always, Daniel"
                        value={formData.senderName}
                        maxLength={60}
                        onChange={(e) => handleFieldChange('senderName', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SECTION C: MEMORIES & PHOTOS */}
            {(hasPhotosSection || hasTimelineSection || hasReasonsSection) && (
              <section className="editor-story-section">
                <div className="section-header-row">
                  <span className="section-num-tag">C</span>
                  <div className="section-title-wrap">
                    <h3 className="section-heading">Memories</h3>
                    <p className="section-subheading">Add photos, milestones, and personal moments.</p>
                  </div>
                </div>

                <div className="section-fields-body">
                  {/* Photo Uploader */}
                  {hasPhotosSection && (
                    <PhotoUploader
                      photos={formData.photos}
                      onUploadFiles={handleUploadFiles}
                      onRemovePhoto={handleRemovePhoto}
                      onReorderPhotos={handleReorderPhotos}
                      onUpdateCaption={handleUpdateCaption}
                      uploading={uploading}
                      uploadError={uploadError}
                    />
                  )}

                  {/* Interactive Timeline Editor */}
                  {hasTimelineSection && (
                    <div className="mt-4">
                      <TimelineEditor
                        items={formData.timeline || formData.milestones || []}
                        onChange={(updated) => {
                          if (supported.includes('timeline')) handleFieldChange('timeline', updated);
                          if (supported.includes('milestones')) handleFieldChange('milestones', updated);
                        }}
                      />
                    </div>
                  )}

                  {/* Interactive Reasons Editor */}
                  {hasReasonsSection && (
                    <div className="mt-4">
                      <ReasonsEditor
                        reasons={formData.reasons || []}
                        onChange={(updated) => handleFieldChange('reasons', updated)}
                      />
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SECTION D: SPECIAL DETAILS */}
            {hasSpecialDetailsSection && (
              <section className="editor-story-section">
                <div className="section-header-row">
                  <span className="section-num-tag">D</span>
                  <div className="section-title-wrap">
                    <h3 className="section-heading">Special Details</h3>
                    <p className="section-subheading">Fine-tune occasion-specific details.</p>
                  </div>
                </div>

                <div className="section-fields-body special-details-grid">
                  {supported.includes('date') && (
                    <div className="form-group">
                      <label className="field-label">Date / Event Day</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. September 12 or October 24"
                        value={formData.date || ''}
                        maxLength={50}
                        onChange={(e) => handleFieldChange('date', e.target.value)}
                      />
                    </div>
                  )}

                  {supported.includes('age') && (
                    <div className="form-group">
                      <label className="field-label">Age / Milestone</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 21 or 30th"
                        value={formData.age || ''}
                        maxLength={20}
                        onChange={(e) => handleFieldChange('age', e.target.value)}
                      />
                    </div>
                  )}

                  {supported.includes('years') && (
                    <div className="form-group">
                      <label className="field-label">Years of Togetherness</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 5 Beautiful Years"
                        value={formData.years || ''}
                        maxLength={40}
                        onChange={(e) => handleFieldChange('years', e.target.value)}
                      />
                    </div>
                  )}

                  {supported.includes('degree') && (
                    <div className="form-group">
                      <label className="field-label">Degree / Major</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Bachelor of Computer Science"
                        value={formData.degree || ''}
                        maxLength={60}
                        onChange={(e) => handleFieldChange('degree', e.target.value)}
                      />
                    </div>
                  )}

                  {supported.includes('classYear') && (
                    <div className="form-group">
                      <label className="field-label">Class Year</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Class of 2026"
                        value={formData.classYear || ''}
                        maxLength={30}
                        onChange={(e) => handleFieldChange('classYear', e.target.value)}
                      />
                    </div>
                  )}

                  {supported.includes('achievement') && (
                    <div className="form-group">
                      <label className="field-label">Achievement / Goal</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Senior Promotion or Marathon Finisher"
                        value={formData.achievement || ''}
                        maxLength={70}
                        onChange={(e) => handleFieldChange('achievement', e.target.value)}
                      />
                    </div>
                  )}

                  {supported.includes('surpriseMessage') && (
                    <div className="form-group full-width-field mt-2">
                      <div className="label-with-counter">
                        <label className="field-label">Secret Surprise Note</label>
                        <CharacterCounter current={(formData.surpriseMessage || '').length} max={250} />
                      </div>
                      <textarea
                        className="form-textarea"
                        rows={2}
                        placeholder="Revealed when they click the surprise box!"
                        value={formData.surpriseMessage || ''}
                        maxLength={250}
                        onChange={(e) => handleFieldChange('surpriseMessage', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Live Interactive Preview Frame */}
        <main className={`studio-preview-pane ${activeTab === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}>
          <div className="preview-pane-toolbar">
            <div className="preview-indicator">
              <span className="live-dot pulse-glow"></span>
              <span className="live-text">Live Story Preview</span>
            </div>

            <div className="device-switcher-pills">
              <button
                type="button"
                className={`device-pill ${deviceMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceMode('desktop')}
                title="Desktop View"
              >
                💻 Desktop
              </button>
              <button
                type="button"
                className={`device-pill ${deviceMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View"
              >
                📱 Mobile
              </button>
            </div>
          </div>

          <div className="preview-viewport-stage">
            <div className={`preview-device-frame ${deviceMode === 'mobile' ? 'frame-mobile' : 'frame-desktop'}`}>
              {/* Device Header Bar */}
              <div className="frame-browser-header">
                <div className="frame-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="frame-url-bar">
                  wishly.app/preview/{template.id}
                </div>
              </div>

              {/* Template Component Canvas */}
              <div className="frame-canvas-scroller">
                {React.createElement(template.component, {
                  data: templatePreviewData
                })}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="mobile-sticky-bottom-bar">
        {activeTab === 'editor' ? (
          <button
            type="button"
            className="btn btn-secondary btn-md"
            onClick={() => setActiveTab('preview')}
          >
            👁️ Preview
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-secondary btn-md"
            onClick={() => setActiveTab('editor')}
          >
            ✏️ Edit Story
          </button>
        )}
        <button
          type="button"
          className="btn btn-primary btn-md pulse-glow"
          onClick={handleGenerateWish}
          disabled={isGenerating || uploading}
        >
          {isGenerating ? 'Creating... ✨' : 'Generate Wish ✨'}
        </button>
      </div>

      {/* Generating Progress Overlay Modal */}
      {isGenerating && (
        <div className="generating-overlay-backdrop" role="dialog" aria-modal="true">
          <div className="generating-card text-center">
            <div className="generating-sparkle-crest">✦</div>
            <h3 className="generating-title">Bringing Your Wishly to Life</h3>

            <div className="generating-steps-list">
              <div className={`gen-step-item ${generationStep >= 1 ? 'active' : ''}`}>
                <span className="step-icon">{generationStep > 1 ? '✓' : '1'}</span>
                <span>Preparing your memories...</span>
              </div>
              <div className={`gen-step-item ${generationStep >= 2 ? 'active' : ''}`}>
                <span className="step-icon">{generationStep > 2 ? '✓' : '2'}</span>
                <span>Uploading & optimizing photos...</span>
              </div>
              <div className={`gen-step-item ${generationStep >= 3 ? 'active' : ''}`}>
                <span className="step-icon">{generationStep > 3 ? '✓' : '3'}</span>
                <span>Creating your permanent Wishly website...</span>
              </div>
              <div className={`gen-step-item ${generationStep >= 4 ? 'active' : ''}`}>
                <span className="step-icon">{generationStep >= 4 ? '✓' : '4'}</span>
                <span>Adding the finishing touches ✨</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generated Celebration & Share Modal */}
      {shareModal && (
        <div className="share-modal-backdrop animate-fade-in" role="dialog" aria-modal="true">
          <div className="share-modal-card text-center">
            <button
              type="button"
              className="share-close-btn"
              onClick={() => setShareModal(null)}
              aria-label="Close share dialog"
            >
              ✕
            </button>

            <span className="share-celebrate-badge">🎉 YOUR WISHLY IS READY!</span>
            <h2 className="share-modal-title">A Gift for {shareModal.recipientName} ✨</h2>
            <p className="share-modal-subtitle">
              Your personalized celebration website is live and ready to bring smiles.
            </p>

            {/* Visual Link Preview Card */}
            <div className="visual-link-preview-card">
              <div className="preview-card-header-bar">
                <span className="preview-brand-tag">✦ Wishly</span>
                <span className="preview-occasion-pill">{occasion?.name || 'Celebration'}</span>
              </div>
              <div className="preview-card-body">
                <h4 className="preview-card-title">A little something for you</h4>
                <p className="preview-card-subtitle">A personalized celebration website made with love</p>
                <span className="preview-card-url-display">{shareModal.shareUrl}</span>
              </div>
            </div>

            {/* Share Link Box */}
            <div className="share-link-pill-box mt-3">
              <span className="share-link-url">{shareModal.shareUrl}</span>
              <button
                type="button"
                className="btn btn-primary btn-sm copy-btn"
                onClick={handleCopyShareLink}
              >
                {copied ? '✓ Link Copied' : 'Copy Link'}
              </button>
            </div>

            {/* Action Grid */}
            <div className="share-actions-grid mt-3">
              <button
                type="button"
                className="btn btn-whatsapp btn-md"
                onClick={handleWhatsAppShare}
              >
                💬 WhatsApp
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-md"
                onClick={handleNativeShare}
              >
                📤 Share Link
              </button>
              <a
                href={shareModal.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-md"
              >
                Open Wishly ✨
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customize;
