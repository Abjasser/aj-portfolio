import { useState } from 'react'
import { identity } from '../data.js'
import '../styles/contact.css'

function Arrow() {
  return (
    <svg className="contact-arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

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
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section className="contact" id="contact">
      <span className="section-label">CONTACT</span>
      <div className="contact-lines">
        <button className="contact-line" onClick={copyEmail} data-hover>
          <span>{identity.email.toUpperCase()}</span>
          {copied ? <span className="contact-copied">COPIED</span> : <Arrow />}
        </button>
        <a
          className="contact-line"
          href={`https://${identity.github}`}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
        >
          <span>{identity.github.toUpperCase()}</span>
          <Arrow />
        </a>
        <a
          className="contact-line"
          href={`https://${identity.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
        >
          <span>{identity.linkedin.toUpperCase()}</span>
          <Arrow />
        </a>
      </div>
      <footer className="site-footer">
        <span>{identity.name.toUpperCase()}</span>
        <span>RIYADH, SAUDI ARABIA</span>
      </footer>
    </section>
  )
}
