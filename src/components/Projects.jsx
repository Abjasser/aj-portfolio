import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'
import { projects } from '../data.js'
import '../styles/projects.css'

const GRADIENTS = [
  'radial-gradient(120% 120% at 20% 20%, #1a1a1a 0%, #0a0a0a 60%, #c0392b22 100%)',
  'radial-gradient(120% 120% at 80% 30%, #1a1a1a 0%, #c0392b1a 40%, #0a0a0a 100%)',
  'linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 50%, #c0392b26 100%)',
  'radial-gradient(140% 140% at 50% 100%, #1a1a1a 0%, #0a0a0a 70%, #c0392b1f 100%)',
  'linear-gradient(200deg, #c0392b26 0%, #0a0a0a 45%, #1a1a1a 100%)',
]

export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const touchStartX = useRef(0)
  const [navVisible, setNavVisible] = useState(false)

  const scrollByCard = useCallback((direction) => {
    const track = trackRef.current
    const card = track.querySelector('.drop')
    if (!card) return
    const cardWidth = card.getBoundingClientRect().width
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0)
    const distance = (cardWidth + gap) * direction

    const maxScroll = track.scrollWidth - track.clientWidth
    const target = Math.min(Math.max(track.scrollLeft + distance, 0), maxScroll)

    gsap.to(track, {
      scrollLeft: target,
      duration: 0.6,
      ease: 'power2.out',
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current

    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX
    }
    const onTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(dx) > 40) {
        scrollByCard(dx < 0 ? 1 : -1)
      }
    }

    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchend', onTouchEnd)
    }
  }, [scrollByCard])

  useEffect(() => {
    const section = sectionRef.current
    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="projects" id="drops" ref={sectionRef}>
      <span className="projects-label">DROPS</span>
      <div className="projects-track" ref={trackRef}>
        {projects.map((p, i) => {
          const Tag = p.url ? 'a' : 'div'
          const linkProps = p.url
            ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' }
            : {}
          return (
            <Tag className="drop" key={p.id} data-hover {...linkProps}>
              <div
                className="drop-visual"
                style={{ background: GRADIENTS[i % GRADIENTS.length] }}
              />
              <div className="drop-content">
                <span className="drop-number">DROP {p.number}</span>
                <h2 className="drop-name">
                  {p.name}
                  {p.nameAr && <span className="drop-name-ar"> {p.nameAr}</span>}
                </h2>
                <span className="drop-type">{p.type}</span>
                <p className="drop-tagline">{p.tagline}</p>
                <p className="drop-detail">{p.detail}</p>
                <div className="drop-stack">
                  {p.stack.map((s) => (
                    <span className="drop-pill" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                {p.url && (
                  <span className="drop-url">
                    {p.url.replace('https://', '')}
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 10L10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.2" fill="none" />
                    </svg>
                  </span>
                )}
              </div>
            </Tag>
          )
        })}
      </div>
      <div className={`projects-nav ${navVisible ? 'is-visible' : ''}`}>
        <button
          className="projects-nav-btn"
          onClick={() => scrollByCard(-1)}
          aria-label="Previous project"
          data-hover
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M11 3L5 9l6 6" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </button>
        <button
          className="projects-nav-btn"
          onClick={() => scrollByCard(1)}
          aria-label="Next project"
          data-hover
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M7 3l6 6-6 6" stroke="currentColor" strokeWidth="1.4" fill="none" />
          </svg>
        </button>
      </div>
    </section>
  )
}
