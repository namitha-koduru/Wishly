import React, { useEffect } from 'react';

export function GradPeopleModal({ member, onClose }) {
  if (!member) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="grad-modal-backdrop" onClick={onClose}>
      <div
        className="grad-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="grad-modal-title"
      >
        <button
          type="button"
          className="grad-modal-close-btn"
          onClick={onClose}
          aria-label="Close message"
        >
          ✕
        </button>

        <div className="grad-modal-layout">
          <div className="grad-modal-media">
            <img
              src={member.photo}
              alt={member.name}
              className="grad-modal-photo"
            />
            <div className="grad-modal-role-pill">{member.role || 'Supporter'}</div>
          </div>

          <div className="grad-modal-content">
            <span className="grad-modal-meta">COMMENCEMENT TRIBUTE</span>
            <h3 id="grad-modal-title" className="grad-modal-name">{member.name}</h3>
            {member.quote && (
              <blockquote className="grad-modal-quote">
                "{member.quote}"
              </blockquote>
            )}
            <p className="grad-modal-full-note">{member.note || member.quote}</p>
            <div className="grad-modal-footer">
              <span className="grad-modal-stamp">ACADEMIC & PERSONAL JOURNEY · WITH GRATITUDE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradPeopleModal;
