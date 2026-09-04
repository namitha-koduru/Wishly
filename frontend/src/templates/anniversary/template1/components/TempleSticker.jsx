import React from "react";
import templeImg from "../assets/temple.jpg";

/**
 * TempleSticker
 * An authentic vintage gold-bordered sacred temple stamp/sticker badge
 * with scalloped edges and gold foil detailing.
 */
export default function TempleSticker({
  size = "medium", // 'small' | 'medium' | 'large'
  label = "Sacred Blessings",
  teluguLabel = "దివ్య ఆశీస్సులు",
  isTelugu = false,
  rotation = "-2deg",
  style = {},
  className = ""
}) {
  const sizeStyles = {
    small: { width: "68px", padding: "4px" },
    medium: { width: "96px", padding: "6px" },
    large: { width: "130px", padding: "8px" }
  };

  const selectedSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <div
      className={`anniv-temple-sticker ${className}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #fffdf8 0%, #f7ecd5 100%)",
        border: "2px dashed #b3872f",
        boxShadow: "0 6px 16px rgba(58, 42, 29, 0.18)",
        borderRadius: "6px",
        transform: `rotate(${rotation})`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
        userSelect: "none",
        ...selectedSize,
        ...style
      }}
      title={isTelugu ? teluguLabel : label}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid rgba(179, 135, 47, 0.5)",
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.15)"
        }}
      >
        <img
          src={templeImg}
          alt="Temple Blessings"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "sepia(18%) contrast(105%)"
          }}
        />
      </div>

      <div
        style={{
          marginTop: "4px",
          textAlign: "center",
          width: "100%"
        }}
      >
        <span
          className={isTelugu ? "anniv-font-lakki" : "anniv-font-cinzel"}
          style={{
            display: "block",
            fontSize: size === "small" ? "0.55rem" : size === "large" ? "0.75rem" : "0.62rem",
            color: "#9b4a22",
            fontWeight: 700,
            letterSpacing: isTelugu ? "0px" : "0.5px",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {isTelugu ? teluguLabel : label}
        </span>
      </div>
    </div>
  );
}
