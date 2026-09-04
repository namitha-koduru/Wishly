import React from 'react';
import CharacterCounter from './CharacterCounter.jsx';

export function ReasonsEditor({ reasons = [], onChange, title = "Thoughts & Reasons", subtitle = "Add personalized thoughts and reasons for your recipient." }) {
  const normalizeItem = (item, index) => {
    if (typeof item === 'object' && item !== null) {
      return {
        label: item.label || item.title || `Thought #${index + 1}`,
        thought: item.thought || item.description || item.text || ''
      };
    }
    return {
      label: `Thought #${index + 1}`,
      thought: typeof item === 'string' ? item : ''
    };
  };

  const handleFieldChange = (index, field, value) => {
    const updated = reasons.map((r, i) => {
      const current = normalizeItem(r, i);
      if (i === index) {
        return { ...current, [field]: value };
      }
      return typeof r === 'object' && r !== null ? r : current;
    });
    onChange(updated);
  };

  const handleAddReason = () => {
    const nextIdx = reasons.length + 1;
    onChange([
      ...reasons,
      {
        label: `thought #${nextIdx}`,
        thought: 'Another special reason why you mean so much.'
      }
    ]);
  };

  const handleRemoveReason = (index) => {
    if (reasons.length <= 1) return;
    const updated = reasons.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMoveReason = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= reasons.length) return;
    const updated = [...reasons];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  return (
    <div className="reasons-editor-box">
      <div className="reasons-editor-header">
        <div className="reasons-editor-title-wrap">
          <span className="editor-icon">💌</span>
          <div>
            <h4 className="reasons-editor-heading">{title}</h4>
            <p className="reasons-editor-sub">{subtitle}</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm add-reason-btn"
          onClick={handleAddReason}
        >
          + Add Thought
        </button>
      </div>

      <div className="reasons-items-editor-list">
        {reasons.map((reasonItem, index) => {
          const item = normalizeItem(reasonItem, index);

          return (
            <div key={index} className="reason-edit-card">
              <div className="reason-edit-header">
                <span className="reason-index-badge">Thought #{index + 1}</span>
                <div className="reason-reorder-actions">
                  <button
                    type="button"
                    className="reorder-btn"
                    onClick={() => handleMoveReason(index, -1)}
                    disabled={index === 0}
                    aria-label="Move thought up"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="reorder-btn"
                    onClick={() => handleMoveReason(index, 1)}
                    disabled={index === reasons.length - 1}
                    aria-label="Move thought down"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  {reasons.length > 1 && (
                    <button
                      type="button"
                      className="reason-delete-btn"
                      onClick={() => handleRemoveReason(index)}
                      aria-label="Remove thought"
                      title="Remove Thought"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Thought Name / Tag */}
              <div className="form-group mt-2">
                <div className="label-with-counter">
                  <label className="field-label-sm">Thought Name / Button Tag</label>
                  <CharacterCounter current={(item.label || '').length} max={30} />
                </div>
                <input
                  type="text"
                  className="form-input form-input-sm"
                  placeholder="e.g. thinking of you, miss you, so proud..."
                  value={item.label || ''}
                  maxLength={30}
                  onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                />
              </div>

              {/* Thought Description / Full Message */}
              <div className="form-group mt-2">
                <div className="label-with-counter">
                  <label className="field-label-sm">Thought Message / Description</label>
                  <CharacterCounter current={(item.thought || '').length} max={200} />
                </div>
                <textarea
                  className="form-textarea form-textarea-sm"
                  rows={2}
                  placeholder="e.g. Watching you figure things out lately has made me quietly proud..."
                  value={item.thought || ''}
                  maxLength={200}
                  onChange={(e) => handleFieldChange(index, 'thought', e.target.value)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReasonsEditor;
