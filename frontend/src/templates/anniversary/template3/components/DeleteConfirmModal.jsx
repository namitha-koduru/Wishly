import React from 'react';

/**
 * Confirmation dialog for deleting a section
 */
export function DeleteConfirmModal({ section, onConfirm, onCancel }) {
  if (!section) return null;

  return (
    <div className="tpl3-modal-overlay" onClick={onCancel}>
      <div
        className="tpl3-modal-content delete-confirm-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="del-modal-title"
      >
        <div className="modal-icon-header">
          <span className="warning-icon">🗑️</span>
        </div>
        <h3 id="del-modal-title" className="modal-title">Delete this section?</h3>
        <p className="modal-desc">
          Are you sure you want to remove <strong>"{section.title || section.heading || section.type}"</strong> from your anniversary story? This action cannot be undone.
        </p>

        <div className="modal-actions-row">
          <button
            type="button"
            className="btn-modal-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-modal-danger"
            onClick={() => onConfirm(section.id)}
          >
            Delete Section
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
