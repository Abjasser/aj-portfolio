import { useState } from 'react'
import { projects } from '../data.js'
import Arrow from './Arrow.jsx'

export default function Projects({ filter }) {
  const [openId, setOpenId] = useState(null)

  return (
    <section id="projects" data-section aria-labelledby="projects-h">
      <div data-wrap>
        <h2 className="sec-label" id="projects-h">
          PROJECTS
        </h2>
      </div>
      <ul className="rows">
        {projects.map((p) => {
          const open = openId === p.id
          const dim = filter && !p.categories.includes(filter)
          return (
            <li data-wrap key={p.id}>
              <article className={`row${open ? ' open' : ''}${dim ? ' dim' : ''}`}>
                <h3>
                  <button
                    type="button"
                    className="row-head"
                    aria-expanded={open}
                    aria-controls={`panel-${p.id}`}
                    onClick={() => setOpenId(open ? null : p.id)}
                  >
                    <span className="row-num">{p.number}</span>
                    <span className="row-title">
                      {p.name}
                      {p.nameAr && (
                        <span className="row-ar" lang="ar" dir="rtl">
                          {p.nameAr}
                        </span>
                      )}
                    </span>
                    <span className="row-meta">
                      {p.type} / {p.stack.join(' · ')}
                    </span>
                    <span className="row-tag">{p.tagline}</span>
                  </button>
                </h3>
                <div className="row-panel" id={`panel-${p.id}`} role="region" aria-label={`${p.name} details`}>
                  <div className="row-panel-inner">
                    <p className="row-detail">{p.detail}</p>
                    <ul className="row-stack">
                      {p.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                    {p.url && (
                      <a className="row-link" href={p.url} target="_blank" rel="noopener noreferrer">
                        {p.url.replace(/^https?:\/\//, '')}
                        <Arrow />
                      </a>
                    )}
                  </div>
                </div>
                <span className="row-rule" aria-hidden="true" />
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
