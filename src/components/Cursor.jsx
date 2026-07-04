import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../styles/cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    document.documentElement.classList.add('custom-cursor-active')

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        gsap.to(dot, { width: 40, height: 40, duration: 0.3, ease: 'power2.out' })
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) {
        gsap.to(dot, { width: 10, height: 10, duration: 0.3, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
}
