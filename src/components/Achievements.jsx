import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { achievements } from '../data.js'
import '../styles/achievements.css'

gsap.registerPlugin(ScrollTrigger)

export default function Achievements() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.credential',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
          },
        }
      )
    }, rootRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <section className="achievements" ref={rootRef} id="credentials">
      <span className="section-label">CREDENTIALS</span>
      <div className="credentials-row">
        {achievements.map((a) => (
          <article className="credential" key={a.symbol}>
            <span className="credential-symbol">{a.symbol}</span>
            {a.hasImage && (
              <figure className="credential-figure">
                <img
                  src={`${import.meta.env.BASE_URL}medal.jpg`}
                  alt={a.imageAlt}
                  loading="lazy"
                />
                {a.labelAr && (
                  <figcaption className="credential-label-ar">{a.labelAr}</figcaption>
                )}
              </figure>
            )}
            <h3 className="credential-title">{a.title}</h3>
            <p className="credential-desc">{a.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
