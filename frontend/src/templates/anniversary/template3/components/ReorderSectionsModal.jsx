import React from 'react';

/**
 * Reorder Sections Modal — Move up/down, toggle visibility, and reorder chapters
 */
export function ReorderSectionsModal({
  isOpen,
  onClose,
  sections,
  onMoveUp,
  onMoveDown,
  onToggleEnabled,
  onDelete
}) {
  if (!isOpen) return null;

  return (
    <div className="tpl3-modal-overlay" onClick={onClose}>
      <div
        className="tpl3-modal-content reorder-modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header-row">
          <div>
            <h3 className="modal-title">🔀 Reorder Anniversary Chapters</h3>
            <p className="modal-sub">Arrange the exact flow of your love story:</p>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="reorder-items-list">
          {sections.map((sec, idx) => (
            <div key={sec.id} className="reorder-item-row">
              <div className="reorder-left">
                <span className="reorder-num">{idx + 1}</span>
                <div className="reorder-meta">
                  <h4 className="reorder-sec-title">
                    {sec.title || sec.heading || sec.type}
                  </h4>
                  <span className="reorder-type-tag">{sec.type}</span>
                </div>
              </div>

              <div className="reorder-controls">
                <button
                  type="button"
                  className="reorder-btn"
                  onClick={() => onMoveUp(idx)}
                  disabled={idx === 0}
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className="reorder-btn"
                  onClick={() => onMoveDown(idx)}
                  disabled={idx === sections.length - 1}
                  title="Move Down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className="reorder-btn btn-del"
                  onClick={() => onDelete(sec)}
                  title="Delete Section"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer-row">
          <button
            type="button"
            className="btn-modal-primary"
            onClick={onClose}
          >
            Done Reordering ✓
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReorderSectionsModal;
