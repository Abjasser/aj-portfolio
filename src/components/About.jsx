import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { about } from '../data.js'
import '../styles/about.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-word',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.02,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 70%',
          },
        }
      )
      gsap.fromTo(
        ['.about-domains li', '.makers-mark'],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 60%',
          },
        }
      )
    }, rootRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about" ref={rootRef} id="about">
      <span className="section-label">ABOUT</span>
      <div className="about-grid">
        <p className="about-statement">
          {about.statement.split(' ').map((w, i) => (
            <span className="about-word" key={i}>
              {w}{' '}
            </span>
          ))}
        </p>
        <ul className="about-domains">
          {about.domains.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <p className="makers-mark">{about.makersMark}</p>
    </section>
  )
}
