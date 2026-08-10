"use client";

/* eslint-disable @next/next/no-img-element -- V5 uses transparent, precisely positioned local PNG layers; Vinext's local next/image optimizer fails for this interaction layer. */

import Link from "next/link";
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";

const panelKeys = ["backpack", "ziggy", "projects", "contact"] as const;

type PanelId = (typeof panelKeys)[number];
type PanelKey = PanelId | null;
type BackpackSection = "about" | "cv";

type ZiggyMessage = {
  id: string;
  name: string;
  message: string;
};

type SceneObject = {
  id: PanelId;
  label: string;
  normalSrc?: string;
  hoverSrc?: string;
  className: string;
};

const sceneObjects: SceneObject[] = [
  {
    id: "backpack",
    label: "Open About Me and CV",
    normalSrc: "/assets/v5/backpack-trimmed.png",
    hoverSrc: "/assets/v5/backpack-soft-hover.png",
    className: "object-backpack",
  },
  {
    id: "ziggy",
    label: "Open Ziggy's story",
    normalSrc: "/assets/v5/ziggy-trimmed.png",
    hoverSrc: "/assets/v5/ziggy-soft-hover.png",
    className: "object-ziggy",
  },
  {
    id: "projects",
    label: "Open projects",
    normalSrc: "/assets/v5/notebook-closed.png",
    hoverSrc: "/assets/v5/notebook-closed.png",
    className: "object-comics",
  },
  {
    id: "contact",
    label: "Open contact postcard",
    normalSrc: "/assets/v5/postcard-trimmed.png",
    hoverSrc: "/assets/v5/postcard-soft-hover.png",
    className: "object-postcard",
  },
];

const projectIssues = [
  {
    id: "design-system-issue",
    issue: "No. 01",
    title: "Design System Project",
    label: "The System Builder",
    text: "Turning an ageing product UI into shared components, tokens, patterns, Storybook, and governance.",
    meta: ["Design System Lead", "Design + Engineering"],
    href: "/projects/design-system",
    className: "issue-design-system",
  },
  {
    id: "making-of-issue",
    issue: "No. 02",
    title: "Making Of Project",
    label: "The AI Studio",
    text: "How prompts, decisions, generated assets, animation, and critique shaped this portfolio.",
    meta: ["AI Workflow", "Process Archive"],
    href: "/projects/making-of",
    className: "issue-making-of",
  },
  {
    id: "dog-health-issue",
    issue: "No. 03",
    title: "Dog Health Project",
    label: "The Care Companion",
    text: "A warm product concept for dog health, routines, appointments, and care support, inspired by Ziggy.",
    meta: ["Product Concept", "Pet Care"],
    className: "issue-dog-health",
  },
];

const cvSkills = [
  "Product Design Leadership",
  "Enterprise UX",
  "Design Systems Strategy",
  "B2B SaaS",
  "UX Research",
  "Accessibility",
  "Design Governance",
  "AI-Enabled Design Operations",
];

const cvExperience = [
  {
    role: "Lead Experience Designer",
    company: "Infios",
    period: "Mar 2023 - Present",
    bullets: [
      "Lead experience design across enterprise B2B supply-chain company products, AI initiatives, and design systems.",
      "Manage and mentor designers through design direction, sprint support, 1:1s, yearly goals, and professional development.",
      "Lead the company design system, aligning component behaviour, technical feasibility, accessibility, and product needs with development teams.",
      "Created AI-assisted workflows for backlog tickets, design review, context retrieval, prototyping, and internal knowledge access.",
    ],
  },
  {
    role: "UX Designer",
    company: "Infios",
    period: "Apr 2021 - Apr 2023",
    bullets: [
      "Designed B2B product experiences for complex logistics and supply chain workflows.",
      "Helped shape product design culture and process as part of the company's early product design team.",
      "Used interviews, workshops, surveys, usability tests, stakeholder interviews, data analysis, and design sprints to inform product direction.",
    ],
  },
  {
    role: "UX/UI Designer",
    company: "FOURSOURCE",
    period: "Dec 2020 - Apr 2021",
    bullets: [
      "Designed digital tools for manufacturing and supply-chain-related workflows in a startup environment.",
      "Created wireframes, prototypes, and high-fidelity UI designs for product development.",
    ],
  },
];

const cvImpact = [
  {
    title: "Product Design Leadership",
    text: "Lead experience design across enterprise B2B supply-chain company products, AI initiatives, and design systems, balancing user needs, business priorities, and technical feasibility.",
  },
  {
    title: "Design System Leadership",
    text: "Built and now lead a company design system from an old product UI foundation into a scalable system used across product teams, including desktop and mobile components, documented patterns, design tokens, foundations, Storybook, and governance.",
  },
  {
    title: "AI-Enabled Design Workflows",
    text: "Created AI-assisted workflows to support backlog-ticket generation, design review, product context retrieval, folder-structure standardization, quick prototyping, and internal knowledge access.",
  },
];

const cvEarlierExperience = [
  "Graphic & Web Designer, skeeled | Mar 2020 - Nov 2020",
  "Graphic Designer, EATIV | Apr 2019 - Mar 2020",
  "Graphic Designer, Orthos XXI | Jun 2017 - Mar 2019",
];

const cvEducation = [
  "EDIT. - Disruptive Digital Education | User Experience & User Interface Design | 2020",
  "Faculdade de Belas Artes da Universidade do Porto | Master's Degree, Contemporary Artistic Practices | 2014 - 2016",
];

const cvCertifications = [
  "How To Design for Accessibility: for UX Designers, WCAG 2.2 | Udemy | Issued Jul 2024",
  "UX Management: Strategy and Tactics | Interaction Design Foundation | Issued Dec 2022",
];

const cvToolsMethods = [
  "Figma",
  "FigJam",
  "Jira",
  "Confluence",
  "Storybook",
  "design tokens",
  "component documentation",
  "design systems",
  "usability testing",
  "interviews",
  "workshops",
  "surveys",
  "stakeholder interviews",
  "data analysis",
  "design sprints",
  "prototyping",
  "AI-assisted workflows",
  "agent-based design operations",
  "HTML/CSS prototyping with AI support",
];

const ziggyPhotos = [
  {
    src: "/assets/ziggy-memory-book/img_0483-polaroid.png",
    alt: "A physical polaroid portrait of Ziggy looking toward the camera.",
    caption: "Say hi to Ziggy",
  },
  {
    src: "/assets/ziggy-memory-book/img_0485-polaroid.png",
    alt: "A physical polaroid of Ziggy enjoying time outside.",
    caption: "Explorer mode",
  },
  {
    src: "/assets/ziggy-memory-book/img_0482-polaroid.png",
    alt: "A physical polaroid of Ziggy resting beside Paulo.",
    caption: "Always close",
  },
  {
    src: "/assets/ziggy-memory-book/img_0486-polaroid.png",
    alt: "A physical polaroid of Ziggy wearing a recovery collar beside family.",
    caption: "Still Ziggy",
  },
];

const ziggyStoryParagraphs = [
  "Some stories deserve their own little corner.",
  "Ziggy has been part of our family since 2021. Born on Christmas Day, his start in life wasn't the easiest. He came to us carrying fears and experiences we could never fully understand, but also with an incredible willingness to trust, to love, and to keep moving forward.",
  "And that is Ziggy.",
  "He is brave, stubborn, ridiculously smart, and full of personality. He loves meeting other dogs, exploring new places, running on the beach and jumping into the water. Sometimes, though, the greatest adventure is simply taking his time to smell absolutely everything along the way.",
  "He loves licking our faces, sleeping at the end of our bed, being close to his sister Cali, and looking at us with the most expressive eyes I have ever seen.",
  "Over the years, we have helped Ziggy overcome some of his fears. But the truth is that he has taught us just as much in return.",
  "He taught me that trust takes time. That progress doesn't always happen in a straight line. That being there for someone matters, even when you can't fix everything for them. And that sometimes strength isn't about being fearless. It's about continuing to explore the world despite the things that scare you.",
  "Recently, Ziggy was diagnosed with lupus, a chronic autoimmune disease. It means that we are entering a new chapter together. There will be changes, things to learn, and probably some difficult days along the way.",
  "But if there is one thing Ziggy has shown us since the day he entered our lives, it is that a difficult chapter doesn't have to define the whole story.",
  "So we will adapt. We will learn. We will be there for him, just as we always have been.",
  "And Ziggy will continue being Ziggy: exploring, playing, stealing our side of the bed, licking our faces, and reminding us to enjoy the world one smell at a time.",
  "This little space exists because he deserves one.",
  "Not because of what he is going through, but because of everything he is.",
];

const isPanelId = (value: string): value is PanelId =>
  panelKeys.includes(value as PanelId);

const isZiggyMessage = (value: unknown): value is ZiggyMessage => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.message === "string"
  );
};

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const getFocusableElements = (element: HTMLElement) =>
  Array.from(element.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (item) => item.offsetParent !== null || item === document.activeElement,
  );

export default function Home() {
  const [panel, setPanel] = useState<PanelKey>(null);
  const [backpackSection, setBackpackSection] = useState<BackpackSection>("about");
  const [ziggyName, setZiggyName] = useState("");
  const [ziggyMessage, setZiggyMessage] = useState("");
  const [ziggyPhotoIndex, setZiggyPhotoIndex] = useState(0);
  const [postcardStatus, setPostcardStatus] = useState("");
  const [ziggyMessages, setZiggyMessages] = useState<ZiggyMessage[]>(() => {
    if (typeof window === "undefined") return [];

    const savedMessages = window.localStorage.getItem("ziggyMessages");
    if (!savedMessages) return [];

    try {
      const parsedMessages: unknown = JSON.parse(savedMessages);
      return Array.isArray(parsedMessages)
        ? parsedMessages.filter(isZiggyMessage)
        : [];
    } catch {
      return [];
    }
  });
  const [ziggyMessageStatus, setZiggyMessageStatus] = useState("");
  const panelRef = useRef<HTMLElement>(null);
  const paperPageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const openPanel = (nextPanel: PanelId) => {
    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (nextPanel === "backpack") {
      setBackpackSection("about");
    }
    setPanel(nextPanel);

    const nextHash = `#${nextPanel}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState({panel: nextPanel}, "", nextHash);
    }
  };

  const closePanel = () => {
    setPanel(null);

    if (isPanelId(window.location.hash.slice(1))) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.requestAnimationFrame(() => {
      openerRef.current?.focus();
    });
  };

  useEffect(() => {
    const syncPanelFromHash = () => {
      const hashPanel = window.location.hash.slice(1);
      setPanel(isPanelId(hashPanel) ? hashPanel : null);
    };

    syncPanelFromHash();
    window.addEventListener("hashchange", syncPanelFromHash);
    window.addEventListener("popstate", syncPanelFromHash);

    return () => {
      window.removeEventListener("hashchange", syncPanelFromHash);
      window.removeEventListener("popstate", syncPanelFromHash);
    };
  }, []);

  useEffect(() => {
    if (!panel) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [panel]);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      paperPageRef.current?.scrollTo({top: 0, behavior: "auto"});
    });
  }, [backpackSection]);

  useEffect(() => {
    window.localStorage.setItem("ziggyMessages", JSON.stringify(ziggyMessages));
  }, [ziggyMessages]);

  const handleZiggyMessageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = ziggyMessage.trim();
    if (!trimmedMessage) {
      setZiggyMessageStatus("Write Ziggy a small note first.");
      return;
    }

    const trimmedName = ziggyName.trim();
    setZiggyMessages((currentMessages) => [
      {
        id: window.crypto.randomUUID(),
        name: trimmedName || "A garden visitor",
        message: trimmedMessage,
      },
      ...currentMessages,
    ]);
    setZiggyName("");
    setZiggyMessage("");
    setZiggyMessageStatus("Message saved for Ziggy.");
  };

  const activeZiggyPhoto = ziggyPhotos[ziggyPhotoIndex];

  const showPreviousZiggyPhoto = () => {
    setZiggyPhotoIndex((currentIndex) =>
      currentIndex === 0 ? ziggyPhotos.length - 1 : currentIndex - 1,
    );
  };

  const showNextZiggyPhoto = () => {
    setZiggyPhotoIndex((currentIndex) =>
      currentIndex === ziggyPhotos.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const handlePostcardSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPostcardStatus("Postcard drafted. Email sending is not connected yet.");
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePanel();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) return;

    const focusableElements = getFocusableElements(panelRef.current);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) {
      event.preventDefault();
      closeButtonRef.current?.focus();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <main>
      <section className="scene-hero" aria-label="Paulo Osorio portfolio garden">
        <div className="scene-shell">
          <video
            className="scene-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/assets/v5/park-garden-v5-environment-poster.png"
            aria-hidden="true"
          >
            <source src="/assets/v5/park-garden-v5-environment.mp4" type="video/mp4" />
          </video>
          <img
            className="scene-fallback"
            src="/assets/v5/park-garden-v5-environment-poster.png"
            alt="Painterly garden landscape with a winding path, trees, grass, and a bench"
          />

          <header className="identity" aria-label="Portfolio identity">
            <span className="identity-name">
              Paulo Osório
            </span>
            <span className="identity-role">Lead Experience Designer</span>
          </header>

          <nav className="world-links" aria-label="Primary links">
            <a href="https://www.linkedin.com/in/paulo-os%C3%B3rio-70507a198">LinkedIn</a>
          </nav>

          <div className="object-layer" aria-label="Interactive portfolio objects">
            {sceneObjects.map((object) => (
              <button
                key={object.id}
                className={`scene-object ${object.className}`}
                type="button"
                aria-label={object.label}
                aria-haspopup="dialog"
                aria-expanded={panel === object.id}
                onClick={() => openPanel(object.id)}
              >
                <span className="object-images" aria-hidden="true">
                  {object.normalSrc ? (
                    <>
                      <img
                        className="object-image object-normal"
                        src={object.normalSrc}
                        alt=""
                      />
                      <img
                        className="object-image object-hover"
                        src={object.hoverSrc ?? object.normalSrc}
                        alt=""
                      />
                    </>
                  ) : (
                    <span className="object-notebook" />
                  )}
                  <span className="object-shine" />
                </span>
              </button>
            ))}
          </div>

          <div className="annotation-layer" aria-hidden="true">
            <svg className="annotation-filter" width="0" height="0">
              <filter id="rough-annotation-ink" x="-15%" y="-15%" width="130%" height="130%">
                <feTurbulence
                  baseFrequency="0.035"
                  numOctaves="2"
                  seed="17"
                  type="fractalNoise"
                  result="ink-noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="ink-noise"
                  scale="1.35"
                />
              </filter>
            </svg>
            <span className="scene-annotation annotation-backpack">
              <span>About me + CV</span>
              <svg className="annotation-arrow" viewBox="0 0 120 70">
                <path d="M110 10C76 5 48 20 31 50" />
                <path d="m23 39 8 11 13-3" />
              </svg>
            </span>
            <span className="scene-annotation annotation-ziggy">
              <span>Ziggy story</span>
              <svg className="annotation-arrow" viewBox="0 0 120 70">
                <path d="M110 10C76 4 48 19 31 50" />
                <path d="m23 39 8 11 13-3" />
              </svg>
            </span>
            <span className="scene-annotation annotation-notebook">
              <span>Projects</span>
              <svg className="annotation-arrow" viewBox="0 0 120 70">
                <path d="M109 9C73 3 45 19 30 52" />
                <path d="m22 41 8 11 13-4" />
              </svg>
            </span>
            <span className="scene-annotation annotation-postcard">
              <span>Send me a note</span>
              <svg className="annotation-arrow" viewBox="0 0 120 70">
                <path d="M110 9C78-4 47 5 43 28c-3 16 14 25 27 15 8-6 4-15-5-12-12 4-20 22-33 31" />
                <path d="m24 51 8 11 12-5" />
              </svg>
            </span>
          </div>
        </div>
      </section>

      {panel ? (
        <div className="panel-backdrop" role="presentation" onClick={closePanel}>
          <section
            ref={panelRef}
            className={`story-panel story-panel-${panel}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${panel}-panel-title`}
            aria-describedby={`${panel}-panel-description`}
            tabIndex={-1}
            onKeyDown={handleDialogKeyDown}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="panel-close"
              type="button"
              aria-label="Close"
              onClick={closePanel}
            />
            {panel === "backpack" ? (
              <>
                {backpackSection === "cv" ? (
                  <button
                    className="inline-paper-link cv-panel-back-action"
                    type="button"
                    onClick={() => setBackpackSection("about")}
                  >
                    Back to about
                  </button>
                ) : null}
                <img
                  className="paper-surface"
                  src="/assets/about-paper-organic.png"
                  alt=""
                  aria-hidden="true"
                />
                <div
                  ref={paperPageRef}
                  id="backpack-panel-description"
                  className="paper-page"
                >
                  {backpackSection === "about" ? (
                    <section
                      id="backpack-about-panel"
                      className="paper-section paper-section-about"
                    >
                      <div className="paperclip-polaroid" aria-hidden="true">
                        <img
                          src="/assets/paulo-polaroid-0481-v2.png"
                          alt=""
                        />
                      </div>
                      <div className="about-copy">
                        <h2 id="backpack-panel-title">
                          Hi, I&apos;m Paulo Osório and here you can learn a bit about me.
                        </h2>
                        <p>
                          I&apos;m a Lead Experience Designer who believes good design goes
                          beyond the products we build. It&apos;s also about the teams,
                          systems, and environments we create around them.
                        </p>
                        <p>
                          I&apos;m naturally curious and always looking for something new to
                          learn, improve, or challenge. As a lead, a big part of what drives me
                          is helping others grow, creating the space and processes that allow
                          people to do their best work, and making collaboration feel a little
                          easier along the way.
                        </p>
                        <p>
                          Outside of design, I&apos;m a proud dog parent, a collector, a Magic:
                          The Gathering player, a comic book reader, and someone who can
                          happily spend hours talking about Marvel, Harry Potter or The Lord of
                          the Rings.
                        </p>
                        <p>
                          At the end of the day, I like building things that make a difference:
                          for users, for teams, and for people. You can also{" "}
                          <button
                            className="inline-paper-link"
                            type="button"
                            onClick={() => setBackpackSection("cv")}
                          >
                            see my CV
                          </button>
                          .
                        </p>
                      </div>
                    </section>
                  ) : (
                    <section
                      id="backpack-cv-panel"
                      className="paper-section cv-paper-section"
                    >
                      <div className="cv-paper-header">
                        <div>
                          <h2 id="backpack-panel-title">Paulo Osório</h2>
                          <p>Lead Experience Designer | Porto, Portugal | Remote</p>
                        </div>
                        <a
                          className="panel-link"
                          href="/assets/CV Paulo Osorio 2026.pdf"
                        >
                          Download PDF
                        </a>
                      </div>

                      <p>
                        Lead Experience Designer with product design experience since 2020,
                        focused on enterprise B2B software, complex workflows, design systems,
                        and AI-enabled design operations.
                      </p>

                      <div className="cv-chip-list" aria-label="Core CV skills">
                        {cvSkills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>

                      <div className="cv-section-list">
                        <h3>Selected Impact</h3>
                        {cvImpact.map((item) => (
                          <article key={item.title}>
                            <h4>{item.title}</h4>
                            <p>{item.text}</p>
                          </article>
                        ))}
                      </div>

                      <div className="cv-experience-list">
                        <h3>Experience</h3>
                        {cvExperience.map((item) => (
                          <article key={`${item.company}-${item.role}`}>
                            <h4>{item.role}</h4>
                            <p>
                              {item.company} | {item.period}
                            </p>
                            <ul>
                              {item.bullets.map((bullet) => (
                                <li key={bullet}>{bullet}</li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>

                      <div className="cv-section-list">
                        <h3>Earlier Experience</h3>
                        <ul>
                          {cvEarlierExperience.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <p>
                          Built a foundation in visual design, corporate identity,
                          communication design, web design, illustration, animation, and
                          digital content creation.
                        </p>
                      </div>

                      <div className="cv-section-list">
                        <h3>Education</h3>
                        <ul>
                          {cvEducation.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="cv-section-list">
                        <h3>Certifications</h3>
                        <ul>
                          {cvCertifications.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="cv-section-list">
                        <h3>Tools &amp; Methods</h3>
                        <p>{cvToolsMethods.join(", ")}.</p>
                      </div>

                      <div className="cv-section-list">
                        <h3>Languages</h3>
                        <p>Portuguese: Native</p>
                        <p>English: Full professional proficiency</p>
                      </div>
                    </section>
                  )}
                </div>
              </>
            ) : null}
            {panel === "ziggy" ? (
              <div className="ziggy-album">
                <img
                  className="ziggy-album-surface"
                  src="/assets/ziggy-memory-book/ziggy-paper-book-cutout.png"
                  alt=""
                  aria-hidden="true"
                />
                <div className="ziggy-photo-page" aria-label="Ziggy photo album">
                  <figure className="ziggy-polaroid">
                    <img src={activeZiggyPhoto.src} alt={activeZiggyPhoto.alt} />
                  </figure>
                  <div className="ziggy-carousel-controls" aria-label="Photo controls">
                    <button type="button" onClick={showPreviousZiggyPhoto}>
                      Previous
                    </button>
                    <span aria-live="polite">
                      {ziggyPhotoIndex + 1} / {ziggyPhotos.length}
                    </span>
                    <button type="button" onClick={showNextZiggyPhoto}>
                      Next
                    </button>
                  </div>
                  <div className="ziggy-carousel-dots" aria-label="Choose a photo">
                    {ziggyPhotos.map((photo, index) => (
                      <button
                        aria-label={`Show photo ${index + 1}: ${photo.caption}`}
                        aria-current={index === ziggyPhotoIndex ? "true" : undefined}
                        key={photo.src}
                        type="button"
                        onClick={() => setZiggyPhotoIndex(index)}
                      />
                    ))}
                  </div>
                </div>
                <article className="ziggy-story-page" id="ziggy-panel-description">
                  <h2 className="ziggy-title-tape" id="ziggy-panel-title">
                    Ziggy story
                  </h2>
                  <div className="ziggy-story-copy">
                    {ziggyStoryParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <section
                    className="ziggy-message-card"
                    aria-labelledby="ziggy-message-title"
                  >
                    <h3 id="ziggy-message-title">Leave something for Ziggy</h3>
                    <p>
                      If Ziggy&apos;s story made you smile, reminded you of someone
                      you love, or simply made you want to say hello, you can leave
                      him a little message below. We&apos;ll make sure he gets it.
                    </p>
                    <form
                      className="ziggy-message-form"
                      onSubmit={handleZiggyMessageSubmit}
                    >
                      <label>
                        Your name
                        <input
                          value={ziggyName}
                          onChange={(event) => setZiggyName(event.target.value)}
                          placeholder="Optional"
                          maxLength={64}
                        />
                      </label>
                      <label>
                        Message
                        <textarea
                          value={ziggyMessage}
                          onChange={(event) => setZiggyMessage(event.target.value)}
                          placeholder="Say hello to Ziggy"
                          maxLength={420}
                          required
                        />
                      </label>
                      <button className="ziggy-submit" type="submit">
                        Leave message
                      </button>
                      {ziggyMessageStatus ? (
                        <p className="ziggy-message-status" role="status">
                          {ziggyMessageStatus}
                        </p>
                      ) : null}
                    </form>
                    {ziggyMessages.length > 0 ? (
                      <div className="ziggy-saved-messages">
                        <h4>Little notes</h4>
                        <ul>
                          {ziggyMessages.slice(0, 3).map((savedMessage) => (
                            <li key={savedMessage.id}>
                              <strong>{savedMessage.name}</strong>
                              <span>{savedMessage.message}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </section>
                </article>
              </div>
            ) : null}
            {panel === "projects" ? (
              <>
                <img
                  className="paper-surface"
                  src="/assets/about-paper-organic.png"
                  alt=""
                  aria-hidden="true"
                />
                <div id="projects-panel-description" className="paper-page project-index-page">
                  <header className="project-index-header">
                    <p className="panel-kicker">Projects index</p>
                    <h2 id="projects-panel-title" className="sr-only">Projects</h2>
                  </header>
                  <ul className="project-index-list" aria-label="Project index">
                    {projectIssues.map((issue) => (
                      <li className={issue.className} key={issue.id}>
                        {issue.href ? (
                          <Link
                            className="project-index-row"
                            href={issue.href}
                            id={issue.id}
                            aria-label={`${issue.title}: ${issue.text}`}
                          >
                            <span className="project-index-issue">{issue.issue}</span>
                            <span className="project-index-title">{issue.title}</span>
                            <span className="project-index-rule" aria-hidden="true" />
                            <span className="project-index-label">{issue.label}</span>
                          </Link>
                        ) : (
                          <div
                            className="project-index-row project-index-row-disabled"
                            id={issue.id}
                            aria-disabled="true"
                          >
                            <span className="project-index-issue">{issue.issue}</span>
                            <span className="project-index-title">{issue.title}</span>
                            <span className="project-index-rule" aria-hidden="true" />
                            <span className="project-index-label">{issue.label}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="project-index-note">
                    Design System and Making Of are open. Dog Health is reserved for the next case-study pass.
                  </p>
                </div>
              </>
            ) : null}
            {panel === "contact" ? (
              <div className="postcard-back" id="contact-panel-description">
                <div className="postcard-left">
                  <div className="postcard-stamp" aria-hidden="true">
                    <span>STAMP</span>
                  </div>
                  <p>
                    If the garden made you curious, send a note. I&apos;m always
                    open to thoughtful product, design system, AI workflow, or
                    creative portfolio conversations.
                  </p>
                </div>
                <form className="postcard-form" onSubmit={handlePostcardSubmit}>
                  <h2 id="contact-panel-title">Write a postcard</h2>
                  <div className="postcard-to">
                    <span>To</span>
                    <strong>Paulo Osório</strong>
                  </div>
                  <label>
                    Subject
                    <input placeholder="What should we talk about?" maxLength={90} />
                  </label>
                  <label>
                    Message
                    <textarea placeholder="Write your message here." maxLength={640} />
                  </label>
                  <button className="postcard-send" type="submit">
                    Mark as ready
                  </button>
                  {postcardStatus ? (
                    <p className="postcard-status" role="status">
                      {postcardStatus}
                    </p>
                  ) : null}
                </form>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </main>
  );
}
