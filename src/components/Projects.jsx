import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data.js'
import '../styles/projects.css'

gsap.registerPlugin(ScrollTrigger)

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

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section className="projects" ref={sectionRef} id="drops">
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
    </section>
  )
}
