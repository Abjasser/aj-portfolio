import { useEffect, useRef, useState } from 'react'
import { identity } from '../data.js'
import Arrow from './Arrow.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = identity.email
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section id="contact" data-section aria-labelledby="contact-h">
      <div data-wrap>
        <h2 className="sec-label" id="contact-h">
          CONTACT
        </h2>
      </div>
      <ul className="rows">
        <li data-wrap>
          <div className="contact-item">
            <button type="button" className="contact-line" onClick={copyEmail} aria-label={`Copy email ${identity.email}`}>
              <span>{identity.email.toUpperCase()}</span>
              <span aria-live="polite" className="contact-end">
                {copied ? <span className="contact-copied">COPIED</span> : <Arrow />}
              </span>
            </button>
            <span className="row-rule" aria-hidden="true" />
          </div>
        </li>
        {[identity.github, identity.linkedin].map((u) => (
          <li data-wrap key={u}>
            <div className="contact-item">
              <a className="contact-line" href={`https://${u}`} target="_blank" rel="noopener noreferrer">
                <span>{u.toUpperCase()}</span>
                <span className="contact-end">
                  <Arrow />
                </span>
              </a>
              <span className="row-rule" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
      <div data-wrap>
        <footer className="site-footer">
          <span>{identity.name.toUpperCase()}</span>
          <span>RIYADH, SAUDI ARABIA</span>
        </footer>
      </div>
    </section>
  )
}
