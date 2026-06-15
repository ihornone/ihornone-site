"use client"

import { useState } from "react"
import Lightbox from "./Lightbox"

export default function Gallery({ images, web }: { images: string[]; web?: boolean }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (!images || images.length === 0) return null

  const wPct = web ? 32 : 22
  const maxW = web ? 400 : 280
  const padding = 2

  const positions = images.map((_, i) => {
    const N = images.length
    const baseX = N > 1 ? padding + (i / (N - 1)) * (100 - wPct - 2 * padding) : 50 - wPct / 2
    const baseY = i % 2 === 0 ? 0 : (web ? 40 : 60)
    const rot = (i % 2 === 0 ? -1 : 1) * (3 + (i % 3) * 2)
    return { x: baseX, y: baseY, rot, z: i + 1 }
  })

  const mobileW = web ? 45 : 35
  const mobileMax = web ? 220 : 150
  const mPad = 2

  const mobilePositions = images.map((_, i) => {
    const N = images.length
    const baseX = N > 1 ? mPad + (i / (N - 1)) * (100 - mobileW - 2 * mPad) : 50 - mobileW / 2
    const baseY = i % 2 === 0 ? 0 : (web ? 25 : 40)
    const rot = (i % 2 === 0 ? -1 : 1) * (2 + (i % 3) * 1.5)
    return { x: baseX, y: baseY, rot, z: i + 1 }
  })

  return (
    <>
      <div className="mb-20">
        <h2 className="text-[var(--color-text)] font-semibold m-0 mb-8"
          style={{ fontSize: 28, lineHeight: 1.3, letterSpacing: "-0.56px" }}
        >
          Gallery
        </h2>

        <div className="hidden sm:block relative mx-auto w-full" style={{ maxWidth: 1120, height: web ? 320 : 540 }}>
          {images.map((src, i) => (
            <img key={i} src={src} alt=""
              onClick={() => setLightboxIdx(i)}
              className="absolute rounded-xl object-cover cursor-pointer transition-all duration-300 hover:scale-110 hover:z-[999] hover:shadow-2xl"
              style={{
                width: `${wPct}%`, maxWidth: maxW, height: "auto", aspectRatio: "9 / 16",
                left: `${positions[i].x}%`, top: `${positions[i].y}px`,
                transform: `rotate(${positions[i].rot}deg)`, zIndex: positions[i].z,
                boxShadow: "0 12px 40px rgba(0,0,0,0.25)", border: "3px solid var(--color-surface)",
              }}
              loading="lazy"
            />
          ))}
        </div>

        <div className="sm:hidden relative w-full" style={{ height: web ? 200 : 360 }}>
          {images.map((src, i) => (
            <img key={i} src={src} alt=""
              onClick={() => setLightboxIdx(i)}
              className="absolute rounded-xl object-cover cursor-pointer transition-all duration-200 active:scale-105 active:z-[999] active:shadow-xl"
              style={{
                width: `${mobileW}%`, maxWidth: mobileMax, height: "auto", aspectRatio: "9 / 16",
                left: `${mobilePositions[i].x}%`, top: `${mobilePositions[i].y}px`,
                transform: `rotate(${mobilePositions[i].rot}deg)`, zIndex: mobilePositions[i].z,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)", border: "2px solid var(--color-surface)",
              }}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {lightboxIdx !== null && (
        <Lightbox key={lightboxIdx} images={images} current={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  )
}
