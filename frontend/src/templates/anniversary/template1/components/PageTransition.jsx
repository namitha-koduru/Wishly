import React from "react";

/**
 * PageTransition
 * A lightweight, CSS-only fade + slight-slide wrapper.
 * No animation library — just a transitioned opacity/transform,
 * so it stays cheap even on low-end mobile devices.
 */
export default function PageTransition({ active, children }) {
  return (
    <div
      aria-hidden={!active}
      className={[
        "page-transition-wrap",
        "absolute inset-0 flex items-center justify-center",
        "px-6 py-10 sm:px-10",
        "transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
        active
          ? "page-active opacity-100 translate-x-0 pointer-events-auto z-10"
          : "page-inactive opacity-0 translate-x-2 pointer-events-none z-0",
      ].join(" ")}
      style={{
        display: active ? "flex" : "none",
        opacity: active ? 1 : 0,
        position: "absolute",
        inset: 0,
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        zIndex: active ? 10 : 0,
        pointerEvents: active ? "auto" : "none"
      }}
    >
      {children}
    </div>
  );
}
