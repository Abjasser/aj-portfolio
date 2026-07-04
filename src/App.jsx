import { useEffect, useState, lazy, Suspense, useCallback } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import Hero from './components/Hero.jsx'
import './styles/global.css'

gsap.registerPlugin(ScrollTrigger)

const Projects = lazy(() => import('./components/Projects.jsx'))
const Achievements = lazy(() => import('./components/Achievements.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))

export default function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  const onLoaderComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      <Cursor />
      <Loader onComplete={onLoaderComplete} />
      <main>
        <Hero ready={loaded} />
        <Suspense fallback={null}>
          <Projects />
          <Achievements />
          <About />
          <Contact />
        </Suspense>
      </main>
    </>
  )
}
