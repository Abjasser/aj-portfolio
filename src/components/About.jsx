import { about } from '../data.js'

export default function About() {
  return (
    <section id="about" data-section aria-labelledby="about-h">
      <div data-wrap>
        <h2 className="sec-label" id="about-h">
          ABOUT
        </h2>
      </div>
      <div data-wrap>
        <p className="about-statement">{about.statement}</p>
      </div>
      <div data-wrap>
        <ul className="about-domains">
          {about.domains.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
      <div data-wrap>
        <div className="about-education">
          <span className="about-education-label">EDUCATION</span>
          <p className="about-education-degree">{about.education.degree}</p>
          <p className="about-education-school">{about.education.school}</p>
          <p className="about-education-years">{about.education.years}</p>
        </div>
      </div>
      <div data-wrap>
        <p className="makers-mark">{about.makersMark}</p>
      </div>
    </section>
  )
}
