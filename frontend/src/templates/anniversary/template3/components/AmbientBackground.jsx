import React, { useEffect, useRef } from 'react';

/**
 * High-performance HTML5 Canvas rendering gentle floating rose petals,
 * soft golden dust, and warm bokeh light orbs.
 */
export function AmbientBackground({ stage = 'hero', celebrationActive = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types
    const particleCount = celebrationActive ? 120 : stage === 'love' ? 65 : 45;
    const particles = [];

    // Rose Petal Colors & Gold Sparkles
    const petalColors = [
      'rgba(217, 165, 179, 0.45)', // dusty rose
      'rgba(242, 214, 220, 0.55)', // pale blush
      'rgba(196, 122, 142, 0.4)',  // rose gold
      'rgba(212, 175, 55, 0.5)',   // gold sparkle
      'rgba(255, 250, 240, 0.6)'   // ivory
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 4,
        speedY: Math.random() * 0.8 + (celebrationActive ? 1.4 : 0.3),
        speedX: (Math.random() - 0.5) * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        isPetal: Math.random() > 0.4,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    // Warm Bokeh Orbs
    const bokehCount = 6;
    const bokehs = [];
    for (let b = 0; b < bokehCount; b++) {
      bokehs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 120 + 80,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        color: stage === 'love' 
          ? 'rgba(107, 29, 47, 0.12)' 
          : 'rgba(212, 175, 55, 0.08)'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle bokeh glows
      bokehs.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -100) b.x = width + 100;
        if (b.x > width + 100) b.x = -100;
        if (b.y < -100) b.y = height + 100;
        if (b.y > height + 100) b.y = -100;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render floating petals / sparkles
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5 + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.isPetal) {
          // Draw soft organic petal shape
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw subtle golden light particle
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stage, celebrationActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`ambient-canvas stage-${stage} ${celebrationActive ? 'celebrating' : ''}`}
      aria-hidden="true"
    />
  );
}

export default AmbientBackground;
