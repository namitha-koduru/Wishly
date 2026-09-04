import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemplateById } from '../templates/templateRegistry.js';
import { getWish, APP_BASE_URL } from '../services/api.js';
import PhotoLightbox from '../components/PhotoLightbox.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';

export function GeneratedWish() {
  const { projectId } = useParams();
  const [wish, setWish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState(null); // 'not-found' | 'network' | null
  const [isOpened, setIsOpened] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);
  const [lightboxState, setLightboxState] = useState({ isOpen: false, index: 0 });
  const [copied, setCopied] = useState(false);

  // Fetch wish data
  const loadWishData = async () => {
    setLoading(true);
    setErrorType(null);

    // 1. Fetch from backend API
    try {
      const response = await getWish(projectId);
      if (response?.wish) {
        setWish(response.wish);
        setLoading(false);
        updateDocumentTitle(response.wish);
        return;
      }
    } catch (apiErr) {
      console.warn('API getWish call failed:', apiErr.message);
      if (apiErr.message?.includes('Failed to fetch') || apiErr.message?.includes('NetworkError')) {
        setErrorType('network');
      }
    }

    // 2. Fallback to localStorage (for instant offline creator preview)
    try {
      const localSaved = localStorage.getItem(`wishly_project_${projectId}`);
      if (localSaved) {
        const parsed = JSON.parse(localSaved);
        setWish(parsed);
        setErrorType(null);
        setLoading(false);
        updateDocumentTitle(parsed);
        return;
      }
    } catch (localErr) {
      console.warn('Local draft parsing error:', localErr);
    }

    // 3. Not found
    setErrorType((prev) => prev || 'not-found');
    setLoading(false);
  };

  useEffect(() => {
    if (projectId) {
      loadWishData();
    }
  }, [projectId]);

  // Set personalized document title
  const updateDocumentTitle = (wishData) => {
    if (!wishData) return;
    const name = wishData.recipientName || 'Someone Special';
    const occ = wishData.occasion;
    let titleStr = '';

    if (occ === 'birthday') titleStr = `Happy Birthday, ${name} ✨ | Wishly`;
    else if (occ === 'anniversary') titleStr = `Our Anniversary ❤️ | Wishly`;
    else if (occ === 'graduation') titleStr = `Congratulations, ${name} 🎓 | Wishly`;
    else if (occ === 'valentines') titleStr = `For My Valentine, ${name} 💖 | Wishly`;
    else if (occ === 'farewell') titleStr = `Until We Meet Again, ${name} 👋 | Wishly`;
    else if (occ === 'congratulations') titleStr = `Congratulations, ${name} 🎉 | Wishly`;
    else if (occ === 'just-because') titleStr = `Thinking of You, ${name} 🌸 | Wishly`;
    else titleStr = `A Special Wishly for ${name} ✨`;

    document.title = titleStr;
  };

  // Open Gift Ceremony Handler
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

  // Sharing Actions
  const handleCopyLink = () => {
    const baseUrl = APP_BASE_URL.replace(/\/$/, '');
    const shareUrl = `${baseUrl}/w/${projectId}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getWhatsAppMessage = () => {
    const baseUrl = APP_BASE_URL.replace(/\/$/, '');
    const shareUrl = `${baseUrl}/w/${projectId}`;
    const occ = wish?.occasion;

    if (occ === 'birthday') return `I made something special for you 🎂✨ Open your Wishly: ${shareUrl}`;
    if (occ === 'anniversary') return `I made a little something for us ❤️ Open it here: ${shareUrl}`;
    if (occ === 'graduation') return `Your achievement deserves a little celebration 🎓✨ Open this: ${shareUrl}`;
    if (occ === 'valentines') return `A little piece of my heart for you ❤️ Open it here: ${shareUrl}`;
    if (occ === 'farewell') return `A collection of our fondest memories 👋✨ Open this: ${shareUrl}`;
    if (occ === 'congratulations') return `So proud of your achievement! 🎉✨ Open your Wishly: ${shareUrl}`;
    return `Just a little reminder that you are special 🌸✨ Open it here: ${shareUrl}`;
  };

  const handleWhatsAppShare = () => {
    const text = getWhatsAppMessage();
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
          text: `A personalized celebration mini-website:`,
          url: shareUrl
        });
      } catch (e) {}
    } else {
      handleCopyLink();
    }
  };

  // 1. Loading State
  if (loading) {
    return (
      <LoadingScreen
        title="Preparing something special..."
        subtitle="Unwrapping your personalized keepsake ✨"
        fullScreen={true}
      />
    );
  }

  // 2. Error States
  if (errorType || !wish) {
    if (errorType === 'network') {
      return (
        <div className="generated-wish-error-screen">
          <div className="error-card text-center">
            <div className="error-emoji">📡</div>
            <h2>Couldn't load this Wishly.</h2>
            <p>Please check your connection and try again.</p>
            <div className="error-actions">
              <button type="button" className="btn btn-primary btn-lg pulse-glow" onClick={loadWishData}>
                Try Again ↻
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="generated-wish-error-screen">
        <div className="error-card text-center">
          <div className="error-emoji">🔍</div>
          <h2>Oops — this Wishly seems to have wandered off.</h2>
          <p>Ask the person who sent it to check the link.</p>
          <div className="error-actions">
            <Link to="/" className="btn btn-primary btn-lg pulse-glow">
              ← Back to Wishly
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Retrieve template from Central Registry
  const template = getTemplateById(wish.templateId);

  if (!template) {
    return (
      <div className="generated-wish-error-screen">
        <div className="error-card text-center">
          <div className="error-emoji">⚠️</div>
          <h2>Template Not Available</h2>
          <p>The design for this Wishly could not be loaded.</p>
          <Link to="/" className="btn btn-primary mt-3">Go to Home</Link>
        </div>
      </div>
    );
  }

  // Normalize photos array
  const rawPhotos = Array.isArray(wish.photos) ? wish.photos : [];
  const normalizedPhotoObjects = rawPhotos
    .map((p) => {
      if (typeof p === 'string') return { url: p, caption: '' };
      if (typeof p === 'object' && p !== null && p.url) return { url: p.url, caption: p.caption || '' };
      return null;
    })
    .filter(Boolean);

  const normalizedPhotoUrls = normalizedPhotoObjects.map((p) => p.url);

  // Combined template payload
  const templateData = {
    recipientName: wish.recipientName,
    senderName: wish.senderName,
    message: wish.message,
    photos: normalizedPhotoUrls,
    photoObjects: normalizedPhotoObjects,
    ...(wish.customData || {})
  };

  // 4. Initial Cinematic Unboxing Opening Screen
  if (!isOpened) {
    return (
      <div className={`unboxing-stage ${isOpeningAnim ? 'unboxing-burst-anim' : ''}`}>
        {/* Ambient floating dust particles */}
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

          <span className="unboxing-eyebrow">✦ A LITTLE SOMETHING FOR YOU</span>

          <h1 className="unboxing-title">
            Someone made something<br />
            <em>special for you.</em>
          </h1>

          <p className="unboxing-subtitle-text">
            A few words, memories, and moments —<br />
            made just for you.
          </p>

          {wish.senderName && (
            <p className="unboxing-sender-note">
              From: <strong>{wish.senderName}</strong>
            </p>
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

  // 5. Full Revealed Personalized Mini-Website
  return (
    <div className={`generated-wish-page wish-reveal-animation occasion-theme-${wish.occasion || 'birthday'}`}>
      {/* Toast Notification */}
      {copied && (
        <div className="wishly-toast-notification animate-fade-in" role="status">
          ✓ Wishly link copied ✨
        </div>
      )}

      {/* Photo Lightbox with Gallery Navigation */}
      {lightboxState.isOpen && (
        <PhotoLightbox
          photos={normalizedPhotoObjects}
          currentIndex={lightboxState.index}
          onClose={() => setLightboxState({ isOpen: false, index: 0 })}
          onIndexChange={(newIndex) => setLightboxState({ isOpen: true, index: newIndex })}
        />
      )}

      {/* Main Personalized Story Canvas */}
      <main
        className="generated-wish-canvas"
        onClick={(e) => {
          if (e.target.tagName === 'IMG' && e.target.src) {
            const clickedSrc = e.target.src;
            const foundIdx = normalizedPhotoObjects.findIndex((p) => p.url === clickedSrc);
            setLightboxState({
              isOpen: true,
              index: foundIdx >= 0 ? foundIdx : 0
            });
          }
        }}
      >
        {React.createElement(template.component, {
          data: templateData
        })}
      </main>

      {/* Recipient Closing & Viral Sharing Section */}
      <footer className="recipient-footer-section">
        <div className="recipient-closing-card text-center">
          <span className="closing-heart-sparkle">❤️</span>
          <h3 className="closing-sentiment-text">And that's your little Wishly.</h3>
          <p className="closing-sub-text">Made especially for you.</p>

          {wish.senderName && (
            <span className="closing-signature-text">— With love, {wish.senderName}</span>
          )}

          <div className="recipient-share-container">
            <p className="pass-feeling-text">Want to pass the feeling along?</p>
            <div className="recipient-share-bar">
              <button
                type="button"
                className="btn btn-whatsapp btn-sm"
                onClick={handleWhatsAppShare}
              >
                💬 WhatsApp
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleNativeShare}
              >
                ♡ Share this Wishly
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleCopyLink}
              >
                {copied ? '✓ Link Copied' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Watermark & CTA */}
        <div className="recipient-watermark-note text-center">
          <p className="watermark-tagline">
            ✦ <strong>Wishly</strong> — <em>Wishes, made personal.</em>
          </p>
          <Link to="/templates" className="watermark-create-cta">
            Make one for someone special →
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default GeneratedWish;
