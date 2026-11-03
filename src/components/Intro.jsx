import { identity } from '../data.js'
import Room from './Room.jsx'

export default function Intro({ ready }) {
  return (
    <section className={`intro${ready ? ' ready' : ''}`} id="intro" data-section>
      <div data-wrap>
        <Room />
      </div>
      <div data-wrap>
        <h1 className="intro-title">
          I BUILD THINGS
          <br />
          THAT WORK.
        </h1>
        <p className="intro-sub">{identity.role.toUpperCase()}</p>
      </div>
    </section>
  )
}
