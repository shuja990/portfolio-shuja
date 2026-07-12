"use client"

import type { RefObject } from "react"
import { gsap, useGSAP } from "@/lib/gsap"

/**
 * Scroll-scrubbed parallax for decorative background blobs.
 * Mark elements with data-parallax="<y distance in px>" inside the container;
 * they drift as the section scrolls instead of looping on the CPU forever.
 */
export function useBlobParallax(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            y: Number(el.dataset.parallax ?? 100),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        })
      })
    },
    { scope: containerRef },
  )
}
