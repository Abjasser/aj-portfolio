import { experience } from '../data.js'

export default function Experience() {
  return (
    <section id="experience" data-section aria-labelledby="experience-h">
      <div data-wrap>
        <h2 className="sec-label" id="experience-h">
          EXPERIENCE
        </h2>
      </div>
      <ul className="rows">
        {experience.map((e, i) => (
          <li data-wrap key={e.role + e.org}>
            <article className="row static">
              <div className="row-head">
                <span className="row-num">{String(i + 1).padStart(3, '0')}</span>
                <h3 className="row-title">{e.role}</h3>
                <span className="row-meta">
                  {e.org} / {e.department}
                </span>
                <span className="row-tag">{e.period}</span>
                {e.description && <p className="row-desc">{e.description}</p>}
              </div>
              <span className="row-rule" aria-hidden="true" />
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
