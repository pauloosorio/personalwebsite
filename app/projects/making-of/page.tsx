/* eslint-disable @next/next/no-img-element -- Local portfolio artifacts need custom editorial framing and controlled crops. */
import Link from "next/link";

const workflowSteps = [
  {
    marker: "01",
    title: "Start with the story",
    body:
      "The portfolio began with Ziggy, not with a layout. The goal was to build something human enough to open better conversations.",
  },
  {
    marker: "02",
    title: "Turn feelings into rules",
    body:
      "Warmth, memory, paper, and quiet play became design constraints. Every interaction had to support the atmosphere instead of fighting it.",
  },
  {
    marker: "03",
    title: "Collaborate through critique",
    body:
      "You directed the taste and decisions. I helped translate them into plans, prompts, UI structures, code, tests, and iteration options.",
  },
  {
    marker: "04",
    title: "Document as we build",
    body:
      "The decisions, UI kit, content direction, and implementation rules became source-of-truth files so the work could keep evolving.",
  },
];

const sourceFiles = [
  ["decisions.md", "What we agreed and why"],
  ["ui-kit.md", "Foundations and component rules"],
  ["context.md", "Story, goals, and constraints"],
  ["case-study notes", "What this page should prove"],
];

const portfolioStructure = [
  {
    title: "Garden",
    body: "The landing page became a calm animated scene where objects replace conventional navigation.",
    src: "/assets/making-of/landing-garden.jpg",
    alt: "Portfolio landing garden with interactive objects.",
  },
  {
    title: "Paper",
    body: "The backpack opens a scanned-paper surface for the human introduction and CV.",
    src: "/assets/making-of/about-paper.jpg",
    alt: "About section opened on a scanned paper sheet.",
  },
  {
    title: "Album",
    body: "Ziggy's story uses a quieter photo-album pattern instead of a normal profile card.",
    src: "/assets/making-of/ziggy-album.jpg",
    alt: "Ziggy story album with photo carousel and text.",
  },
  {
    title: "Postcard",
    body: "Contact becomes a postcard, keeping the interface practical without breaking the world.",
    src: "/assets/making-of/postcard-contact.jpg",
    alt: "Contact postcard panel from the portfolio.",
  },
  {
    title: "Notebook",
    body: "Projects open from a notebook index, keeping the case studies connected to the landscape.",
    src: "/assets/making-of/project-index.jpg",
    alt: "Projects index shown on a paper page.",
  },
];

const componentSamples = [
  ["List row", "Project index item with number, title, rule, and purpose."],
  ["Ghost text", "Quiet action style used for paper links and navigation."],
  ["Close", "32px circular X control used across physical panels."],
  ["Carousel", "Photo navigation for Ziggy's album without visual noise."],
];

const interactiveObjects = [
  {
    title: "Backpack",
    src: "/assets/v5/backpack-trimmed.png",
    alt: "Painted backpack interactive object.",
  },
  {
    title: "Ziggy",
    src: "/assets/v5/ziggy-trimmed.png",
    alt: "Painted Ziggy interactive object.",
  },
  {
    title: "Postcard",
    src: "/assets/v5/postcard-trimmed.png",
    alt: "Painted postcard interactive object.",
  },
  {
    title: "Notebook",
    src: "/assets/v5/notebook-closed.png",
    alt: "Painted notebook interactive object.",
  },
];

const foundationColors = [
  ["Paper", "#fff9ec"],
  ["Gold", "#d7a04d"],
  ["Clay", "#c25a2c"],
  ["Moss", "#53694f"],
  ["Ink", "#1d1814"],
];

export default function MakingOfPage() {
  return (
    <main className="case-page case-page-making-of">
      <Link className="inline-paper-link case-back-link" href="/#projects">
        Back to garden
      </Link>

      <section className="case-dossier case-reveal" aria-labelledby="making-of-title">
        <div className="case-dossier-meta" aria-label="Project metadata">
          <span>Project 02</span>
          <span>Process story</span>
          <span>AI collaboration</span>
        </div>
        <h1 id="making-of-title">Making Of</h1>
        <p>
          This is the story behind the portfolio: a collaboration between human
          direction and AI-assisted making, built around Ziggy, memory, craft,
          and the systems needed to turn a feeling into a working product.
        </p>
      </section>

      <section className="case-brief-grid case-reveal" aria-label="Project brief">
        <article>
          <span>Why</span>
          <p>
            More than a portfolio, this became an homage to Ziggy and a way to
            show the human side behind product work.
          </p>
        </article>
        <article>
          <span>How</span>
          <p>
            We worked through prompts, critique, markdown decisions, visual
            systems, object interactions, and small implemented passes.
          </p>
        </article>
        <article>
          <span>Proof</span>
          <p>
            The outcome shows creative direction, design-system thinking,
            technical collaboration, and AI used with taste and control.
          </p>
        </article>
      </section>

      <section className="case-process-board case-reveal" aria-labelledby="process-board-title">
        <header>
          <p className="case-kicker">Collaboration workflow</p>
          <h2 className="sr-only" id="process-board-title">Collaboration workflow</h2>
        </header>
        <ol>
          {workflowSteps.map((note) => (
            <li key={note.marker}>
              <span>{note.marker}</span>
              <div>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-system-grid case-reveal" aria-labelledby="system-title">
        <header>
          <p className="case-kicker">System evidence</p>
          <h2 className="sr-only" id="system-title">System evidence</h2>
        </header>
        <div className="case-system-panels">
          <article className="case-doc-stack">
            <h3>Source of truth</h3>
            <ul aria-label="Project documentation files">
              {sourceFiles.map(([file, purpose]) => (
                <li key={file}>
                  <span aria-hidden="true" />
                  <div>
                    <strong>{file}</strong>
                    <em>{purpose}</em>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <article className="case-foundation-board">
            <h3>Foundations</h3>
            <div className="case-foundation-stack">
              <div className="case-type-board" aria-label="Typography samples">
                <span>Aa</span>
                <div>
                  <strong>Google Sans Code</strong>
                  <span>Labels, buttons, metadata</span>
                </div>
                <span>Aa</span>
                <div>
                  <strong>Source Serif 4</strong>
                  <span>Longer story content</span>
                </div>
              </div>
              <div className="case-color-row" aria-label="Color samples">
                {foundationColors.map(([name, value]) => (
                  <span key={name}>
                    <strong>{name}</strong>
                    <code>{value}</code>
                  </span>
                ))}
              </div>
            </div>
          </article>
          <article className="case-component-board">
            <h3>Components</h3>
            <div className="case-component-demo">
              <button type="button">Ghost action</button>
              <button className="case-demo-close" type="button" aria-label="Close preview" />
              <div className="case-demo-carousel" aria-label="Carousel controls preview">
                <button type="button">Previous</button>
                <span>02 / 05</span>
                <button type="button">Next</button>
              </div>
              <div className="case-demo-list">
                <span>No. 02</span>
                <strong>Making Of Project</strong>
                <i />
                <em>The AI Studio</em>
              </div>
              <ul className="case-component-list" aria-label="Reusable component samples">
                {componentSamples.map(([name, description]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    <span>{description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="case-art-direction case-reveal" aria-labelledby="art-title">
        <header>
          <p className="case-kicker">Art direction</p>
          <h2 className="sr-only" id="art-title">Art direction</h2>
          <p>
            The landscape became the communication piece. Each object opens a
            different kind of surface: paper for the personal story, album for
            Ziggy, postcard for contact, notebook for projects.
          </p>
        </header>
        <figure className="case-scene-frame">
          <img
            src="/assets/v5/park-garden-v5-environment-poster.png"
            alt="Painterly garden scene used as the portfolio landing page."
          />
          <figcaption>Landscape as navigation, not decoration.</figcaption>
        </figure>
        <div className="case-object-strip" aria-label="Interactive objects in the garden">
          {interactiveObjects.map((object) => (
            <figure key={object.title}>
              <img src={object.src} alt={object.alt} />
              <figcaption>{object.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-structure-map case-reveal" aria-labelledby="structure-title">
        <header>
          <p className="case-kicker">Portfolio structure</p>
          <h2 className="sr-only" id="structure-title">Portfolio structure</h2>
          <p>
            The website behaves less like a menu and more like a small world:
            each object opens a different physical format, so navigation also
            becomes part of the story.
          </p>
        </header>
        <div className="case-screen-grid">
          {portfolioStructure.map((screen) => (
            <figure key={screen.title} className="case-screen-card">
              <img src={screen.src} alt={screen.alt} />
              <figcaption>
                <strong>{screen.title}</strong>
                <span>{screen.body}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="case-closing case-reveal" aria-labelledby="case-closing-title">
        <p className="case-kicker">What it proves</p>
        <h2 id="case-closing-title">Human direction</h2>
        <p>
          The important part was not that AI could generate options. It was the
          collaboration: deciding what felt right, rejecting what did not,
          documenting the rules, and shaping the result into something personal,
          usable, and technically real.
        </p>
      </section>
    </main>
  );
}
