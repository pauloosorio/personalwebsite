/* eslint-disable @next/next/no-img-element -- Local portfolio evidence images need deliberate editorial framing. */
import Link from "next/link";

const foundationEvidence = [
  {
    title: "Color system",
    body: "A shared palette and semantic color decisions made product screens easier to align across company products.",
    src: "/assets/design-system/color-system.png",
    alt: "Design system color documentation with brand, grayscale, text, and UI color samples.",
  },
  {
    title: "Input states",
    body: "Interaction states were documented as behavior, not decoration: default, hover, focus, active, error, and disabled.",
    src: "/assets/design-system/input-states.png",
    alt: "Input component state documentation with default, hover, focused, active, error, and disabled examples.",
  },
];

const documentationEvidence = [
  {
    title: "Component anatomy",
    body: "Each component needed a clear contract between design and development: anatomy, states, sizes, rules, and edge cases.",
    src: "/assets/design-system/accordion-anatomy.png",
    alt: "Accordion component anatomy and size documentation.",
  },
  {
    title: "Dialog behavior",
    body: "Documentation connected visual decisions to interaction behavior, making implementation conversations more precise.",
    src: "/assets/design-system/dialog-documentation.png",
    alt: "Dialog component documentation with structure, states, and implementation notes.",
  },
  {
    title: "Library structure",
    body: "The system lived as a working library, not a presentation: foundations, components, patterns, and shared files.",
    src: "/assets/design-system/figma-library.png",
    alt: "Figma sidebar showing organized design system library pages.",
  },
];

const systemStats = [
  ["50-ish", "desktop and mobile components across the shared library"],
  ["15", "documented patterns for repeated product decisions"],
  ["2", "formal health audits per year, supported by sprint-level requests"],
];

const operatingModel = [
  {
    title: "Requests",
    body:
      "Designers use an internal request flow for additions, changes, and questions. Requests are reviewed once per sprint and shaped into the system backlog.",
  },
  {
    title: "Rituals",
    body:
      "Weekly sessions make new components, improvements, and decisions visible so adoption grows through shared understanding, not hidden updates.",
  },
  {
    title: "Support",
    body:
      "Designers are assigned every sprint to support the system, answer questions through shared team channels, and keep product work connected to the library.",
  },
  {
    title: "Health",
    body:
      "Two audits per year check system quality, consistency, adoption, and documentation health before small issues become product debt.",
  },
];

const governanceSteps = [
  "Requests enter a shared backlog instead of becoming one-off fixes.",
  "Design and development review changes together before they become system rules.",
  "Weekly showcases keep adoption visible and create space for feedback.",
  "Designers rotate support so the system stays connected to real product work.",
];

export default function DesignSystemPage() {
  return (
    <main className="case-page case-page-making-of case-page-design-system">
      <Link className="inline-paper-link case-back-link" href="/#projects">
        Back to garden
      </Link>

      <section className="case-dossier case-reveal" aria-labelledby="design-system-title">
        <div className="case-dossier-meta" aria-label="Project metadata">
          <span>Project 01</span>
          <span>Design system</span>
          <span>Leadership</span>
        </div>
        <h1 id="design-system-title">Design System</h1>
        <p>
          A company-wide design system built from an ageing product UI into a
          shared foundation for company products, product designers, and
          development teams.
        </p>
      </section>

      <section className="case-brief-grid case-reveal" aria-label="Design system brief">
        <article>
          <span>Problem</span>
          <p>
            The company had mature products but no shared design system to guide
            interface decisions, accessibility, or delivery consistency.
          </p>
        </article>
        <article>
          <span>Role</span>
          <p>
            I helped build the system from the start and now lead it, bridging
            design decisions with development feasibility.
          </p>
        </article>
        <article>
          <span>Outcome</span>
          <p>
            The system gives teams a shared language for faster delivery, better
            consistency, and clearer product experiences.
          </p>
        </article>
      </section>

      <section className="case-system-origin case-reveal" aria-labelledby="origin-title">
        <div>
          <p className="case-kicker">System origin</p>
          <h2 id="origin-title">From product UI to product capability.</h2>
        </div>
        <p>
          The work started without a finished system to inherit. We had an old
          interface, real product pressure, and a need to make shared decisions
          visible. The first job was not to collect components. It was to create
          trust: between designers, developers, product teams, and the system
          itself.
        </p>
      </section>

      <section className="case-evidence-story case-reveal" aria-labelledby="foundations-title">
        <header>
          <p className="case-kicker">Foundations</p>
          <h2 id="foundations-title">Rules before screens.</h2>
          <p>
            Tokens, typography, colors, iconography, and responsive foundations
            gave product teams a stable base before component decisions became
            reusable.
          </p>
        </header>
        <div className="case-evidence-grid">
          {foundationEvidence.map((item) => (
            <figure key={item.title}>
              <img src={item.src} alt={item.alt} />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-system-stats case-reveal" aria-label="Design system scale">
        {systemStats.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className="case-evidence-story case-reveal" aria-labelledby="documentation-title">
        <header>
          <p className="case-kicker">Documentation</p>
          <h2 id="documentation-title">The contract matters.</h2>
          <p>
            A useful design system explains what a component is, how it behaves,
            when to use it, and how it should be implemented. That contract made
            design-development conversations sharper.
          </p>
        </header>
        <div className="case-evidence-strip">
          {documentationEvidence.map((item) => (
            <figure key={item.title}>
              <img src={item.src} alt={item.alt} />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-operating-model case-reveal" aria-labelledby="operating-title">
        <header>
          <p className="case-kicker">Operating model</p>
          <h2 id="operating-title">The system needed rituals.</h2>
          <p>
            A design system only works when people know how to request, review,
            support, and improve it. The operating model made contribution part
            of the team rhythm instead of a side conversation.
          </p>
        </header>
        <div className="case-operating-grid">
          {operatingModel.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-process-board case-design-governance case-reveal" aria-labelledby="governance-title">
        <header>
          <p className="case-kicker">Governance</p>
          <h2 className="sr-only" id="governance-title">Governance</h2>
        </header>
        <ol>
          {governanceSteps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step}</h3>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-closing case-reveal" aria-labelledby="design-system-closing-title">
        <p className="case-kicker">What it proves</p>
        <h2 id="design-system-closing-title">Systems leadership</h2>
        <p>
          This work shows the part of design that is easy to underestimate:
          creating the conditions for teams to move with more confidence. The
          system became a shared way to discuss quality, consistency,
          accessibility, and product logic across company products.
        </p>
      </section>
    </main>
  );
}
