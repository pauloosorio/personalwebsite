import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Paulo Os.rio/);
  assert.match(html, /Lead Experience Designer/);
  assert.match(html, /park-garden-v5-environment\.mp4/);
  assert.match(html, /park-garden-v5-environment-poster\.png/);
  assert.match(html, /ziggy-soft-hover\.png/);
  assert.match(html, /backpack-soft-hover\.png/);
  assert.match(html, /notebook-closed\.png/);
  assert.doesNotMatch(html, /comics-soft-hover\.png/);
  assert.match(html, /postcard-soft-hover\.png/);
  assert.match(html, /Open About Me and CV/);
  assert.match(html, /Open Ziggy&#x27;s story|Open Ziggy's story/);
  assert.match(html, /Open projects/);
  assert.match(html, /Open contact postcard/);
  assert.match(html, /About me \+ CV/);
  assert.match(html, /Ziggy story/);
  assert.match(html, /Send me a note/);
  assert.doesNotMatch(html, /Explore the objects in the garden/);
  assert.match(html, /rough-annotation-ink/);
  assert.doesNotMatch(html, /Enterprise Product UX/);
  assert.doesNotMatch(html, /AI Design Operations/);
  assert.doesNotMatch(html, /park-garden-v5-hover-review\.mp4/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton/);
});

test("removes starter preview references", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});

test("keeps the backpack paper CV experience wired", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Hi, I&apos;m Paulo Osório/);
  assert.match(page, /Magic:/);
  assert.match(page, /see my CV/);
  assert.match(page, /Back to about/);
  assert.match(page, /CV Paulo Osorio 2026\.pdf/);
  assert.match(page, /paulo-polaroid-0481-v2\.png/);
  assert.match(page, /about-paper-organic\.png/);
  assert.match(page, /Product Design Leadership/);
  assert.match(page, /Lead Experience Designer/);
  assert.match(styles, /\.paper-surface/);
  assert.match(styles, /drop-shadow\(0 28px 44px/);
  assert.match(styles, /\.inline-paper-link/);
  assert.match(styles, /\.paperclip-polaroid/);
  assert.match(styles, /\.cv-chip-list/);
});

test("keeps the Ziggy album and private message form wired", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Ziggy story/);
  assert.match(styles, /ziggy-title-tape\.png/);
  assert.match(page, /Leave something for Ziggy/);
  assert.match(page, /Previous/);
  assert.match(page, /Next/);
  assert.match(page, /about-paper-organic\.png/);
  assert.match(page, /img_0482-polaroid\.png/);
  assert.match(page, /img_0486-polaroid\.png/);
  assert.match(page, /privateMessageEndpoint/);
  assert.match(page, /Message sent\. We&#x27;ll make sure Ziggy gets it|Message sent\. We'll make sure Ziggy gets it/);
  assert.doesNotMatch(page, /window\.localStorage/);
  assert.doesNotMatch(page, /Little notes/);
  assert.match(styles, /\.ziggy-album/);
  assert.match(styles, /\.ziggy-album-surface/);
  assert.match(styles, /\.ziggy-polaroid/);
  assert.match(styles, /\.ziggy-message-form/);
});

test("keeps the notebook project index wired", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Projects/);
  assert.doesNotMatch(page, /Selected field issues/);
  assert.doesNotMatch(page, /Portfolio stories/);
  assert.match(page, /Design System Project/);
  assert.match(page, /Making Of Project/);
  assert.match(page, /Dog Health Project/);
  assert.match(page, /The System Builder/);
  assert.match(page, /The AI Studio/);
  assert.match(page, /The Care Companion/);
  assert.match(page, /Process Archive/);
  assert.match(page, /href: "\/projects\/design-system"/);
  assert.match(page, /href: "\/projects\/making-of"/);
  assert.doesNotMatch(page, /OMS/);
  assert.doesNotMatch(page, /WMS/);
  assert.doesNotMatch(page, /TMS/);
  assert.match(page, /Projects index/);
  assert.match(page, /Design System and Making Of are open/);
  assert.doesNotMatch(page, /comic-panel-tooltip/);
  assert.doesNotMatch(page, /design-system-cover-v1\.png/);
  assert.doesNotMatch(page, /dog-health-cover-v2\.png/);
  assert.match(page, /paper-surface/);
  assert.match(page, /paper-page project-index-page/);
  assert.match(page, /about-paper-organic\.png/);
  assert.match(styles, /\.story-panel-projects/);
  assert.match(styles, /\.project-index-page/);
  assert.match(styles, /\.project-index-row/);
  assert.match(styles, /park-garden-v5-environment-poster\.png/);
  assert.doesNotMatch(styles, /open-comic-book-projects-transparent-v1\.png/);
  assert.match(styles, /\.issue-design-system/);
  assert.match(styles, /\.issue-making-of/);
  assert.match(styles, /\.issue-dog-health/);
});

test("keeps the Design System project page wired", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/projects/design-system/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Design System/);
  assert.match(page, /Back to garden/);
  assert.match(page, /company products/);
  assert.doesNotMatch(page, /OMS/);
  assert.doesNotMatch(page, /WMS/);
  assert.doesNotMatch(page, /TMS/);
  assert.match(page, /System origin/);
  assert.match(page, /Foundations/);
  assert.match(page, /Documentation/);
  assert.match(page, /Operating model/);
  assert.match(page, /Requests/);
  assert.match(page, /Weekly sessions/);
  assert.match(page, /Two audits per year/);
  assert.match(page, /Governance/);
  assert.match(page, /Systems leadership/);
  assert.match(page, /assets\/design-system\/color-system\.png/);
  assert.match(page, /assets\/design-system\/input-states\.png/);
  assert.match(page, /assets\/design-system\/dialog-documentation\.png/);
  assert.match(page, /assets\/design-system\/accordion-anatomy\.png/);
  assert.match(page, /assets\/design-system\/figma-library\.png/);
  assert.match(page, /case-page-design-system/);
  assert.match(styles, /\.case-page-design-system/);
  assert.match(styles, /\.case-system-origin/);
  assert.match(styles, /\.case-evidence-story/);
  assert.match(styles, /\.case-system-stats/);
  assert.match(styles, /\.case-operating-model/);
  assert.match(styles, /\.case-operating-grid/);
  assert.match(styles, /\.case-design-governance/);
});

test("keeps the Making Of project page wired", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/projects/making-of/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Making Of/);
  assert.match(page, /Back to garden/);
  assert.match(page, /inline-paper-link case-back-link/);
  assert.match(page, /Collaboration workflow/);
  assert.match(page, /System evidence/);
  assert.match(page, /Source of truth/);
  assert.match(page, /Foundations/);
  assert.match(page, /Components/);
  assert.match(page, /Ghost action/);
  assert.match(page, /Previous/);
  assert.match(page, /Making Of Project/);
  assert.match(page, /Reusable component samples/);
  assert.match(page, /assets\/v5\/backpack-trimmed\.png/);
  assert.match(page, /assets\/v5\/ziggy-trimmed\.png/);
  assert.match(page, /assets\/v5\/postcard-trimmed\.png/);
  assert.match(page, /assets\/v5\/notebook-closed\.png/);
  assert.match(page, /assets\/making-of\/landing-garden\.jpg/);
  assert.match(page, /assets\/making-of\/about-paper\.jpg/);
  assert.match(page, /assets\/making-of\/ziggy-album\.jpg/);
  assert.match(page, /assets\/making-of\/postcard-contact\.jpg/);
  assert.match(page, /assets\/making-of\/project-index\.jpg/);
  assert.match(page, /Art direction/);
  assert.match(page, /Portfolio structure/);
  assert.doesNotMatch(page, />Work loop</);
  assert.doesNotMatch(page, />UI kit</);
  assert.doesNotMatch(page, />Memory garden</);
  assert.match(page, /Start with the story/);
  assert.match(page, /Human direction/);
  assert.doesNotMatch(page, /Physical paper became the UI language/);
  assert.match(page, /case-system-grid/);
  assert.match(page, /case-scene-frame/);
  assert.match(page, /case-reveal/);
  assert.match(styles, /\.case-page-making-of/);
  assert.match(styles, /\.case-dossier/);
  assert.match(styles, /\.case-process-board/);
  assert.match(styles, /\.case-system-grid/);
  assert.match(styles, /\.case-component-board/);
  assert.match(styles, /\.case-demo-carousel/);
  assert.match(styles, /\.case-art-direction/);
  assert.match(styles, /\.case-object-strip/);
  assert.match(styles, /\.case-structure-map/);
  assert.match(styles, /\.case-screen-grid/);
  assert.match(styles, /\.case-screen-card/);
  assert.match(styles, /border-radius: 2px/);
  assert.match(styles, /animation-timeline: view\(\)/);
  assert.match(styles, /\.case-reveal/);
});

test("keeps the Porto postcard contact panel wired", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Write a postcard/);
  assert.match(page, /STAMP/);
  assert.doesNotMatch(page, /A small postcard from Porto/);
  assert.match(page, /Send postcard/);
  assert.match(page, /Where can I reply\?/);
  assert.match(styles, /\.postcard-back/);
  assert.doesNotMatch(styles, /\.postcard-mark/);
  assert.match(styles, /var\(--ziggy-clay\)/);
  assert.match(styles, /\.postcard-stamp/);
  assert.match(styles, /\.postcard-form/);
});
