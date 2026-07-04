import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { identity } from '../data.js'
import '../styles/hero.css'

const LINES = ['I BUILD SYSTEMS', 'THAT THINK IN ARABIC.']

export default function Hero({ ready }) {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!ready) return
    const chars = rootRef.current.querySelectorAll('.hero-char')
    const tween = gsap.fromTo(
      chars,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.05 }
    )
    gsap.fromTo(
      rootRef.current.querySelector('.hero-sub'),
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1.4 }
    )
    return () => tween.kill()
  }, [ready])

  return (
    <section className="hero" ref={rootRef}>
      <h1 className="hero-title">
        {LINES.map((line, li) => (
          <span className="hero-line" key={li}>
            {line.split(' ').map((word, wi) => (
              <span className="hero-word" key={wi}>
                {word.split('').map((c, ci) => (
                  <span className="hero-char" key={ci}>
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </span>
        ))}
      </h1>
      <p className="hero-sub">{identity.role.toUpperCase()}</p>
    </section>
  )
}
