import React from 'react';

export function SparkleIcon({ className = '', style = {} }) {
  return (
    <svg
      className={`val-doodle-sparkle ${className}`}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0L14.4 8.6L23 11L14.4 13.4L12 22L9.6 13.4L1 11L9.6 8.6L12 0Z" />
    </svg>
  );
}

export function HandDrawnHeart({ className = '', style = {} }) {
  return (
    <svg
      className={`val-doodle-heart ${className}`}
      style={style}
      viewBox="0 0 40 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.8 8.2C17.2 2.5 9.5 1.8 4.8 6.5C0.2 11.2 0.8 19 6.2 24.5L19.8 33.5L33.4 24.5C38.8 19 39.4 11.2 34.8 6.5C30.1 1.8 22.4 2.5 19.8 8.2Z" />
      <path d="M14 10C12 8 9 9 7.5 11" opacity="0.6" strokeWidth="1.6" />
    </svg>
  );
}

export function DoodleArrow({ className = '', style = {} }) {
  return (
    <svg
      className={`val-doodle-arrow ${className}`}
      style={style}
      viewBox="0 0 60 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 18C16 12 34 8 52 14" strokeDasharray="3 3" />
      <path d="M44 8L54 14L46 22" />
    </svg>
  );
}

export function WashiTape({ className = '', style = {}, color = '#fce7ea' }) {
  return (
    <div
      className={`val-washi-tape ${className}`}
      style={{
        backgroundColor: color,
        ...style
      }}
      aria-hidden="true"
    />
  );
}

export function StampBadge({ text = "VALENTINE'S SPECIAL", className = '' }) {
  return (
    <div className={`val-stamp-badge ${className}`}>
      <span className="val-stamp-inner">
        <SparkleIcon style={{ width: '10px', height: '10px', marginRight: '4px' }} />
        {text}
        <SparkleIcon style={{ width: '10px', height: '10px', marginLeft: '4px' }} />
      </span>
    </div>
  );
}

export function BotanicalFlourish({ className = '', style = {} }) {
  return (
    <svg
      className={`val-botanical-flourish ${className}`}
      style={style}
      viewBox="0 0 80 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M40 35C40 20 25 10 10 15C20 18 28 26 30 35" />
      <path d="M40 35C40 20 55 10 70 15C60 18 52 26 50 35" />
      <circle cx="40" cy="35" r="2.5" fill="currentColor" />
    </svg>
  );
}
