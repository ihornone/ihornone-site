"use client"

import { useState, useEffect } from "react"

export default function Lightbox({ images, current, onClose }: { images: string[]; current: number; onClose: () => void }) {
  const [idx, setIdx] = useState(current)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  const effectiveOffset = scale === 1 ? { x: 0, y: 0 } : offset

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setIdx(i => (i > 0 ? i - 1 : images.length - 1))
      if (e.key === "ArrowRight") setIdx(i => (i < images.length - 1 ? i + 1 : 0))
      if (e.key === "+" || e.key === "=") setScale(s => Math.min(s + 0.5, 4))
      if (e.key === "-") setScale(s => Math.max(s - 0.5, 0.5))
      if (e.key === "0") { setScale(1); setOffset({ x: 0, y: 0 }) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, images.length])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
  }

  const handleMouseUp = () => setIsDragging(false)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center select-none"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ background: "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", fontSize: 20 }}
      >
        ✕
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button onClick={() => setScale(s => Math.max(s - 0.5, 0.5))}
          className="rounded-lg text-white font-medium"
          style={{ padding: "6px 14px", fontSize: 14, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.12)" }}
        >
          −
        </button>
        <button onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }) }}
          className="rounded-lg text-white font-medium"
          style={{ padding: "6px 14px", fontSize: 14, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.12)" }}
        >
          {Math.round(scale * 100)}%
        </button>
        <button onClick={() => setScale(s => Math.min(s + 0.5, 4))}
          className="rounded-lg text-white font-medium"
          style={{ padding: "6px 14px", fontSize: 14, border: "none", cursor: "pointer", background: "rgba(255,255,255,0.12)" }}
        >
          +
        </button>
      </div>

      <div className="absolute top-5 left-5 z-10 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {idx + 1} / {images.length}
      </div>

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
        className={`max-w-[90vw] max-h-[85vh] object-contain rounded-xl ${isDragging ? "" : "transition-transform duration-200"}`}
        style={{
          transform: `translate(${effectiveOffset.x}px, ${effectiveOffset.y}px) scale(${scale})`,
          cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
        }}
        onMouseDown={handleMouseDown}
        onClick={e => { e.stopPropagation(); if (scale > 1) setScale(1); else setScale(2) }}
      />
    </div>
  )
}
