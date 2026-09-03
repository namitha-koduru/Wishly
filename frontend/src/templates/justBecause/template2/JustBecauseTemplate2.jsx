import React from 'react';
import './JustBecauseTemplate2.css';

export function JustBecauseTemplate2({ data = {} }) {
  const {
    recipientName = 'Dear Friend',
    senderName = 'Always cheering for you, Alex',
    message = 'Just a small reminder in the middle of a busy week: you are doing great, your efforts matter, and you are loved.',
    photos = ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-note">
      <div className="note-card-paper">
        <div className="note-washi-tape"></div>
        <h2 className="note-salutation">{recipientName},</h2>

        <div className="note-body">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="note-photo-tuck">
            <img src={photoUrls[0]} alt={recipientName} />
          </div>
        )}

        <div className="note-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

export const ALittleNoteTemplate = JustBecauseTemplate2;
export default JustBecauseTemplate2;
