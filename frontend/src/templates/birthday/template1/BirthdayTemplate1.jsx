import React, { useState, useEffect, useRef } from 'react';
import './BirthdayTemplate1.css';

const DEFAULT_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80', caption: 'Our favourite moment 💕' },
  { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80', caption: 'Always smiling ✨' },
  { url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80', caption: 'Pure joy 🌸' },
  { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80', caption: 'Shining bright 🌟' },
  { url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80', caption: 'Precious moments 💛' },
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80', caption: 'The very best of us 🌺' }
];

const HEART_SPOTS = [
  { x: 180, y: 50 }, { x: 168, y: 60 }, { x: 192, y: 60 },
  { x: 174, y: 74 }, { x: 186, y: 74 }, { x: 164, y: 84 }, { x: 196, y: 84 }, { x: 178, y: 92 }, { x: 182, y: 92 },
  { x: 130, y: 84 }, { x: 118, y: 96 }, { x: 144, y: 94 }, { x: 108, y: 108 },
  { x: 230, y: 84 }, { x: 242, y: 96 }, { x: 216, y: 94 }, { x: 252, y: 108 },
  { x: 14, y: 100 }, { x: 30, y: 110 }, { x: 48, y: 120 }, { x: 65, y: 132 },
  { x: 346, y: 100 }, { x: 330, y: 110 }, { x: 312, y: 120 }, { x: 295, y: 132 },
  { x: 82, y: 148 }, { x: 100, y: 162 }, { x: 118, y: 174 }, { x: 136, y: 186 },
  { x: 278, y: 148 }, { x: 260, y: 162 }, { x: 242, y: 174 }, { x: 224, y: 186 },
  { x: 148, y: 134 }, { x: 158, y: 148 }, { x: 166, y: 162 },
  { x: 212, y: 134 }, { x: 202, y: 148 }, { x: 194, y: 162 },
  { x: 172, y: 178 }, { x: 180, y: 188 }, { x: 188, y: 178 },
  { x: 90, y: 200 }, { x: 108, y: 212 }, { x: 128, y: 222 }, { x: 150, y: 232 },
  { x: 210, y: 232 }, { x: 232, y: 222 }, { x: 252, y: 212 }, { x: 270, y: 200 },
  { x: 156, y: 244 }, { x: 204, y: 244 }, { x: 162, y: 256 }, { x: 198, y: 256 },
  { x: 52, y: 142 }, { x: 72, y: 156 }, { x: 290, y: 142 }, { x: 308, y: 156 },
  { x: 140, y: 108 }, { x: 220, y: 108 }, { x: 94, y: 180 }, { x: 266, y: 180 }
];

const HEART_COLORS = ['#e91e63', '#f06292', '#ad1457', '#ff80ab', '#f48fb1', '#ff4081', '#c2185b', '#ff1744', '#ec407a', '#ff80ab'];
const POPPER_COLORS = ['#f0c842', '#e91e63', '#9c27b0', '#06d6a0', '#ff5722', '#fff', '#f48fb1', '#7c4dff', '#00bcd4'];
const TOTAL_CANDLES = 23;

function getHeartPath(cx, cy, s) {
  return `M${cx} ${cy + s * 0.35}C${cx} ${cy + s * 0.25},${cx - s * 0.5} ${cy - s * 0.1},${cx - s * 0.5} ${cy - s * 0.2}C${cx - s * 0.5} ${cy - s * 0.5},${cx} ${cy - s * 0.4},${cx} ${cy - s * 0.1}C${cx} ${cy - s * 0.4},${cx + s * 0.5} ${cy - s * 0.5},${cx + s * 0.5} ${cy - s * 0.2}C${cx + s * 0.5} ${cy - s * 0.1},${cx} ${cy + s * 0.25},${cx} ${cy + s * 0.35}Z`;
}

export function BirthdayTemplate1({ data = {} }) {
  const {
    recipientName = 'Anu',
    senderName = 'With all my love ❤️',
    message = "Today is a really special day — the day an amazing soul came into this world. I feel so lucky and grateful to celebrate you today.\n\nGrowing up together and sharing so many memories has been one of the greatest blessings of my life. You make every room brighter and every day sweeter.\n\nMay this year bring you endless happiness, beautiful adventures, and all the love you truly deserve.\n\nHappy Birthday! ❤️",
    photos = [],
    age = '23',
    date = 'Special Day',
    customData = {}
  } = data;

  const [activePage, setActivePage] = useState('page-cover');
  const [exitingPage, setExitingPage] = useState(null);
  const [cardOpening, setCardOpening] = useState(false);
  
  // Cake State
  const [litCandles, setLitCandles] = useState(() => new Set(Array.from({ length: TOTAL_CANDLES }, (_, i) => i)));
  const [cakeHint, setCakeHint] = useState('✦ Tap cake to blow out candles ✦');
  
  // Envelope State
  const [envOpen, setEnvOpen] = useState(false);
  const [envBgColor, setEnvBgColor] = useState('rgb(10, 5, 2)');
  const [letterBgColor, setLetterBgColor] = useState('rgb(255, 253, 248)');
  const [showContinueBtn, setShowContinueBtn] = useState(false);
  
  // Heart Tree State
  const [bloomedHearts, setBloomedHearts] = useState([]);

  // Canvas Refs
  const starsCanvasRef = useRef(null);
  const popperCanvasRef = useRef(null);
  const starRafRef = useRef(null);
  const popperRafRef = useRef(null);
  const envSceneRef = useRef(null);

  // Normalized Photos
  const photoItems = React.useMemo(() => {
    if (photos && photos.length > 0) {
      return photos.map((p, idx) => {
        if (typeof p === 'object' && p !== null) {
          return { url: p.url, caption: p.caption || `Memory ${idx + 1} ✨` };
        }
        return { url: p, caption: `Memory ${idx + 1} ✨` };
      }).filter(item => Boolean(item.url));
    }
    return DEFAULT_PHOTOS;
  }, [photos]);

  // Page Transition helper
  const navigateTo = (targetPageId) => {
    setExitingPage(activePage);
    setTimeout(() => {
      setActivePage(targetPageId);
      setExitingPage(null);
    }, 450);
  };

  // Card Opening
  const handleOpenCard = () => {
    setCardOpening(true);
    setTimeout(() => {
      navigateTo('page-cake');
    }, 420);
  };

  // Stars Animation on Cake Page
  useEffect(() => {
    if (activePage !== 'page-cake') {
      if (starRafRef.current) cancelAnimationFrame(starRafRef.current);
      return;
    }

    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      a: Math.random(),
      sp: 0.005 + Math.random() * 0.018
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(p => {
        p.a += p.sp;
        if (p.a > 1) p.a = 0;
        ctx.save();
        ctx.globalAlpha = Math.sin(p.a * Math.PI) * 0.85 + 0.1;
        ctx.fillStyle = p.r > 1.3 ? '#f0c842' : '#fff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      starRafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (starRafRef.current) cancelAnimationFrame(starRafRef.current);
    };
  }, [activePage]);

  // Popper Confetti Burst Animation
  const launchPoppers = () => {
    const canvas = popperCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add('on');

    let particles = [];
    const origins = [
      [0.12, 0.8], [0.3, 0.6], [0.5, 0.5], [0.7, 0.6], [0.88, 0.8], [0.22, 0.88], [0.78, 0.88]
    ];

    origins.forEach(([fx, fy]) => {
      const ox = canvas.width * fx;
      const oy = canvas.height * fy;
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 4 + Math.random() * 9;
        particles.push({
          x: ox,
          y: oy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 7,
          life: 0.95,
          color: POPPER_COLORS[Math.floor(Math.random() * POPPER_COLORS.length)],
          type: Math.random() > 0.5 ? 'rect' : 'circle',
          w: 3 + Math.random() * 7,
          h: 2 + Math.random() * 5,
          r: 2 + Math.random() * 3,
          rot: Math.random() * Math.PI * 2,
          rv: (0.02 + Math.random() * 0.09) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    });

    const runPoppers = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.11;
        p.vx *= 0.99;
        p.life -= 0.013;
        p.rot += p.rv;
        if (p.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.type === 'rect') {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      particles = particles.filter(p => p.life > 0);
      if (particles.length > 0) {
        popperRafRef.current = requestAnimationFrame(runPoppers);
      } else {
        canvas.classList.remove('on');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    runPoppers();
  };

  // Blow Candle Interaction
  const handleBlowCandles = () => {
    if (litCandles.size === 0) return;

    const available = Array.from(litCandles);
    const countToBlow = Math.min(5, available.length);
    const blown = [];
    const nextSet = new Set(litCandles);

    for (let i = 0; i < countToBlow; i++) {
      const idx = Math.floor(Math.random() * available.length);
      const chosen = available.splice(idx, 1)[0];
      blown.push(chosen);
      nextSet.delete(chosen);
    }

    setLitCandles(nextSet);

    if (nextSet.size === 0) {
      setCakeHint(`🎉 All blown! Happy Birthday ${recipientName}!`);
      setTimeout(() => {
        launchPoppers();
        setTimeout(() => navigateTo('page-photos'), 1900);
      }, 450);
    } else {
      setCakeHint(`✦ ${nextSet.size} candle${nextSet.size !== 1 ? 's' : ''} still glowing ✦`);
    }
  };

  // Envelope Open
  const handleOpenEnv = () => {
    if (envOpen) return;
    setEnvOpen(true);
    setCakeHint('✦ Scroll down to read your letter ✦');
    // Ensure continue button appears after letter is revealed
    setTimeout(() => {
      setShowContinueBtn(true);
    }, 1100);
  };

  // Envelope Scroll Listener for background blending to pink
  const handleEnvScroll = (e) => {
    const sc = e.currentTarget;
    if (!sc) return;
    const maxScroll = Math.max(sc.scrollHeight - sc.clientHeight, 1);
    const ratio = Math.min(Math.max(sc.scrollTop / maxScroll, 0), 1);

    // Smooth gradient: black rgb(10,5,2) -> vibrant rose pink rgb(244,143,177)
    const r = Math.round(10 + 234 * ratio);
    const g = Math.round(5 + 138 * ratio);
    const b = Math.round(2 + 175 * ratio);
    setEnvBgColor(`rgb(${r}, ${g}, ${b})`);

    const paperG = Math.round(253 - 53 * ratio);
    const paperB = Math.round(248 - 78 * ratio);
    setLetterBgColor(`rgb(255, ${paperG}, ${paperB})`);

    if (ratio > 0.25 || envOpen) {
      setShowContinueBtn(true);
    }
  };

  // SVG Heart Tree Animation on mount of page-tree
  useEffect(() => {
    if (activePage === 'page-tree') {
      const shuffled = [...HEART_SPOTS].sort(() => Math.random() - 0.5);
      const items = shuffled.map((pt, i) => ({
        id: i,
        x: pt.x,
        y: pt.y,
        size: 8 + Math.random() * 10,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        delay: i * 55
      }));
      setBloomedHearts(items);
    }
  }, [activePage]);

  // Clean up popper RAF on unmount
  useEffect(() => {
    return () => {
      if (popperRafRef.current) cancelAnimationFrame(popperRafRef.current);
    };
  }, []);

  const getPageClass = (pageId) => {
    if (activePage === pageId) return 'tpl-page active';
    if (exitingPage === pageId) return 'tpl-page exit-left';
    return 'tpl-page hidden';
  };

  return (
    <div className="wishly-birthday-template-1">
      <div className="tpl-stage">
        <canvas id="popper-canvas" ref={popperCanvasRef}></canvas>

        {/* ══════════ PAGE 0 — COVER ══════════ */}
        <div className={getPageClass('page-cover')} id="page-cover">
          <div className="card-container" onClick={handleOpenCard}>
            <div className={`card-face ${cardOpening ? 'opening' : ''}`}>
              <span className="corner tl">❧</span>
              <span className="corner tr">❧</span>
              <span className="corner bl">❧</span>
              <span className="corner br">❧</span>
              <p className="card-ornament">✦ A Special Greeting ✦</p>
              <span className="card-rose">🌹</span>
              <h2 className="card-title">Happy Birthday</h2>
              <h1 className="card-name">{recipientName}</h1>
              <div className="card-divider"><span></span><i>✦</i><span></span></div>
              <p className="card-sub">{customData.subtitle || 'With Love & Warmth'}</p>
              <p className="tap-hint">✦ Tap to Open ✦</p>
            </div>
          </div>
        </div>

        {/* ══════════ PAGE 1 — CAKE ══════════ */}
        <div className={getPageClass('page-cake')} id="page-cake">
          <canvas id="stars-canvas" ref={starsCanvasRef}></canvas>
          <div className="cake-page-inner">
            <p className="hb-badge">✦ Today Is Your Day ✦</p>
            <h2 className="hb-title">Happy Birthday</h2>
            <h1 className="hb-name">{recipientName}</h1>
            <p className="hb-age">{age ? `Celebrating ${age} Years` : 'A Beautiful Celebration'}</p>

            <div className="cake-scene" id="cakeEl" onClick={handleBlowCandles}>
              <div className="cake-top-wrap">
                <div className="candles-grid">
                  {Array.from({ length: TOTAL_CANDLES }, (_, i) => (
                    <div className="candle" key={i}>
                      <div className={`flame ${!litCandles.has(i) ? 'out' : ''}`}></div>
                      <div className="wick"></div>
                      <div className="candle-stick"></div>
                    </div>
                  ))}
                </div>
                <div className="cake-top"></div>
              </div>
              <div className="cake-mid"></div>
              <div className="cake-bot" data-label={`Happy Birthday ${recipientName} ♥`}></div>
              <div className="cake-plate"></div>
            </div>
            <p className="cake-hint">{cakeHint}</p>
          </div>
        </div>

        {/* ══════════ PAGE 2 — PHOTOS ══════════ */}
        <div className={getPageClass('page-photos')} id="page-photos">
          <div className="photos-inner">
            <p className="sec-title">✦ Memories With You ✦</p>
            <div className="pgrid">
              {photoItems.map((item, idx) => {
                const isWide = idx === 0 || idx === 5 || (photoItems.length === 1);
                return (
                  <div key={idx} className={`pcell ${isWide ? 'wide' : ''}`}>
                    {item.url ? (
                      <>
                        <img src={item.url} alt={item.caption || `Memory ${idx + 1}`} />
                        <div className="pcap">{item.caption}</div>
                      </>
                    ) : (
                      <>
                        <div className="pph">📸</div>
                        <div className="ppt">{item.caption}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <button className="gold-btn" onClick={() => navigateTo('page-envelope')}>
              Continue →
            </button>
          </div>
        </div>

        {/* ══════════ PAGE 3 — ENVELOPE ══════════ */}
        <div
          className={getPageClass('page-envelope')}
          id="page-envelope"
          style={{ background: envBgColor }}
          onScroll={handleEnvScroll}
        >
          <div className="env-scene" ref={envSceneRef} onScroll={handleEnvScroll}>
            <p className="env-hint">
              {envOpen ? '✦ Scroll down to read your letter ✦' : '✦ Tap the envelope to open ✦'}
            </p>
            <div className="envelope-wrap" onClick={handleOpenEnv}>
              <div className="env-body">
                <div className={`env-flap ${envOpen ? 'open' : ''}`}></div>
                <div className="env-lf"></div>
                <div className="env-rf"></div>
                <div className="env-cf"></div>
                <div className={`env-seal ${envOpen ? 'gone' : ''}`}>🌹</div>
              </div>
            </div>

            <div className={`letter ${envOpen ? 'open' : ''}`} style={{ background: letterBgColor }}>
              <div className="letter-lines">
                <p className="l-dear">Dear {recipientName},</p>
                <div className="l-body">
                  <p>{message}</p>
                </div>
                <div className="l-sig">{senderName}</div>
              </div>
            </div>

            <button
              className={`continue-btn ${showContinueBtn ? 'show' : ''}`}
              onClick={() => {
                launchPoppers();
                navigateTo('page-tree');
              }}
            >
              ✦ Continue to Finale ✨ ✦
            </button>
          </div>
        </div>

        {/* ══════════ PAGE 4 — TREE & FINALE ══════════ */}
        <div className={getPageClass('page-tree')} id="page-tree">
          <p className="tree-title">✦ A Tree Full of Love ✦</p>
          <div className="tree-scene">
            <svg id="heart-tree" viewBox="0 0 360 390" xmlns="http://www.w3.org/2000/svg">
              {/* trunk */}
              <rect x="167" y="258" width="26" height="100" rx="9" fill="#6d3a00" />
              <rect x="173" y="268" width="5" height="80" rx="2" fill="rgba(255,255,255,.1)" />
              {/* main branches */}
              <line x1="180" y1="268" x2="86" y2="198" stroke="#6d3a00" stroke-width="13" strokeLinecap="round" />
              <line x1="180" y1="268" x2="274" y2="198" stroke="#6d3a00" stroke-width="13" strokeLinecap="round" />
              <line x1="180" y1="258" x2="180" y2="172" stroke="#6d3a00" stroke-width="12" strokeLinecap="round" />
              {/* secondary */}
              <line x1="86" y1="198" x2="40" y2="150" stroke="#6d3a00" stroke-width="9" strokeLinecap="round" />
              <line x1="86" y1="198" x2="124" y2="148" stroke="#6d3a00" stroke-width="9" strokeLinecap="round" />
              <line x1="274" y1="198" x2="320" y2="150" stroke="#6d3a00" stroke-width="9" strokeLinecap="round" />
              <line x1="274" y1="198" x2="236" y2="148" stroke="#6d3a00" stroke-width="9" strokeLinecap="round" />
              <line x1="180" y1="172" x2="144" y2="124" stroke="#6d3a00" stroke-width="8" strokeLinecap="round" />
              <line x1="180" y1="172" x2="216" y2="124" stroke="#6d3a00" stroke-width="8" strokeLinecap="round" />
              <line x1="180" y1="172" x2="180" y2="104" stroke="#6d3a00" stroke-width="8" strokeLinecap="round" />
              {/* tertiary */}
              <line x1="40" y1="150" x2="14" y2="112" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="40" y1="150" x2="58" y2="110" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="124" y1="148" x2="104" y2="110" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="124" y1="148" x2="144" y2="112" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="320" y1="150" x2="342" y2="110" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="320" y1="150" x2="302" y2="110" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="236" y1="148" x2="218" y2="110" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="236" y1="148" x2="254" y2="112" stroke="#6d3a00" stroke-width="6" strokeLinecap="round" />
              <line x1="144" y1="124" x2="126" y2="90" stroke="#6d3a00" stroke-width="5" strokeLinecap="round" />
              <line x1="144" y1="124" x2="158" y2="88" stroke="#6d3a00" stroke-width="5" strokeLinecap="round" />
              <line x1="216" y1="124" x2="234" y2="90" stroke="#6d3a00" stroke-width="5" strokeLinecap="round" />
              <line x1="216" y1="124" x2="202" y2="88" stroke="#6d3a00" stroke-width="5" strokeLinecap="round" />
              <line x1="180" y1="104" x2="163" y2="68" stroke="#6d3a00" stroke-width="5" strokeLinecap="round" />
              <line x1="180" y1="104" x2="197" y2="68" stroke="#6d3a00" stroke-width="5" strokeLinecap="round" />
              <line x1="180" y1="104" x2="180" y2="58" stroke="#6d3a00" stroke-width="4" strokeLinecap="round" />

              {/* Dynamic Hearts */}
              <g id="heartSpots">
                {bloomedHearts.map((h) => (
                  <path
                    key={h.id}
                    d={getHeartPath(h.x, h.y, h.size)}
                    fill={h.color}
                    style={{
                      transformOrigin: `${h.x}px ${h.y}px`,
                      animation: `bday1HeartBloom 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${h.delay}ms both`,
                      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.15))'
                    }}
                  />
                ))}
              </g>
            </svg>
          </div>
          <div className="finale">
            <h2 className="f-hb">Happy Birthday</h2>
            <h1 className="f-name">{recipientName} 🌸</h1>
            <p className="f-msg">
              {customData.finaleMessage || `May your ${age ? `${age}th ` : ''}year be filled with everything your beautiful heart desires.`}
            </p>
            <div className="f-hearts">💕 🌸 🌺 💕 🌸 🌺 💕</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bday1HeartBloom {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 0.93; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export const BirthdayMemoriesTemplate = BirthdayTemplate1;
export default BirthdayTemplate1;
