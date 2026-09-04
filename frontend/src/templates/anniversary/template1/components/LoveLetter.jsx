import React from "react";

/**
 * LoveLetter
 * Renders as a physical sheet of stationery.
 */
export default function LoveLetter({
  person1,
  person2,
  senderName,
  letterContent,
}) {
  const paragraphs = Array.isArray(letterContent)
    ? letterContent
    : String(letterContent || "")
        .split(/\n\s*\n/)
        .filter(Boolean);

  const recipientGreeting = person2 ? `${person1} & ${person2}` : person1;

  return (
    <div className="letter-stationery-sheet">
      <div className="letter-inner-border" />
      <p className="letter-salutation-text">
        Dear {recipientGreeting},
      </p>
      {paragraphs.map((p, i) => (
        <p key={i} className="letter-paragraph-text">
          {p}
        </p>
      ))}
      <p className="letter-paragraph-text" style={{ fontStyle: "italic", marginTop: "1rem" }}>
        Happy Anniversary. &hearts;
      </p>
      <p className="letter-closing-signature">
        With lots of love,
        <br />
        {senderName}
      </p>
    </div>
  );
}
