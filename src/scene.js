import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const MOBILE_QUERY = '(max-width: 767px), (max-height: 500px)' // compact: phones, portrait and landscape
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

// Small-viewport height probe: svh does not change when mobile browser toolbars show or hide,
// so the fixed frame stays put while scrolling.
let probe = null
function viewH() {
  if (!probe) {
    probe = document.createElement('div')
    probe.setAttribute('aria-hidden', 'true')
    probe.style.cssText =
      'position:fixed;top:0;left:0;width:0;height:100vh;height:100svh;visibility:hidden;pointer-events:none'
    document.body.appendChild(probe)
  }
  return probe.offsetHeight || window.innerHeight
}

// Geometry of the room: the inner rectangle ("back wall") is inset from the viewport.
export function getInsets() {
  const W = document.documentElement.clientWidth || window.innerWidth
  const H = viewH()
  const mobile = window.matchMedia(MOBILE_QUERY).matches
  const ix = mobile ? Math.round(Math.min(32, Math.max(26, W * 0.075))) : Math.max(72, Math.round(W * 0.1))
  const iy = mobile ? (H <= 500 ? Math.max(28, Math.round(H * 0.08)) : Math.round(H * 0.13)) : Math.round(H * 0.15)
  return { W, H, ix, it: iy, ib: iy, mobile }
}

let lenis = null

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const { it } = getInsets()
  if (lenis) lenis.scrollTo(el, { offset: -it, duration: 1.4 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - it })
}

export function setScrollLocked(locked) {
  document.documentElement.classList.toggle('no-scroll', locked)
  if (lenis) locked ? lenis.stop() : lenis.start()
}

const r2 = (n) => Math.round(n * 100) / 100

// Wraps every [data-wrap] block onto the ceiling / floor of the room as it leaves the back wall.
// Only transform and opacity are written; geometry is cached and re-measured on resize.
export function initScene({ onActive }) {
  const reduced = window.matchMedia(REDUCED_QUERY).matches
  const root = document.documentElement
  let g = getInsets()
  let blocks = []
  let sections = []
  let activeId = null

  if (!reduced) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
  }
  const tick = (time) => lenis && lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  function setVars() {
    root.style.setProperty('--ix', g.ix + 'px')
    root.style.setProperty('--it', g.it + 'px')
    root.style.setProperty('--ib', g.ib + 'px')
  }

  function render() {
    const sy = window.scrollY
    if (!reduced) {
      const { H, W, it, ib, ix, mobile } = g
      const T = it
      const B = H - ib
      const dT = it
      const dB = ib
      const wide = (W / (W - 2 * ix) - 1) * 0.9
      const tilt = mobile ? 38 : 34
      const map = (y) =>
        y < T ? T - dT * (1 - Math.exp(-(T - y) / dT)) : y > B ? B + dB * (1 - Math.exp(-(y - B) / dB)) : y
      for (const b of blocks) {
        const top = b.top - sy
        const bot = top + b.h
        if (bot < T - dT * 6 || top > B + dB * 6) {
          if (b.last !== 'off') {
            b.el.style.opacity = '0'
            b.last = 'off'
          }
          continue
        }
        const t2 = map(top)
        const b2 = map(bot)
        const dTop = t2 < T ? (T - t2) / dT : 0
        const dBot = b2 > B ? (b2 - B) / dB : 0
        const mid = (t2 + b2) / 2
        const dm = mid < T ? (T - mid) / dT : mid > B ? (mid - B) / dB : 0
        const depth = Math.max(dm, Math.max(dTop, dBot) * 0.55)
        const ceil = dTop >= dBot
        const key = `${r2(t2 - top)}|${r2(b2 - t2)}|${r2(depth)}`
        if (key === b.last) continue
        b.last = key
        const scaleY = Math.max(0.02, (b2 - t2) / b.h)
        const a = (ceil ? -1 : 1) * depth * tilt
        const o = Math.max(0, 1 - depth / 0.8)
        b.el.style.transform =
          depth === 0 && scaleY > 0.999
            ? `translate3d(0,${r2(t2 - top)}px,0)`
            : `translate3d(0,${r2(t2 - top)}px,0) perspective(900px) rotateX(${r2(a)}deg) scale(${r2(
                1 + depth * wide
              )},${r2(scaleY)})`
        b.el.style.opacity = r2(o)
      }
    }
    // active section for the frame navigation
    let cur = sections[0] && sections[0].id
    for (const s of sections) if (s.top <= sy + g.H * 0.4) cur = s.id
    if (cur !== activeId) {
      activeId = cur
      onActive(cur)
    }
  }

  function measure() {
    g = getInsets()
    setVars()
    blocks = [...document.querySelectorAll('[data-wrap]')].map((el) => ({ el, top: 0, h: 1, last: '' }))
    sections = [...document.querySelectorAll('[data-section]')].map((el) => ({ el, id: el.id, top: 0 }))
    const sy = window.scrollY
    if (!reduced) for (const b of blocks) b.el.style.transform = 'none'
    for (const b of blocks) {
      const r = b.el.getBoundingClientRect()
      b.top = r.top + sy
      b.h = Math.max(1, r.height)
    }
    for (const s of sections) s.top = s.el.getBoundingClientRect().top + sy
    render()
  }

  let raf = 0
  const queue = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(measure)
  }
  setVars()
  measure()
  const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: render })
  const ro = new ResizeObserver(queue)
  ro.observe(document.querySelector('main'))
  const onResize = () => {
    const n = getInsets()
    if (n.W !== g.W || n.H !== g.H || n.mobile !== g.mobile) queue()
  }
  window.addEventListener('resize', onResize)
  window.addEventListener('scroll', render, { passive: true })
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(queue)

  return () => {
    cancelAnimationFrame(raf)
    st.kill()
    ro.disconnect()
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', render)
    gsap.ticker.remove(tick)
    if (lenis) lenis.destroy()
    lenis = null
  }
}
