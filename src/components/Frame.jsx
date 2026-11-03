import { useEffect, useState } from 'react'
import { getInsets, scrollToId } from '../scene.js'
import { categories } from '../data.js'
import '../styles/frame.css'

const LINKS = [
  ['projects', 'projects'],
  ['experience', 'experience'],
  ['about', 'about'],
  ['contact', 'contact'],
]
const GROUP = { credentials: 'about', intro: 'intro' }

export default function Frame({ filter, onFilter, active }) {
  const [g, setG] = useState(getInsets)

  useEffect(() => {
    const on = () => setG(getInsets())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  const { W, H, ix, it, ib, mobile } = g
  const cur = GROUP[active] === 'about' ? 'credentials' : active
  const x0 = ix, x1 = W - ix, y0 = it, y1 = H - ib
  const k = mobile ? 0.4 : 1 // mobile: shortened diagonals
  const lerp = (a, b) => a + (b - a) * k
  const diag = [
    [x0, y0, 0, 0],
    [x1, y0, W, 0],
    [x0, y1, 0, H],
    [x1, y1, W, H],
  ]

  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <>
      <svg className="frame" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        {diag.map(([ax, ay, bx, by], i) => (
          <line key={i} x1={ax} y1={ay} x2={lerp(ax, bx)} y2={lerp(ay, by)} />
        ))}
        <rect x={x0} y={y0} width={Math.max(0, x1 - x0)} height={Math.max(0, y1 - y0)} />
      </svg>
      <nav className="frame-nav" aria-label="Sections">
        {LINKS.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={go(id)}
            aria-current={cur === id ? 'location' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="frame-filters" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => onFilter(filter === c ? null : c)}>
            {c}
          </button>
        ))}
      </div>
    </>
  )
}
