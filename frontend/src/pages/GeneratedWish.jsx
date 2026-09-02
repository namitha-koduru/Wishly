import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemplateById } from '../templates/templateRegistry.js';
import { getWish, APP_BASE_URL } from '../services/api.js';
import PhotoLightbox from '../components/PhotoLightbox.jsx';

export function GeneratedWish() {
  const { projectId } = useParams();
  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState(null); // { url, caption }
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

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
          updateDocumentTitle(response.wish);
          return;
        }
      } catch (apiErr) {
        console.warn('API getWish failed, checking local backup:', apiErr.message);
      }

      // 2. Fallback to localStorage
      try {
        const localSaved = localStorage.getItem(`wishly_project_${projectId}`);
        if (localSaved) {
          const parsed = JSON.parse(localSaved);
          if (isMounted) {
            setWish(parsed);
            setLoading(false);
            updateDocumentTitle(parsed);
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

  const updateDocumentTitle = (wishData) => {
    if (!wishData) return;
    const name = wishData.recipientName || 'Someone Special';
    const occ = wishData.occasion;
    let titlePrefix = 'A special Wishly for';

    if (occ === 'birthday') titlePrefix = 'Happy Birthday,';
    else if (occ === 'anniversary') titlePrefix = 'Happy Anniversary,';
    else if (occ === 'graduation') titlePrefix = 'Congratulations Graduate,';
    else if (occ === 'valentines') titlePrefix = 'With All My Heart,';
    else if (occ === 'farewell') titlePrefix = 'Until We Meet Again,';
    else if (occ === 'congratulations') titlePrefix = 'Congratulations,';
    else if (occ === 'just-because') titlePrefix = 'Thinking of You,';

    document.title = `${titlePrefix} ${name} | Wishly ✨`;
  };

  const handleOpenGift = () => {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsOpened(true);
      return;
    }

    setIsOpeningAnim(true);
    setTimeout(() => {
      setIsOpened(true);
    }, 900);
  };

  const handleCopyLink = () => {
    const baseUrl = APP_BASE_URL.replace(/\/$/, '');
    const shareUrl = `${baseUrl}/w/${projectId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const baseUrl = APP_BASE_URL.replace(/\/$/, '');
    const shareUrl = `${baseUrl}/w/${projectId}`;
    const text = `I made something special for you on Wishly ✨\nOpen it here: ${shareUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    const baseUrl = APP_BASE_URL.replace(/\/$/, '');
    const shareUrl = `${baseUrl}/w/${projectId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `A special Wishly for ${wish?.recipientName || 'you'} ✨`,
          text: `A personalized celebration website made with love:`,
          url: shareUrl
        });
      } catch (e) {}
    } else {
      handleCopyLink();
    }
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
          <h2>This Wishly couldn't be found.</h2>
          <p>The link may be incorrect or the Wishly may no longer be available.</p>
          <div className="error-actions">
            <Link to="/" className="btn btn-primary btn-lg pulse-glow">
              Create Your Own Wish ✨
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

  // 1. Initial Unboxing "Gift Card" Reveal Screen
  if (!isOpened) {
    return (
      <div className={`unboxing-stage ${isOpeningAnim ? 'unboxing-burst-anim' : ''}`}>
        {/* Ambient Floating Dust Particles */}
        <div className="ambient-particles" aria-hidden="true">
          <span className="particle p1">✦</span>
          <span className="particle p2">✨</span>
          <span className="particle p3">✦</span>
          <span className="particle p4">✨</span>
          <span className="particle p5">✦</span>
        </div>

        <div className="unboxing-card">
          <div className="unboxing-wax-seal" aria-hidden="true">
            <span>✦</span>
            <div className="seal-pulse-glow"></div>
          </div>

          <span className="unboxing-eyebrow">A PERSONAL GIFT FOR YOU</span>

          <h1 className="unboxing-title">
            Someone made<br />
            something special<br />
            <em>for you.</em>
          </h1>

          {wish.senderName ? (
            <p className="unboxing-sender-note">From: <strong>{wish.senderName}</strong></p>
          ) : (
            <p className="unboxing-sender-note">Made with love and care</p>
          )}

          <div className="unboxing-action-wrap">
            <button
              type="button"
              className="btn btn-primary btn-lg unboxing-open-btn pulse-glow"
              onClick={handleOpenGift}
              autoFocus
            >
              Open Your Wishly ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Full Revealed Standalone Website Experience
  return (
    <div className="generated-wish-page wish-reveal-animation">
      {/* Lightbox for full-resolution photo viewing */}
      {lightboxPhoto && (
        <PhotoLightbox
          imageSrc={lightboxPhoto.url}
          caption={lightboxPhoto.caption}
          onClose={() => setLightboxPhoto(null)}
        />
      )}

      {/* Standalone Recipient Website Canvas */}
      <main
        className="generated-wish-canvas"
        onClick={(e) => {
          if (e.target.tagName === 'IMG' && e.target.src) {
            setLightboxPhoto({
              url: e.target.src,
              caption: e.target.alt !== wish.recipientName ? e.target.alt : ''
            });
          }
        }}
      >
        {React.createElement(template.component, {
          data: templateData
        })}
      </main>

      {/* Recipient Closing & Sharing Section */}
      <footer className="recipient-footer-section">
        <div className="recipient-closing-card text-center">
          <span className="closing-heart-sparkle">❤️</span>
          <p className="closing-sentiment-text">
            Just remember, you're special and celebrated today and always.
          </p>
          {wish.senderName && (
            <span className="closing-signature-text">— With love, {wish.senderName}</span>
          )}

          <div className="recipient-share-bar">
            <button
              type="button"
              className="btn btn-whatsapp btn-sm"
              onClick={handleWhatsAppShare}
            >
              💬 Share on WhatsApp
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleNativeShare}
            >
              {copied ? 'Link Copied! ✨' : '📤 Share this Wishly'}
            </button>
            <Link to="/" className="btn btn-primary btn-sm">
              Create Your Own Wish ✨
            </Link>
          </div>
        </div>

        <div className="recipient-watermark-note text-center">
          <p>Made with love using <Link to="/" className="watermark-brand">✦ Wishly</Link></p>
        </div>
      </footer>
    </div>
  );
}

export default GeneratedWish;
