import React from 'react';
import CharacterCounter from './CharacterCounter.jsx';

export function ReasonsEditor({ reasons = [], onChange }) {
  const handleReasonChange = (index, value) => {
    const updated = [...reasons];
    updated[index] = value;
    onChange(updated);
  };

  const handleAddReason = () => {
    onChange([...reasons, 'Another wonderful reason why you are so special.']);
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
          <span className="editor-icon">💖</span>
          <div>
            <h4 className="reasons-editor-heading">Reasons Why You're Special</h4>
            <p className="reasons-editor-sub">Add personalized reasons that make your recipient one in a million.</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm add-reason-btn"
          onClick={handleAddReason}
        >
          + Add Reason
        </button>
      </div>

      <div className="reasons-items-editor-list">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-edit-card">
            <div className="reason-edit-header">
              <span className="reason-index-badge">Reason #{index + 1}</span>
              <div className="reason-reorder-actions">
                <button
                  type="button"
                  className="reorder-btn"
                  onClick={() => handleMoveReason(index, -1)}
                  disabled={index === 0}
                  aria-label="Move reason up"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="reorder-btn"
                  onClick={() => handleMoveReason(index, 1)}
                  disabled={index === reasons.length - 1}
                  aria-label="Move reason down"
                  title="Move Down"
                >
                  ↓
                </button>
                {reasons.length > 1 && (
                  <button
                    type="button"
                    className="reason-delete-btn"
                    onClick={() => handleRemoveReason(index)}
                    aria-label="Remove reason"
                    title="Remove Reason"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="form-group mt-1">
              <div className="label-with-counter">
                <label className="field-label-sm">Reason Description</label>
                <CharacterCounter current={(reason || '').length} max={150} />
              </div>
              <input
                type="text"
                className="form-input form-input-sm"
                placeholder="e.g. Your contagious laughter that brightens every room..."
                value={reason || ''}
                maxLength={150}
                onChange={(e) => handleReasonChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReasonsEditor;
