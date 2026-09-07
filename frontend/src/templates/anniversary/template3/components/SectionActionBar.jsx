import React from 'react';

/**
 * Section Action Bar — visible when Editor Mode is active.
 * Allows: Edit ✏️ | Duplicate ⎘ | Move ↑ | Move ↓ | Delete 🗑️
 */
export function SectionActionBar({
  section,
  index,
  totalSections,
  onEdit,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  onDelete
}) {
  return (
    <div className="section-editor-action-bar" aria-label="Section editing tools">
      <div className="action-bar-label">
        <span className="section-type-chip">{section.type || 'section'}</span>
        <span className="section-order-chip">#{index + 1}</span>
      </div>

      <div className="action-bar-buttons">
        <button
          type="button"
          className="sec-btn sec-btn-edit"
          onClick={() => onEdit(section)}
          title="Edit text, messages, images, and content"
        >
          ✏️ Edit
        </button>

        <button
          type="button"
          className="sec-btn sec-btn-dup"
          onClick={() => onDuplicate(section.id)}
          title="Duplicate this section"
        >
          ⎘ Duplicate
        </button>

        <button
          type="button"
          className="sec-btn sec-btn-up"
          onClick={() => onMoveUp(index)}
          disabled={index === 0}
          title="Move Section Up"
        >
          ↑
        </button>

        <button
          type="button"
          className="sec-btn sec-btn-down"
          onClick={() => onMoveDown(index)}
          disabled={index === totalSections - 1}
          title="Move Section Down"
        >
          ↓
        </button>

        <button
          type="button"
          className="sec-btn sec-btn-del"
          onClick={() => onDelete(section)}
          title="Delete this section"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default SectionActionBar;
