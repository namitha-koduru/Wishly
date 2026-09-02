import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemplateById } from '../templates/templateRegistry.js';
import { getWish } from '../services/api.js';

export function GeneratedWish() {
  const { projectId } = useParams();
  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadWishData() {
      setLoading(true);
      setError(null);

      // 1. Fetch from backend API
      try {
        const response = await getWish(projectId);
        if (isMounted && response?.wish) {
          setWish(response.wish);
          setLoading(false);
          return;
        }
      } catch (apiErr) {
        console.warn('API getWish failed, checking local backup:', apiErr.message);
      }

      // 2. Fallback to localStorage (for offline/creator immediate view)
      try {
        const localSaved = localStorage.getItem(`wishly_project_${projectId}`);
        if (localSaved) {
          const parsed = JSON.parse(localSaved);
          if (isMounted) {
            setWish(parsed);
            setLoading(false);
            return;
          }
        }
      } catch (localErr) {
        console.warn('Local backup parsing error:', localErr);
      }

      // 3. Not found
      if (isMounted) {
        setError('Wish not found');
        setLoading(false);
      }
    }

    if (projectId) {
      loadWishData();
    }

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const handleOpenGift = () => {
    setIsOpeningAnim(true);
    setTimeout(() => {
      setIsOpened(true);
    }, 450);
  };

  // Loading State
  if (loading) {
    return (
      <div className="generated-wish-loading-screen">
        <div className="loading-card text-center">
          <div className="loading-sparkle-icon">✦</div>
          <h2>Preparing something special...</h2>
          <p>Unwrapping your personalized Wishly keepsake</p>
        </div>
      </div>
    );
  }

  // Error / Not Found State
  if (error || !wish) {
    return (
      <div className="generated-wish-error-screen">
        <div className="error-card text-center">
          <div className="error-emoji">🔍</div>
          <h2>Oops! This Wishly couldn't be found.</h2>
          <p>Maybe the link is incorrect, or the wish no longer exists.</p>
          <div className="error-actions">
            <Link to="/templates" className="btn btn-primary btn-lg pulse-glow">
              Create Your Own Wish ✨
            </Link>
            <Link to="/" className="btn btn-secondary">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Retrieve template from central Template Registry
  const template = getTemplateById(wish.templateId);

  if (!template) {
    return (
      <div className="generated-wish-error-screen">
        <div className="error-card text-center">
          <div className="error-emoji">⚠️</div>
          <h2>Template Not Available</h2>
          <p>The template for this wish could not be loaded.</p>
          <Link to="/templates" className="btn btn-primary mt-3">Browse Templates</Link>
        </div>
      </div>
    );
  }

  // Normalize photos: extract plain URLs for template compatibility
  const normalizedPhotos = Array.isArray(wish.photos)
    ? wish.photos
        .map((p) => {
          if (typeof p === 'string') return p;
          if (typeof p === 'object' && p !== null && p.url) return p.url;
          return null;
        })
        .filter(Boolean)
    : [];

  // Combine wish fields & customData
  const templateData = {
    recipientName: wish.recipientName,
    senderName: wish.senderName,
    message: wish.message,
    photos: normalizedPhotos,
    ...(wish.customData || {})
  };

  // Initial Unboxing "Gift Card" Reveal Screen
  if (!isOpened) {
    return (
      <div className={`unboxing-stage ${isOpeningAnim ? 'unboxing-exit-anim' : ''}`}>
        <div className="unboxing-card">
          <div className="unboxing-wax-seal">✦</div>
          <span className="unboxing-eyebrow">A PERSONAL GIFT FOR YOU</span>
          <h1 className="unboxing-title">
            Someone made something<br />
            <em>special just for you.</em>
          </h1>
          {wish.senderName && (
            <p className="unboxing-sender-note">From: <strong>{wish.senderName}</strong></p>
          )}
          <button
            type="button"
            className="btn btn-primary btn-lg unboxing-open-btn pulse-glow"
            onClick={handleOpenGift}
          >
            Open Your Wishly ✨
          </button>
        </div>
      </div>
    );
  }

  // Full Revealed Standalone Website
  return (
    <div className="generated-wish-page animate-fade-in">
      <main className="generated-wish-canvas">
        {React.createElement(template.component, {
          data: templateData
        })}
      </main>

      {/* Subtle Footer Watermark */}
      <footer className="generated-wish-watermark">
        <p>Made with love using <Link to="/" className="watermark-brand">✦ Wishly</Link></p>
        <Link to="/templates" className="btn btn-primary btn-sm watermark-btn">
          Create Your Own Wish ✨
        </Link>
      </footer>
    </div>
  );
}

export default GeneratedWish;
