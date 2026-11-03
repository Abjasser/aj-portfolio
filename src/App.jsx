import { useEffect, useState, useCallback } from 'react'
import Loader from './components/Loader.jsx'
import Frame from './components/Frame.jsx'
import Intro from './components/Intro.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Achievements from './components/Achievements.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import { initScene, setScrollLocked } from './scene.js'
import './styles/global.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [filter, setFilter] = useState(null)
  const [active, setActive] = useState('intro')

  useEffect(() => {
    const stop = initScene({ onActive: setActive })
    setScrollLocked(true)
    return stop
  }, [])

  const onLoaderComplete = useCallback(() => {
    setLoaded(true)
    setScrollLocked(false)
  }, [])

  return (
    <>
      <Loader onComplete={onLoaderComplete} />
      <Frame filter={filter} onFilter={setFilter} active={active} />
      <main>
        <Intro ready={loaded} />
        <Projects filter={filter} />
        <Experience />
        <Achievements />
        <About />
        <Contact />
      </main>
    </>
  )
}
