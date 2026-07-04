import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { identity } from '../data.js'
import '../styles/loader.css'

export default function Loader({ onComplete }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const chars = root.querySelectorAll('.loader-char')
    const tl = gsap.timeline({
      onComplete: () => {
        root.style.display = 'none'
        onComplete()
      },
    })

    tl.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.35,
    })
      .to(root.querySelector('.loader-line'), {
        scaleX: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to({}, { duration: 0.4 })
      .to(root, {
        xPercent: 100,
        duration: 0.6,
        ease: 'power2.out',
      })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <div className="loader-mark">
        {identity.initials.split('').map((c, i) => (
          <span className="loader-char" key={i}>
            {c}
          </span>
        ))}
      </div>
      <div className="loader-line" />
    </div>
  )
}
