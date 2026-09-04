import React, { useEffect } from 'react';

export function PeopleModal({ member, onClose }) {
  if (!member) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fw-modal-backdrop" onClick={onClose}>
      <div
        className="fw-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fw-modal-name"
      >
        <button
          type="button"
          className="fw-modal-close-btn"
          onClick={onClose}
          aria-label="Close message"
        >
          ✕
        </button>

        <div className="fw-modal-layout">
          <div className="fw-modal-media">
            <img
              src={member.photo}
              alt={member.name}
              className="fw-modal-photo"
            />
            <div className="fw-modal-role-pill">{member.role || 'Teammate'}</div>
          </div>

          <div className="fw-modal-content">
            <span className="fw-modal-meta">PERSONAL TRIBUTE NOTE</span>
            <h3 id="fw-modal-name" className="fw-modal-name">{member.name}</h3>
            {member.quote && (
              <blockquote className="fw-modal-quote">
                "{member.quote}"
              </blockquote>
            )}
            <p className="fw-modal-full-note">{member.note || member.quote}</p>
            <div className="fw-modal-footer">
              <span className="fw-modal-stamp">ARCHIVED WITH AFFECTION</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeopleModal;
