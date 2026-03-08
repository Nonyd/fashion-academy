"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor custom-cursor-hidden";
    document.body.appendChild(cursor);
    document.body.classList.add("has-custom-cursor");

    let rafId: number | null = null;
    let mouseX = 0;
    let mouseY = 0;

    const move = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.classList.remove("custom-cursor-hidden");
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        rafId = null;
      });
    };

    const hide = () => {
      cursor.classList.add("custom-cursor-hidden");
    };

    const interactiveSelector =
      "a, button, [role='button'], [data-cursor='interactive'], input, textarea, select";

    const handleEnter = () => cursor.classList.add("custom-cursor--active");
    const handleLeave = () => cursor.classList.remove("custom-cursor--active");

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);

    const addInteractiveListeners = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", handleEnter);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    addInteractiveListeners();

    const observer = new MutationObserver(() => {
      addInteractiveListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", hide);
      observer.disconnect();
      cursor.remove();
      document.body.classList.remove("has-custom-cursor");
      if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return null;
}

