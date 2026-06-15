"use client"

import { useState } from "react"

function Lightbox({ images, current, onClose }: { images: string[]; current: number; onClose: () => void }) {
  const [idx, setIdx] = useState(current)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <button onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", fontSize: 20 }}
      >
        ✕
      </button>
      {images.length > 1 && (
        <>
          <button onClick={e => { e.stopPropagation(); setIdx(i => (i > 0 ? i - 1 : images.length - 1)) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
            style={{ background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}
          >
            ‹
          </button>
          <button onClick={e => { e.stopPropagation(); setIdx(i => (i < images.length - 1 ? i + 1 : 0)) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
            style={{ background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer" }}
          >
            ›
          </button>
        </>
      )}
      <img src={images[idx]} alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
        style={{ cursor: "zoom-out" }}
        onClick={() => setIdx(i => (i + 1) % images.length)}
      />
    </div>
  )
}

function ProjectImageBlock({ images, web }: { images: string[]; web: boolean }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className={`flex ${web ? "flex-col" : "flex-row"} items-center justify-center relative py-12 w-full`}>
        {images.map((src, i) => (
          <img key={i} src={src} alt=""
            onClick={() => setLightboxIdx(i)}
            className={`rounded-xl object-cover cursor-pointer transition-all duration-300 hover:scale-105 hover:z-[99] hover:shadow-2xl ${
              web ? "w-[70%] max-w-[480px]" : "w-[46%] sm:w-[55%] max-w-[240px] sm:max-w-[260px]"
            } ${i > 0 ? (web ? "mt-[-8%]" : "ml-[-12%] sm:ml-[-15%]") : ""}`}
            style={{
              aspectRatio: web ? "16 / 9" : "9 / 16",
              transform: web ? "rotate(-3deg)" : `rotate(${i === 0 ? -3 : 3}deg)`,
              zIndex: images.length - i,
            }}
            loading="lazy"
          />
        ))}
      </div>
      {lightboxIdx !== null && (
        <Lightbox images={images} current={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  )
}

export default function ProjectBlockSection({ blocks, web }: { blocks: { title: string; body: string; images: string[] }[]; web: boolean }) {
  return (
    <>
      {blocks.map((block, i) => {
        const even = i % 2 === 0
        const hasImages = block.images.length > 0

        if (!hasImages) {
          return (
            <div key={i} className="mb-16">
              <span className="inline-flex items-center mb-3"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "var(--color-accent-light)", background: "var(--color-accent-bg)", padding: "4px 10px", borderRadius: 9999, textTransform: "uppercase" }}
              >
                {block.title}
              </span>
              <p className="text-[var(--color-text-secondary)] m-0"
                style={{ fontSize: 17, lineHeight: 1.7, letterSpacing: "-0.34px" }}
              >
                {block.body}
              </p>
            </div>
          )
        }

        return (
          <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
            <div className={even ? "" : "lg:order-2"}>
              <span className="inline-flex items-center mb-3"
                style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "var(--color-accent-light)", background: "var(--color-accent-bg)", padding: "4px 10px", borderRadius: 9999, textTransform: "uppercase" }}
              >
                {block.title}
              </span>
              <p className="text-[var(--color-text-secondary)] m-0"
                style={{ fontSize: 17, lineHeight: 1.7, letterSpacing: "-0.34px" }}
              >
                {block.body}
              </p>
            </div>
            <div className={even ? "" : "lg:order-1"}>
              <ProjectImageBlock images={block.images} web={web} />
            </div>
          </div>
        )
      })}
    </>
  )
}
