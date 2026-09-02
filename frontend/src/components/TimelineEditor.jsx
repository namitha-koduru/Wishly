import React from 'react';
import CharacterCounter from './CharacterCounter.jsx';

export function TimelineEditor({ items = [], onChange }) {
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleAddItem = () => {
    const newItem = {
      date: `Chapter 0${items.length + 1}`,
      title: 'A New Milestone',
      description: 'A special moment in our story that we will never forget.'
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    const updated = items.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMoveItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const updated = [...items];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  return (
    <div className="timeline-editor-box">
      <div className="timeline-editor-header">
        <div className="timeline-editor-title-wrap">
          <span className="editor-icon">⏳</span>
          <div>
            <h4 className="timeline-editor-heading">Story Timeline & Milestones</h4>
            <p className="timeline-editor-sub">Chronicle the chapters, dates, and memories that define your story.</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm add-milestone-btn"
          onClick={handleAddItem}
        >
          + Add Milestone
        </button>
      </div>

      <div className="timeline-items-editor-list">
        {items.map((item, index) => (
          <div key={index} className="timeline-edit-card">
            <div className="timeline-edit-card-header">
              <span className="timeline-index-badge">0{index + 1}</span>
              <div className="timeline-reorder-actions">
                <button
                  type="button"
                  className="reorder-btn"
                  onClick={() => handleMoveItem(index, -1)}
                  disabled={index === 0}
                  aria-label="Move milestone up"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="reorder-btn"
                  onClick={() => handleMoveItem(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label="Move milestone down"
                  title="Move Down"
                >
                  ↓
                </button>
                {items.length > 1 && (
                  <button
                    type="button"
                    className="timeline-delete-btn"
                    onClick={() => handleRemoveItem(index)}
                    aria-label="Remove milestone"
                    title="Remove Milestone"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="timeline-fields-grid">
              <div className="form-group">
                <label className="field-label-sm">Date / Year / Tag</label>
                <input
                  type="text"
                  className="form-input form-input-sm"
                  placeholder="e.g. 2021 or First Day"
                  value={item.date || ''}
                  maxLength={50}
                  onChange={(e) => handleItemChange(index, 'date', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="field-label-sm">Milestone Title</label>
                <input
                  type="text"
                  className="form-input form-input-sm"
                  placeholder="e.g. The First Spark"
                  value={item.title || ''}
                  maxLength={100}
                  onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group mt-2">
              <div className="label-with-counter">
                <label className="field-label-sm">Short Description</label>
                <CharacterCounter current={(item.description || '').length} max={250} />
              </div>
              <textarea
                className="form-textarea form-textarea-sm"
                rows={2}
                placeholder="What made this moment unforgettable?"
                value={item.description || ''}
                maxLength={250}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineEditor;
