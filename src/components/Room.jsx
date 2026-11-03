import { useEffect, useRef } from 'react'
import { REDUCED_QUERY } from '../scene.js'

const ACCENT = '192,57,43'
const SLICES = 9
const COLS = 8
const ROWS = 5

// Procedural one-point-perspective wireframe room on a canvas.
export default function Room() {
  const ref = useRef(null)

  useEffect(() => {
    const cv = ref.current
    const ctx = cv.getContext('2d')
    const reduced = window.matchMedia(REDUCED_QUERY).matches
    let w = 0, h = 0, raf = 0
    const cur = { x: 0, y: 0 }
    const tgt = { x: 0, y: 0 }
    const pointer = { x: 0, y: 0 }

    const lerp = (a, b, t) => a + (b - a) * t
    const line = (x1, y1, x2, y2) => {
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
    }

    function draw() {
      ctx.clearRect(0, 0, w, h)
      const vx = w / 2 + cur.x * w
      const vy = h / 2 + cur.y * h
      const bw = w * 0.34
      const bh = h * 0.4
      const bx = vx - bw / 2
      const by = vy - bh / 2
      const O = [0, 0, w, h]
      const Bk = [bx, by, bx + bw, by + bh]

      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${ACCENT},0.38)`
      ctx.beginPath()
      // depth slices (ring lines on floor, ceiling and both side walls)
      for (let i = 0; i < SLICES; i++) {
        const f = 1 - 1 / (1 + i * 0.55)
        const r = O.map((v, j) => lerp(v, Bk[j], f))
        ctx.rect(r[0] + 0.5, r[1] + 0.5, r[2] - r[0], r[3] - r[1])
      }
      // orthogonals toward the vanishing point
      for (let i = 0; i <= COLS; i++) {
        const p = i / COLS
        line(p * w, 0, bx + p * bw, by)
        line(p * w, h, bx + p * bw, by + bh)
      }
      for (let i = 0; i <= ROWS; i++) {
        const p = i / ROWS
        line(0, p * h, bx, by + p * bh)
        line(w, p * h, bx + bw, by + p * bh)
      }
      ctx.stroke()

      // back wall: brighter outline plus its own grid
      ctx.strokeStyle = `rgba(${ACCENT},0.9)`
      ctx.beginPath()
      ctx.rect(bx + 0.5, by + 0.5, bw, bh)
      for (let i = 1; i < COLS; i++) line(bx + (i / COLS) * bw, by, bx + (i / COLS) * bw, by + bh)
      for (let i = 1; i < ROWS; i++) line(bx, by + (i / ROWS) * bh, bx + bw, by + (i / ROWS) * bh)
      ctx.stroke()
    }

    function target() {
      const sc = Math.min(1, window.scrollY / window.innerHeight)
      tgt.x = pointer.x * 0.035
      tgt.y = pointer.y * 0.035 + sc * 0.05
    }

    function loop() {
      raf = 0
      cur.x = lerp(cur.x, tgt.x, 0.08)
      cur.y = lerp(cur.y, tgt.y, 0.08)
      draw()
      if (Math.abs(cur.x - tgt.x) + Math.abs(cur.y - tgt.y) > 0.0002) raf = requestAnimationFrame(loop)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = cv.clientWidth
      h = cv.clientHeight
      cv.width = Math.round(w * dpr)
      cv.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(cv)
    resize()

    const onMove = (e) => {
      pointer.x = e.clientX / window.innerWidth - 0.5
      pointer.y = e.clientY / window.innerHeight - 0.5
      target()
      kick()
    }
    const onScroll = () => {
      target()
      kick()
    }
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('scroll', onScroll, { passive: true })
    }
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={ref} className="room" aria-hidden="true" />
}
