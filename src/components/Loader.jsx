import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { identity } from '../data.js'
import { getInsets, REDUCED_QUERY } from '../scene.js'
import '../styles/loader.css'

export default function Loader({ onComplete }) {
  const rootRef = useRef(null)
  const g = useRef(getInsets()).current

  useEffect(() => {
    const root = rootRef.current
    const reduced = window.matchMedia(REDUCED_QUERY).matches
    const strokes = root.querySelectorAll('.loader-stroke')
    const mark = root.querySelector('.loader-mark')
    const tl = gsap.timeline({
      onComplete: () => {
        root.style.display = 'none'
        onComplete()
      },
    })
    if (reduced) {
      gsap.set(strokes, { strokeDashoffset: 0 })
      tl.to(mark, { opacity: 1, duration: 0.2 }).to({}, { duration: 1.6 }).to(root, { opacity: 0, duration: 0.3 })
    } else {
      tl.to(strokes, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.07 }, 0)
        .to(mark, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 1.0)
        .to(root, { yPercent: -100, duration: 0.65, ease: 'power3.inOut' }, 1.8)
    }
    return () => tl.kill()
  }, [onComplete])

  const { W, H, ix, it, ib } = g
  const x0 = ix, x1 = W - ix, y0 = it, y1 = H - ib
  const mix = (a, b, f) => a + (b - a) * f
  const rects = [0.34, 0.67].map((f) => [mix(1, x0, f), mix(1, y0, f), mix(W - 1, x1, f), mix(H - 1, y1, f)])
  const R = ([a, b, c, d]) => `M${a} ${b}H${c}V${d}H${a}Z`
  const paths = [
    `M${x0} ${y0}L0 0`,
    `M${x1} ${y0}L${W} 0`,
    `M${x0} ${y1}L0 ${H}`,
    `M${x1} ${y1}L${W} ${H}`,
    R([x0, y0, x1, y1]),
    ...rects.map(R),
  ]

  return (
    <div className="loader" ref={rootRef} aria-hidden="true">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {paths.map((d, i) => (
          <path key={i} className="loader-stroke" d={d} pathLength="1" />
        ))}
      </svg>
      <div className="loader-mark">{identity.initials}</div>
    </div>
  )
}
