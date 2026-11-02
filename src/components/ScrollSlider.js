import * as React from "react"
import { useEffect, useRef, useState, useCallback } from "react"
import { FaChevronUp, FaChevronDown } from "react-icons/fa"

/**
 * Vertical slider for a long list (the publications): a fixed-height box
 * that scrolls on its own, so the page itself stays short. The box is a
 * native scroll container (wheel, trackpad, touch, arrow keys all work);
 * the up/down buttons page through it and disable at each end. Buttons and
 * the bottom fade are hidden when everything already fits.
 *
 * `contentKey` must change when the list content changes (e.g. after a
 * fetch), so the end-of-track state is recomputed.
 */
const ScrollSlider = ({ label, prevLabel, nextLabel, contentKey, children }) => {
  const track = useRef(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdges({
      start: el.scrollTop <= 4,
      end: el.scrollTop + el.clientHeight >= el.scrollHeight - 4,
    })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return undefined
    update()
    el.addEventListener("scroll", update, { passive: true })
    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null
    ro?.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      ro?.disconnect()
    }
  }, [update, contentKey])

  const page = direction => {
    const el = track.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({
      top: direction * el.clientHeight * 0.85,
      behavior: reduce ? "auto" : "smooth",
    })
  }

  const scrollable = !(edges.start && edges.end)

  return (
    <div
      className={`slider${scrollable ? " slider--scrollable" : ""}${
        edges.end ? " slider--at-end" : ""
      }`}
    >
      <div className={`slider-controls${scrollable ? "" : " slider-controls--idle"}`}>
          <button
            type="button"
            className="slider-btn"
            onClick={() => page(-1)}
            disabled={edges.start}
            aria-label={prevLabel}
          >
            <FaChevronUp aria-hidden="true" />
          </button>
          <button
            type="button"
            className="slider-btn"
            onClick={() => page(1)}
            disabled={edges.end}
            aria-label={nextLabel}
          >
            <FaChevronDown aria-hidden="true" />
          </button>
        </div>
      <div
        className="slider-track"
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={scrollable ? 0 : -1}
      >
        {children}
      </div>
    </div>
  )
}

export default ScrollSlider
