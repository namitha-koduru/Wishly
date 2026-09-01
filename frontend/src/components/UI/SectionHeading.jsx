import React from 'react';

export function SectionHeading({
  tag,
  title,
  subtitle,
  centered = true,
  className = ''
}) {
  return (
    <div className={`section-heading ${centered ? 'text-center' : ''} ${className}`}>
      {tag && <span className="section-tag">{tag}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;
