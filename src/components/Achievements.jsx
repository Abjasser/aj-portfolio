import { achievements } from '../data.js'

export default function Achievements() {
  return (
    <section id="credentials" data-section aria-labelledby="credentials-h">
      <div data-wrap>
        <h2 className="sec-label" id="credentials-h">
          CREDENTIALS
        </h2>
      </div>
      <ul className="rows">
        {achievements.map((a) => (
          <li data-wrap key={a.symbol}>
            <article className="credential">
              <span className="credential-symbol" aria-hidden="true">
                {a.symbol}
              </span>
              <div className="credential-body">
                <h3 className="credential-title">{a.title}</h3>
                <p className="credential-desc">{a.description}</p>
              </div>
              {a.hasImage && (
                <figure className="credential-figure">
                  <img src={`${import.meta.env.BASE_URL}medal.jpg`} alt={a.imageAlt} loading="lazy" />
                  {a.labelAr && (
                    <figcaption className="credential-label-ar" lang="ar" dir="rtl">
                      {a.labelAr}
                    </figcaption>
                  )}
                </figure>
              )}
              <span className="row-rule" aria-hidden="true" />
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
