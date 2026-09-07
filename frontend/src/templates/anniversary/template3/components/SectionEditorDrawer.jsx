import React, { useState } from 'react';

/**
 * Section & Page Editor Drawer — granular editing of every single message, title, image, and card.
 */
export function SectionEditorDrawer({ section, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...section });
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'messages' | 'images' | 'cards'

  if (!section) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayTextChange = (arrayField, index, value) => {
    setFormData((prev) => {
      const arr = [...(prev[arrayField] || [])];
      arr[index] = value;
      return { ...prev, [arrayField]: arr };
    });
  };

  const handleAddArrayText = (arrayField, defaultText = "New romantic line") => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: [...(prev[arrayField] || []), defaultText]
    }));
  };

  const handleDeleteArrayText = (arrayField, index) => {
    setFormData((prev) => {
      const arr = [...(prev[arrayField] || [])];
      arr.splice(index, 1);
      return { ...prev, [arrayField]: arr };
    });
  };

  const handleCardFieldChange = (cardsField, index, key, value) => {
    setFormData((prev) => {
      const arr = [...(prev[cardsField] || [])];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [cardsField]: arr };
    });
  };

  const handleAddCard = (cardsField, defaultCard) => {
    setFormData((prev) => ({
      ...prev,
      [cardsField]: [...(prev[cardsField] || []), defaultCard]
    }));
  };

  const handleDeleteCard = (cardsField, index) => {
    setFormData((prev) => {
      const arr = [...(prev[cardsField] || [])];
      arr.splice(index, 1);
      return { ...prev, [cardsField]: arr };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvt) => {
        handleChange('image', uploadEvt.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const hasMessagesArray = Array.isArray(formData.messages);
  const hasStoryLead = Array.isArray(formData.storyLead);
  const hasCards = Array.isArray(formData.cards);
  const hasStanzas = Array.isArray(formData.stanzas);

  return (
    <div className="tpl3-modal-overlay" onClick={onClose}>
      <div
        className="tpl3-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-header">
          <div>
            <span className="drawer-sub-badge">Page Customizer</span>
            <h3 className="drawer-title">
              Edit {formData.pageLabel || formData.title || formData.heading || 'Page'}
            </h3>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Tab Navigation */}
        <div className="drawer-tabs-row">
          <button
            type="button"
            className={`drawer-tab-btn ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            ✏️ Headings & Text
          </button>
          {(hasMessagesArray || hasStoryLead || hasStanzas) && (
            <button
              type="button"
              className={`drawer-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              💬 Messages & Lines
            </button>
          )}
          {hasCards && (
            <button
              type="button"
              className={`drawer-tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
              onClick={() => setActiveTab('cards')}
            >
              🗂️ Cards ({formData.cards.length})
            </button>
          )}
          <button
            type="button"
            className={`drawer-tab-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            🖼️ Image & Media
          </button>
        </div>

        <form onSubmit={handleSubmit} className="drawer-form-content">
          {/* TAB 1: HEADINGS & TITLES */}
          {activeTab === 'text' && (
            <div className="drawer-tab-pane">
              {formData.pageLabel !== undefined && (
                <div className="form-group">
                  <label className="form-label">Page Navigation Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.pageLabel || ''}
                    onChange={(e) => handleChange('pageLabel', e.target.value)}
                  />
                </div>
              )}

              {formData.badge !== undefined && (
                <div className="form-group">
                  <label className="form-label">Chapter Badge</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.badge || ''}
                    onChange={(e) => handleChange('badge', e.target.value)}
                  />
                </div>
              )}

              {formData.overheadTag !== undefined && (
                <div className="form-group">
                  <label className="form-label">Overhead Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.overheadTag || ''}
                    onChange={(e) => handleChange('overheadTag', e.target.value)}
                  />
                </div>
              )}

              {formData.title !== undefined && (
                <div className="form-group">
                  <label className="form-label">Main Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                </div>
              )}

              {formData.coupleName !== undefined && (
                <div className="form-group">
                  <label className="form-label">Couple Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.coupleName || ''}
                    onChange={(e) => handleChange('coupleName', e.target.value)}
                  />
                </div>
              )}

              {formData.datePill !== undefined && (
                <div className="form-group">
                  <label className="form-label">Date & Years Pill</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.datePill || ''}
                    onChange={(e) => handleChange('datePill', e.target.value)}
                  />
                </div>
              )}

              {formData.heading !== undefined && (
                <div className="form-group">
                  <label className="form-label">Heading</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.heading || ''}
                    onChange={(e) => handleChange('heading', e.target.value)}
                  />
                </div>
              )}

              {formData.subheading !== undefined && (
                <div className="form-group">
                  <label className="form-label">Subheading</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.subheading || ''}
                    onChange={(e) => handleChange('subheading', e.target.value)}
                  />
                </div>
              )}

              {formData.subtitle !== undefined && (
                <div className="form-group">
                  <label className="form-label">Subtitle</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.subtitle || ''}
                    onChange={(e) => handleChange('subtitle', e.target.value)}
                  />
                </div>
              )}

              {formData.message && typeof formData.message === 'string' && (
                <div className="form-group">
                  <label className="form-label">Main Romantic Message</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={formData.message || ''}
                    onChange={(e) => handleChange('message', e.target.value)}
                  />
                </div>
              )}

              {formData.emphasis !== undefined && (
                <div className="form-group">
                  <label className="form-label">Emphasis Line</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.emphasis || ''}
                    onChange={(e) => handleChange('emphasis', e.target.value)}
                  />
                </div>
              )}

              {formData.revealText !== undefined && (
                <div className="form-group">
                  <label className="form-label">Reveal Banner Text</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.revealText || ''}
                    onChange={(e) => handleChange('revealText', e.target.value)}
                  />
                </div>
              )}

              {formData.highlightClimax !== undefined && (
                <div className="form-group">
                  <label className="form-label">Centered Climax Highlight</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.highlightClimax || ''}
                    onChange={(e) => handleChange('highlightClimax', e.target.value)}
                  />
                </div>
              )}

              {formData.warmthQuote !== undefined && (
                <div className="form-group">
                  <label className="form-label">Warmth Quote</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.warmthQuote || ''}
                    onChange={(e) => handleChange('warmthQuote', e.target.value)}
                  />
                </div>
              )}

              {formData.subtext !== undefined && (
                <div className="form-group">
                  <label className="form-label">Subtext / Note</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.subtext || ''}
                    onChange={(e) => handleChange('subtext', e.target.value)}
                  />
                </div>
              )}

              {formData.finalSignoff !== undefined && (
                <div className="form-group">
                  <label className="form-label">Final Signoff</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.finalSignoff || ''}
                    onChange={(e) => handleChange('finalSignoff', e.target.value)}
                  />
                </div>
              )}

              {formData.ctaText !== undefined && (
                <div className="form-group">
                  <label className="form-label">CTA Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.ctaText || ''}
                    onChange={(e) => handleChange('ctaText', e.target.value)}
                  />
                </div>
              )}

              {formData.buttonText !== undefined && (
                <div className="form-group">
                  <label className="form-label">Interactive Button Label</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.buttonText || ''}
                    onChange={(e) => handleChange('buttonText', e.target.value)}
                  />
                </div>
              )}

              {formData.nextButtonText !== undefined && (
                <div className="form-group">
                  <label className="form-label">Next Page Button Text</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.nextButtonText || ''}
                    onChange={(e) => handleChange('nextButtonText', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DISCRETE MESSAGES & LINES */}
          {activeTab === 'messages' && (
            <div className="drawer-tab-pane">
              {/* Messages Array (Page 2, 3, 5, 6) */}
              {hasMessagesArray && (
                <div className="nested-items-section">
                  <div className="nested-header">
                    <h4>Discrete Messages ({formData.messages.length})</h4>
                    <button
                      type="button"
                      className="btn-add-item"
                      onClick={() => {
                        const isObject = typeof formData.messages[0] === 'object';
                        const newItem = isObject
                          ? { id: `m-${Date.now()}`, icon: "✨", title: "New Moment", desc: "A special shared moment." }
                          : "A new meaningful message.";
                        setFormData((prev) => ({
                          ...prev,
                          messages: [...prev.messages, newItem]
                        }));
                      }}
                    >
                      + Add Message Line
                    </button>
                  </div>

                  {formData.messages.map((item, idx) => {
                    if (typeof item === 'string') {
                      return (
                        <div key={idx} className="nested-item-card">
                          <div className="item-card-top">
                            <span className="item-card-idx">Line #{idx + 1}</span>
                            <button
                              type="button"
                              className="btn-del-item"
                              onClick={() => handleDeleteArrayText('messages', idx)}
                            >
                              Remove ✕
                            </button>
                          </div>
                          <textarea
                            className="form-textarea-sm"
                            rows={2}
                            value={item}
                            onChange={(e) => handleArrayTextChange('messages', idx, e.target.value)}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={item.id || idx} className="nested-item-card">
                        <div className="item-card-top">
                          <span className="item-card-idx">Message #{idx + 1}</span>
                          <button
                            type="button"
                            className="btn-del-item"
                            onClick={() => {
                              const arr = [...formData.messages];
                              arr.splice(idx, 1);
                              handleChange('messages', arr);
                            }}
                          >
                            Remove ✕
                          </button>
                        </div>
                        {item.icon !== undefined && (
                          <input
                            type="text"
                            className="form-input-sm"
                            value={item.icon || ''}
                            onChange={(e) => {
                              const arr = [...formData.messages];
                              arr[idx] = { ...arr[idx], icon: e.target.value };
                              handleChange('messages', arr);
                            }}
                            placeholder="Emoji / Icon"
                          />
                        )}
                        {(item.text !== undefined || item.title !== undefined) && (
                          <input
                            type="text"
                            className="form-input-sm"
                            value={item.text || item.title || ''}
                            onChange={(e) => {
                              const arr = [...formData.messages];
                              arr[idx] = { ...arr[idx], [item.text !== undefined ? 'text' : 'title']: e.target.value };
                              handleChange('messages', arr);
                            }}
                            placeholder="Title / Line"
                          />
                        )}
                        {item.desc !== undefined && (
                          <textarea
                            className="form-textarea-sm"
                            rows={2}
                            value={item.desc || ''}
                            onChange={(e) => {
                              const arr = [...formData.messages];
                              arr[idx] = { ...arr[idx], desc: e.target.value };
                              handleChange('messages', arr);
                            }}
                            placeholder="Description"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Story Lead (Page 1) */}
              {hasStoryLead && (
                <div className="nested-items-section">
                  <div className="nested-header">
                    <h4>Hero Opening Stanzas ({formData.storyLead.length})</h4>
                    <button
                      type="button"
                      className="btn-add-item"
                      onClick={() => handleAddArrayText('storyLead', 'A new opening line…')}
                    >
                      + Add Stanza
                    </button>
                  </div>
                  {formData.storyLead.map((line, idx) => (
                    <div key={idx} className="nested-item-card">
                      <div className="item-card-top">
                        <span className="item-card-idx">Stanza #{idx + 1}</span>
                        <button
                          type="button"
                          className="btn-del-item"
                          onClick={() => handleDeleteArrayText('storyLead', idx)}
                        >
                          Remove ✕
                        </button>
                      </div>
                      <textarea
                        className="form-textarea-sm"
                        rows={2}
                        value={line}
                        onChange={(e) => handleArrayTextChange('storyLead', idx, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Stanzas (Page 9) */}
              {hasStanzas && (
                <div className="nested-items-section">
                  <div className="nested-header">
                    <h4>Final Reveal Lines ({formData.stanzas.length})</h4>
                    <button
                      type="button"
                      className="btn-add-item"
                      onClick={() => handleAddArrayText('stanzas', 'And we will love each other forever.')}
                    >
                      + Add Line
                    </button>
                  </div>
                  {formData.stanzas.map((line, idx) => (
                    <div key={idx} className="nested-item-card">
                      <div className="item-card-top">
                        <span className="item-card-idx">Line #{idx + 1}</span>
                        <button
                          type="button"
                          className="btn-del-item"
                          onClick={() => handleDeleteArrayText('stanzas', idx)}
                        >
                          Remove ✕
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-input-sm"
                        value={line}
                        onChange={(e) => handleArrayTextChange('stanzas', idx, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RELATIONSHIP CARDS (PAGE 7) */}
          {activeTab === 'cards' && hasCards && (
            <div className="drawer-tab-pane">
              <div className="nested-items-section">
                <div className="nested-header">
                  <h4>Relationship Appreciation Cards ({formData.cards.length})</h4>
                  <button
                    type="button"
                    className="btn-add-item"
                    onClick={() => handleAddCard('cards', {
                      id: `c-${Date.now()}`,
                      title: "My Whole World",
                      desc: "Because you make every normal second feel extraordinary."
                    })}
                  >
                    + Add Card
                  </button>
                </div>
                {formData.cards.map((c, idx) => (
                  <div key={c.id || idx} className="nested-item-card">
                    <div className="item-card-top">
                      <span className="item-card-idx">Card #{idx + 1}</span>
                      <button
                        type="button"
                        className="btn-del-item"
                        onClick={() => handleDeleteCard('cards', idx)}
                      >
                        Delete Card 🗑️
                      </button>
                    </div>
                    <input
                      type="text"
                      className="form-input-sm"
                      value={c.title || ''}
                      onChange={(e) => handleCardFieldChange('cards', idx, 'title', e.target.value)}
                      placeholder="Card Title (e.g. My Best Friend)"
                    />
                    <textarea
                      className="form-textarea-sm"
                      rows={2}
                      value={c.desc || ''}
                      onChange={(e) => handleCardFieldChange('cards', idx, 'desc', e.target.value)}
                      placeholder="Revealed Romantic Message"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: IMAGES & MEDIA */}
          {activeTab === 'images' && (
            <div className="drawer-tab-pane">
              <div className="image-edit-card">
                <label className="form-label">Page Image / Photograph</label>
                {formData.image ? (
                  <div className="preview-img-frame">
                    <img src={formData.image} alt="Preview" />
                    <button
                      type="button"
                      className="btn-remove-img"
                      onClick={() => handleChange('image', '')}
                    >
                      Remove Photo ✕
                    </button>
                  </div>
                ) : (
                  <p className="no-img-text">No image currently attached to this page.</p>
                )}

                <div className="form-group">
                  <label className="form-label-sub">Replace with Image URL:</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.image || ''}
                    onChange={(e) => handleChange('image', e.target.value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label-sub">Or Upload Local Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-file-input"
                    onChange={handleImageUpload}
                  />
                </div>

                {formData.imageCaption !== undefined && (
                  <div className="form-group">
                    <label className="form-label-sub">Image Caption / Note:</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.imageCaption || ''}
                      onChange={(e) => handleChange('imageCaption', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Save / Cancel */}
          <div className="drawer-footer-row">
            <button type="button" className="btn-modal-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-modal-primary">
              Save Changes ✨
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SectionEditorDrawer;
