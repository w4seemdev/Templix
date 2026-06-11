/* ============================================================
   FORGE — Dev Tools Template
   Dark charcoal/zinc theme (#09090b, #18181b cards) with amber
   accent (#f59e0b) · monospace code · terminal hero · React,
   TypeScript, Shiki flavor
   ============================================================ */

import { useState } from 'react';

const AMBER = '#f59e0b';
const AMBER_LIGHT = '#fbbf24';
const BG = '#09090b';
const CARD = '#18181b';
const BORDER = '1px solid rgba(255,255,255,0.08)';
const TEXT = '#e4e4e7';
const MUTED = '#a1a1aa';
const FAINT = '#71717a';
const DIM = '#52525b';
const MONO = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

const navLinks = ['Home', 'Docs', 'Pricing', 'Changelog', 'Blog'];

const logos = ['Vantage', 'Railgun', 'Hexbyte', 'Coldfront', 'Apexion', 'Nullship'];

const stats = [
  { value: '28.4k', label: 'GitHub stars' },
  { value: '1.2M', label: 'Weekly downloads' },
  { value: '412ms', label: 'Median build time' },
  { value: '140+', label: 'Official plugins' },
];

type Pm = 'npm' | 'yarn' | 'pnpm';
const pms: Pm[] = ['npm', 'yarn', 'pnpm'];
const installCmds: Record<Pm, string> = {
  npm: 'npm install -g @forgehq/cli',
  yarn: 'yarn global add @forgehq/cli',
  pnpm: 'pnpm add -g @forgehq/cli',
};

/* Fake syntax-highlighted terminal output: each line is a list of colored spans */
type Token = { t: string; c: string };
const terminalLines: Token[][] = [
  [{ t: '$ ', c: AMBER }, { t: 'forge init my-api', c: TEXT }],
  [{ t: '✔ ', c: '#4ade80' }, { t: 'Detected TypeScript project (tsconfig.json)', c: MUTED }],
  [{ t: '✔ ', c: '#4ade80' }, { t: 'Generated ', c: MUTED }, { t: 'forge.config.ts', c: '#60a5fa' }, { t: ' with 3 tasks', c: MUTED }],
  [{ t: '✔ ', c: '#4ade80' }, { t: 'Installed plugins: ', c: MUTED }, { t: 'lint · test · deploy', c: AMBER_LIGHT }],
  [{ t: '', c: TEXT }],
  [{ t: '$ ', c: AMBER }, { t: 'forge build --watch', c: TEXT }],
  [{ t: '➜ ', c: '#60a5fa' }, { t: 'Compiling 214 modules…', c: MUTED }],
  [{ t: '➜ ', c: '#60a5fa' }, { t: 'Cache hit: 92% (remote)', c: MUTED }],
  [{ t: '✔ ', c: '#4ade80' }, { t: 'Build completed in ', c: MUTED }, { t: '412ms', c: '#4ade80' }, { t: ' — 0 errors, 0 warnings', c: MUTED }],
  [{ t: '… ', c: DIM }, { t: 'watching for changes', c: DIM }],
];

/* Tabbed code examples (TypeScript / Go / Rust) */
type Lang = 'TypeScript' | 'Go' | 'Rust';
const langs: Lang[] = ['TypeScript', 'Go', 'Rust'];
const KW = AMBER;
const STR = '#4ade80';
const FN = '#60a5fa';
const CMT = DIM;
const PLAIN = '#d4d4d8';

const codeSamples: Record<Lang, Token[][]> = {
  TypeScript: [
    [{ t: '// forge.config.ts — typed pipelines, zero YAML', c: CMT }],
    [{ t: 'import', c: KW }, { t: ' { forge } ', c: PLAIN }, { t: 'from', c: KW }, { t: " '@forgehq/sdk'", c: STR }, { t: ';', c: PLAIN }],
    [{ t: '', c: PLAIN }],
    [{ t: 'const', c: KW }, { t: ' app = ', c: PLAIN }, { t: 'forge', c: FN }, { t: '({ project: ', c: PLAIN }, { t: "'my-api'", c: STR }, { t: ' });', c: PLAIN }],
    [{ t: '', c: PLAIN }],
    [{ t: 'app.', c: PLAIN }, { t: 'task', c: FN }, { t: '(', c: PLAIN }, { t: "'build'", c: STR }, { t: ', ', c: PLAIN }, { t: 'async', c: KW }, { t: ' (ctx) => {', c: PLAIN }],
    [{ t: '  ', c: PLAIN }, { t: 'await', c: KW }, { t: ' ctx.', c: PLAIN }, { t: 'run', c: FN }, { t: '(', c: PLAIN }, { t: "'tsc --noEmit'", c: STR }, { t: ');', c: PLAIN }],
    [{ t: '  ', c: PLAIN }, { t: 'return', c: KW }, { t: ' ctx.', c: PLAIN }, { t: 'artifact', c: FN }, { t: '(', c: PLAIN }, { t: "'dist/'", c: STR }, { t: ');', c: PLAIN }],
    [{ t: '});', c: PLAIN }],
  ],
  Go: [
    [{ t: '// main.go — the same pipeline, native Go API', c: CMT }],
    [{ t: 'import', c: KW }, { t: ' forge ', c: PLAIN }, { t: '"github.com/forgehq/sdk-go"', c: STR }],
    [{ t: '', c: PLAIN }],
    [{ t: 'func', c: KW }, { t: ' ', c: PLAIN }, { t: 'main', c: FN }, { t: '() {', c: PLAIN }],
    [{ t: '  app := forge.', c: PLAIN }, { t: 'New', c: FN }, { t: '(', c: PLAIN }, { t: '"my-api"', c: STR }, { t: ')', c: PLAIN }],
    [{ t: '  app.', c: PLAIN }, { t: 'Task', c: FN }, { t: '(', c: PLAIN }, { t: '"build"', c: STR }, { t: ', ', c: PLAIN }, { t: 'func', c: KW }, { t: '(ctx *forge.Ctx) {', c: PLAIN }],
    [{ t: '    ctx.', c: PLAIN }, { t: 'Run', c: FN }, { t: '(', c: PLAIN }, { t: '"go vet ./..."', c: STR }, { t: ')', c: PLAIN }],
    [{ t: '    ctx.', c: PLAIN }, { t: 'Artifact', c: FN }, { t: '(', c: PLAIN }, { t: '"bin/"', c: STR }, { t: ')', c: PLAIN }],
    [{ t: '  })', c: PLAIN }],
    [{ t: '}', c: PLAIN }],
  ],
  Rust: [
    [{ t: '// build.rs — first-class Rust bindings', c: CMT }],
    [{ t: 'use', c: KW }, { t: ' forge_sdk::{Forge, Ctx};', c: PLAIN }],
    [{ t: '', c: PLAIN }],
    [{ t: 'fn', c: KW }, { t: ' ', c: PLAIN }, { t: 'main', c: FN }, { t: '() {', c: PLAIN }],
    [{ t: '  ', c: PLAIN }, { t: 'let', c: KW }, { t: ' app = Forge::', c: PLAIN }, { t: 'new', c: FN }, { t: '(', c: PLAIN }, { t: '"my-api"', c: STR }, { t: ');', c: PLAIN }],
    [{ t: '  app.', c: PLAIN }, { t: 'task', c: FN }, { t: '(', c: PLAIN }, { t: '"build"', c: STR }, { t: ', |ctx: &Ctx| {', c: PLAIN }],
    [{ t: '    ctx.', c: PLAIN }, { t: 'run', c: FN }, { t: '(', c: PLAIN }, { t: '"cargo clippy"', c: STR }, { t: ');', c: PLAIN }],
    [{ t: '    ctx.', c: PLAIN }, { t: 'artifact', c: FN }, { t: '(', c: PLAIN }, { t: '"target/release/"', c: STR }, { t: ');', c: PLAIN }],
    [{ t: '  });', c: PLAIN }],
    [{ t: '}', c: PLAIN }],
  ],
};

/* Feature grid with keyboard-key chips */
const features = [
  { keys: ['⌘', 'K'], title: 'Command palette CLI', desc: 'Every Forge command is fuzzy-searchable from one prompt. Tab-complete tasks, flags, and even your own plugin commands.' },
  { keys: ['F', 'B'], title: 'Remote build cache', desc: 'Content-addressed caching shared across your whole team and CI. A teammate built it? You don’t build it again.' },
  { keys: ['F', 'W'], title: 'Instant watch mode', desc: 'Incremental rebuilds land in milliseconds with module-graph diffing — no full restarts, no stale output.' },
  { keys: ['F', 'D'], title: 'One-command deploys', desc: 'forge deploy ships to 14 edge regions with atomic rollbacks. Preview URLs for every branch, automatically.' },
  { keys: ['F', 'T'], title: 'Typed task graph', desc: 'Pipelines are plain TypeScript with full inference. Refactor a task and the compiler tells you what broke — before CI does.' },
  { keys: ['F', 'P'], title: 'Plugin ecosystem', desc: '140+ official and community plugins: linters, test runners, Docker, Terraform, and Shiki-powered docs generation.' },
];

/* Docs hub cards */
const docCards = [
  { tag: 'GUIDE', title: 'Quickstart', desc: 'Install the CLI, scaffold a project, and run your first cached build in under five minutes.', meta: '5 min read' },
  { tag: 'REFERENCE', title: 'CLI reference', desc: 'Every command, flag, and environment variable — generated from source, always in sync with your version.', meta: '42 commands' },
  { tag: 'API', title: 'Plugin API', desc: 'Hooks, lifecycle events, and the typed context object. Build a publishable plugin in an afternoon.', meta: '18 hooks' },
  { tag: 'RECIPES', title: 'CI recipes', desc: 'Drop-in configs for GitHub Actions, GitLab CI, CircleCI, and Buildkite with remote cache pre-wired.', meta: '9 recipes' },
];

/* Changelog timeline */
const changelog = [
  { version: 'v2.4.0', date: 'Jun 03, 2026', tag: 'New', tagColor: '#4ade80', title: 'Remote cache compression', desc: 'Zstandard compression cuts cache transfer sizes by 64% on average. Cold CI builds at Hexbyte dropped from 6m 12s to 2m 40s.' },
  { version: 'v2.3.2', date: 'May 21, 2026', tag: 'Fixed', tagColor: '#f87171', title: 'Watch mode on network drives', desc: 'File watching now falls back to polling on NFS and SMB mounts, fixing missed rebuilds reported by monorepo users on shared runners.' },
  { version: 'v2.3.0', date: 'May 08, 2026', tag: 'Improved', tagColor: '#60a5fa', title: 'Shiki-powered error frames', desc: 'Compiler errors now render syntax-highlighted code frames in the terminal, with the failing expression underlined in amber.' },
  { version: 'v2.2.0', date: 'Apr 17, 2026', tag: 'New', tagColor: '#4ade80', title: 'forge deploy --canary', desc: 'Route a configurable slice of traffic to a new build and auto-rollback on error-rate regression. SLO guards included.' },
];

const plans = [
  { name: 'Solo', price: '$0', period: 'forever', desc: 'For personal projects and open source.', features: ['Unlimited local builds', '5 GB remote cache', '1 deploy target', 'Community plugins', 'Discord support'], cta: 'Install free', highlight: false },
  { name: 'Team', price: '$20', period: '/dev/month', desc: 'For teams who ship every day.', features: ['Everything in Solo', '250 GB shared remote cache', 'Unlimited deploy targets', 'Branch preview URLs', 'CI analytics dashboard', 'Priority email support'], cta: 'Start 30-day trial', highlight: true },
  { name: 'Enterprise', price: 'Custom', period: 'annual', desc: 'For orgs with compliance needs.', features: ['Everything in Team', 'Self-hosted cache & runners', 'SSO / SCIM provisioning', 'Audit logs & SOC 2 report', '99.99% uptime SLA', 'Dedicated solutions engineer'], cta: 'Talk to sales', highlight: false },
];

/* Dev testimonials with GitHub-style handles */
const testimonials = [
  { quote: 'Our monorepo CI went from 14 minutes to 90 seconds the week we adopted Forge. I genuinely thought the remote cache numbers were a bug at first.', name: 'Priya Raman', handle: '@priyabuilds', role: 'Staff Engineer, Vantage', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80' },
  { quote: 'The typed task graph is the killer feature nobody markets enough. I renamed a task, got a compile error in three pipelines, fixed them all before lunch.', name: 'Marcus Webb', handle: '@mwebb_dev', role: 'Platform Lead, Railgun', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80' },
  { quote: 'I replaced 600 lines of YAML and three bash scripts with one forge.config.ts. The Shiki error frames alone make debugging CI feel humane again.', name: 'Elena Vasquez', handle: '@elenav_rs', role: 'OSS Maintainer, tokio-contrib', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80' },
];

/* Blog cards */
const posts = [
  { img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', tag: 'Engineering', date: 'Jun 05, 2026', title: 'How our remote cache hits 92% on cold CI runners', desc: 'A deep dive into content-addressed storage, input hashing, and the tricks that make cache keys stable across machines.' },
  { img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80', tag: 'Release', date: 'Jun 03, 2026', title: 'Forge 2.4: smaller caches, faster cold starts', desc: 'Zstandard compression, smarter eviction, and a new forge cache stats command to see exactly what your team is saving.' },
  { img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', tag: 'Guide', date: 'May 27, 2026', title: 'Migrating a 40-package monorepo to Forge in a day', desc: 'A step-by-step playbook from the Coldfront team: codemods, incremental adoption, and the metrics they tracked along the way.' },
];

const footerCols = [
  { title: 'Product', links: ['CLI', 'Remote cache', 'Deploys', 'Plugins', 'Pricing'] },
  { title: 'Docs', links: ['Quickstart', 'CLI reference', 'Plugin API', 'CI recipes', 'Self-hosting'] },
  { title: 'Resources', links: ['Changelog', 'Blog', 'Status', 'Roadmap', 'Brand kit'] },
  { title: 'Company', links: ['About', 'Careers', 'Security', 'Contact'] },
];

export default function ForgeDevToolsPreview() {
  const [pm, setPm] = useState<Pm>('npm');
  const [lang, setLang] = useState<Lang>('TypeScript');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: BG, color: TEXT, minHeight: '100vh', letterSpacing: '-0.01em' }}>

      {/* ─── 1 · STICKY NAV ─── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(14px)', borderBottom: BORDER }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: AMBER, fontFamily: MONO, fontWeight: 800, fontSize: '15px' }}>⌁</div>
            <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: MONO }}>forge</span>
          </div>
          <nav style={{ display: 'flex', gap: '1.9rem' }}>
            {navLinks.map(l => (
              <a key={l} href="#" style={{ fontSize: '13.5px', color: MUTED, textDecoration: 'none' }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
            <a href="#" style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontFamily: MONO }}>★ 28.4k</a>
            <a href="#" style={{ background: AMBER, color: '#1c1102', borderRadius: '8px', padding: '8px 17px', fontSize: '13.5px', fontWeight: 700, textDecoration: 'none' }}>Get started</a>
          </div>
        </div>
      </header>

      {/* ─── 2 · HERO + TERMINAL + INSTALL BAR ─── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '5.5rem 0 5rem' }}>
        <div style={{ position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '520px', background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.6rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(245,158,11,0.35)', background: 'rgba(245,158,11,0.08)', borderRadius: '9999px', padding: '6px 15px', fontSize: '12.5px', color: AMBER_LIGHT, fontFamily: MONO }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: AMBER, boxShadow: '0 0 10px rgba(245,158,11,0.9)' }} />
              v2.4.0 — remote cache compression is live
            </span>
          </div>
          <h1 style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(2.6rem, 5.6vw, 4.2rem)', fontWeight: 850, letterSpacing: '-0.045em', lineHeight: 1.06 }}>
            The build tool your{' '}
            <span style={{ background: 'linear-gradient(120deg, #fbbf24, #f59e0b 55%, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>terminal deserves</span>
          </h1>
          <p style={{ textAlign: 'center', maxWidth: '580px', margin: '1.4rem auto 0', fontSize: '1.1rem', color: MUTED, lineHeight: 1.7 }}>
            Forge is a typed, cache-everything toolchain for builds, tests, and deploys. One config file in TypeScript, sub-second rebuilds, and CI that finally keeps up with you.
          </p>

          {/* Install command copy bar */}
          <div style={{ maxWidth: '560px', margin: '2.4rem auto 0' }}>
            <div style={{ display: 'flex', gap: '2px', marginBottom: '0', background: CARD, border: BORDER, borderBottom: 'none', borderRadius: '12px 12px 0 0', padding: '6px 6px 0', width: 'fit-content' }}>
              {pms.map(p => (
                <button key={p} onClick={() => setPm(p)} style={{ border: 'none', cursor: 'pointer', borderRadius: '7px 7px 0 0', padding: '7px 16px', fontSize: '12.5px', fontWeight: 700, fontFamily: MONO, background: pm === p ? 'rgba(245,158,11,0.12)' : 'transparent', color: pm === p ? AMBER_LIGHT : FAINT, borderBottom: pm === p ? `2px solid ${AMBER}` : '2px solid transparent' }}>{p}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: CARD, border: BORDER, borderRadius: '0 12px 12px 12px', padding: '14px 18px' }}>
              <code style={{ fontFamily: MONO, fontSize: '14px', color: TEXT }}>
                <span style={{ color: AMBER }}>$ </span>{installCmds[pm]}
              </code>
              <button onClick={handleCopy} style={{ border: '1px solid rgba(245,158,11,0.4)', background: copied ? 'rgba(74,222,128,0.12)' : 'rgba(245,158,11,0.1)', color: copied ? '#4ade80' : AMBER_LIGHT, borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 700, fontFamily: MONO, cursor: 'pointer', flexShrink: 0 }}>
                {copied ? '✓ copied' : 'copy'}
              </button>
            </div>
          </div>

          {/* Terminal window with fake syntax-highlighted CLI output */}
          <div style={{ maxWidth: '780px', margin: '3.2rem auto 0', borderRadius: '14px', border: BORDER, background: '#0c0c0f', overflow: 'hidden', boxShadow: '0 0 80px rgba(245,158,11,0.08), 0 40px 90px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '11px 15px', borderBottom: BORDER, background: CARD }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />)}
              <span style={{ marginLeft: '12px', fontSize: '11.5px', color: FAINT, fontFamily: MONO }}>zsh — my-api — forge v2.4.0</span>
            </div>
            <div style={{ padding: '1.3rem 1.5rem', fontFamily: MONO, fontSize: '13.5px', lineHeight: 1.85, textAlign: 'left' }}>
              {terminalLines.map((line, i) => (
                <div key={i} style={{ minHeight: '1.85em', whiteSpace: 'pre-wrap' }}>
                  {line.map((tok, j) => <span key={j} style={{ color: tok.c }}>{tok.t}</span>)}
                  {i === terminalLines.length - 1 && <span style={{ display: 'inline-block', width: '8px', height: '15px', background: AMBER, marginLeft: '6px', verticalAlign: 'middle' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 · LOGO CLOUD + STATS ─── */}
      <section style={{ borderTop: BORDER, borderBottom: BORDER, padding: '3rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ textAlign: 'center', fontSize: '12px', color: FAINT, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '1.6rem' }}>Powering builds at teams that ship</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '2.8rem' }}>
            {logos.map(l => <span key={l} style={{ fontSize: '16px', fontWeight: 700, color: '#3f3f46', letterSpacing: '-0.02em' }}>{l}</span>)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center', borderLeft: '1px solid rgba(245,158,11,0.22)', padding: '0.3rem 0' }}>
                <div style={{ fontSize: '1.9rem', fontWeight: 800, fontFamily: MONO, color: AMBER_LIGHT, letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontSize: '13px', color: FAINT, marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4 · TABBED CODE EXAMPLES ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3.5rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: AMBER, fontFamily: MONO }}>Config as code</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Pipelines in the language you already speak</h2>
            <p style={{ color: MUTED, fontSize: '1.02rem', lineHeight: 1.75, margin: '0 0 1.6rem' }}>
              No YAML archaeology, no string-typed steps. Forge configs are real programs with autocompletion, refactors, and types — and the same task graph runs identically on your laptop and in CI.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Full type inference across tasks and artifacts', 'Native SDKs for TypeScript, Go, and Rust', 'Shiki-highlighted error frames in your terminal'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#d4d4d8' }}>
                  <span style={{ color: AMBER, fontWeight: 800, fontFamily: MONO }}>▸</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderRadius: '14px', border: BORDER, background: '#0c0c0f', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 14px', borderBottom: BORDER, background: CARD }}>
              {langs.map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ border: 'none', cursor: 'pointer', borderRadius: '7px', padding: '6px 14px', fontSize: '12.5px', fontWeight: 700, fontFamily: MONO, background: lang === l ? 'rgba(245,158,11,0.14)' : 'transparent', color: lang === l ? AMBER_LIGHT : FAINT }}>{l}</button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: DIM, fontFamily: MONO }}>highlighted by shiki</span>
            </div>
            <div style={{ padding: '1.25rem 1.4rem', fontFamily: MONO, fontSize: '13px', lineHeight: 1.9 }}>
              {codeSamples[lang].map((line, i) => (
                <div key={`${lang}-${i}`} style={{ display: 'flex', minHeight: '1.9em' }}>
                  <span style={{ width: '28px', flexShrink: 0, color: '#3f3f46', userSelect: 'none' }}>{i + 1}</span>
                  <span style={{ whiteSpace: 'pre' }}>{line.map((tok, j) => <span key={j} style={{ color: tok.c }}>{tok.t}</span>)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5 · FEATURE GRID (KEYBOARD-KEY STYLING) ─── */}
      <section style={{ padding: '6rem 0', background: '#0c0c0f', borderTop: BORDER, borderBottom: BORDER }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: AMBER, fontFamily: MONO }}>Toolchain</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Everything between save and ship</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>Six tools that used to be six vendors. One binary, one config, one mental model — keyboard-first all the way down.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
            {features.map(f => (
              <div key={f.title} style={{ borderRadius: '14px', border: BORDER, background: CARD, padding: '1.8rem' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '1.2rem' }}>
                  {f.keys.map(k => (
                    <span key={k} style={{ minWidth: '30px', height: '30px', padding: '0 8px', borderRadius: '7px', background: '#09090b', border: '1px solid rgba(255,255,255,0.14)', borderBottom: '3px solid rgba(245,158,11,0.55)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontSize: '13px', fontWeight: 700, color: AMBER_LIGHT }}>{k}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: '16.5px', fontWeight: 700, margin: '0 0 9px', letterSpacing: '-0.02em' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6 · DOCS HUB ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: AMBER, fontFamily: MONO }}>Docs</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 0' }}>Documentation that respects your time</h2>
            </div>
            <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: AMBER_LIGHT, textDecoration: 'none', fontFamily: MONO }}>Browse all docs →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem' }}>
            {docCards.map(d => (
              <a key={d.title} href="#" style={{ textDecoration: 'none', borderRadius: '14px', border: BORDER, background: CARD, padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.12em', color: AMBER, fontFamily: MONO }}>{d.tag}</span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: TEXT, letterSpacing: '-0.02em' }}>{d.title}</h3>
                <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0, flex: 1 }}>{d.desc}</p>
                <span style={{ fontSize: '12px', color: FAINT, fontFamily: MONO }}>{d.meta}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7 · CHANGELOG TIMELINE ─── */}
      <section style={{ padding: '6rem 0', background: '#0c0c0f', borderTop: BORDER, borderBottom: BORDER }}>
        <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.4rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: AMBER, fontFamily: MONO }}>Changelog</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Shipped, not promised</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>A release every two weeks since 2023. Here is what landed most recently — the full history lives in the changelog.</p>
          </div>
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            <div style={{ position: 'absolute', left: '7px', top: '6px', bottom: '6px', width: '2px', background: 'linear-gradient(180deg, rgba(245,158,11,0.5), rgba(245,158,11,0.05))' }} />
            {changelog.map(entry => (
              <div key={entry.version} style={{ position: 'relative', marginBottom: '2rem' }}>
                <div style={{ position: 'absolute', left: '-28px', top: '5px', width: '16px', height: '16px', borderRadius: '50%', background: '#0c0c0f', border: `2px solid ${AMBER}`, boxShadow: '0 0 12px rgba(245,158,11,0.4)' }} />
                <div style={{ borderRadius: '14px', border: BORDER, background: CARD, padding: '1.5rem 1.7rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                    <span style={{ fontFamily: MONO, fontSize: '14px', fontWeight: 800, color: AMBER_LIGHT }}>{entry.version}</span>
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '9999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: entry.tagColor, fontFamily: MONO }}>{entry.tag}</span>
                    <span style={{ fontSize: '12.5px', color: FAINT, fontFamily: MONO, marginLeft: 'auto' }}>{entry.date}</span>
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 7px', letterSpacing: '-0.02em' }}>{entry.title}</h3>
                  <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{entry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8 · PRICING ─── */}
      <section style={{ padding: '6rem 0' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: AMBER, fontFamily: MONO }}>Pricing</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 1rem' }}>Free for hackers. Fair for teams.</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>Every tier includes the full CLI, all official plugins, and unlimited local builds. You only pay for shared cache and deploys.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.3rem', alignItems: 'start' }}>
            {plans.map(plan => (
              <div key={plan.name} style={{ borderRadius: '18px', border: plan.highlight ? '1px solid rgba(245,158,11,0.55)' : BORDER, background: plan.highlight ? 'rgba(245,158,11,0.06)' : CARD, padding: '2rem', position: 'relative', boxShadow: plan.highlight ? '0 0 60px rgba(245,158,11,0.12)' : 'none' }}>
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: AMBER, color: '#1c1102', borderRadius: '9999px', padding: '4px 15px', fontSize: '11.5px', fontWeight: 800, whiteSpace: 'nowrap' }}>Most popular</div>
                )}
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 5px', fontFamily: MONO }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: MUTED, margin: '0 0 1.4rem' }}>{plan.desc}</p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', marginBottom: '1.6rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: MONO, letterSpacing: '-0.05em' }}>{plan.price}</span>
                  <span style={{ fontSize: '13.5px', color: FAINT, marginBottom: '8px' }}>{plan.period}</span>
                </div>
                <a href="#" style={{ display: 'block', textAlign: 'center', borderRadius: '10px', padding: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none', background: plan.highlight ? AMBER : 'rgba(255,255,255,0.06)', color: plan.highlight ? '#1c1102' : TEXT, marginBottom: '1.7rem' }}>{plan.cta}</a>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#d4d4d8' }}>
                      <span style={{ color: AMBER, fontWeight: 800, fontFamily: MONO, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9 · DEV TESTIMONIALS ─── */}
      <section style={{ padding: '6rem 0', background: '#0c0c0f', borderTop: BORDER }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.6rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: AMBER, fontFamily: MONO }}>Developers</span>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 0' }}>Loved by people who read changelogs</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.3rem' }}>
            {testimonials.map(t => (
              <div key={t.handle} style={{ borderRadius: '16px', border: BORDER, background: CARD, padding: '1.9rem', display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(245,158,11,0.45)' }} />
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '12.5px', color: AMBER_LIGHT, margin: 0, fontFamily: MONO }}>{t.handle}</p>
                  </div>
                </div>
                <p style={{ fontSize: '14.5px', color: '#d4d4d8', lineHeight: 1.8, margin: 0, flex: 1 }}>{t.quote}</p>
                <p style={{ fontSize: '12.5px', color: FAINT, margin: 0 }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10 · BLOG ─── */}
      <section style={{ padding: '6rem 0', borderTop: BORDER }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.13em', color: AMBER, fontFamily: MONO }}>Blog</span>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0.8rem 0 0' }}>From the engineering desk</h2>
            </div>
            <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: AMBER_LIGHT, textDecoration: 'none', fontFamily: MONO }}>All posts →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.3rem' }}>
            {posts.map(p => (
              <a key={p.title} href="#" style={{ textDecoration: 'none', borderRadius: '16px', border: BORDER, background: CARD, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={p.img} alt={p.title} style={{ width: '100%', height: '170px', objectFit: 'cover', display: 'block', filter: 'saturate(0.85)' }} />
                <div style={{ padding: '1.4rem 1.5rem 1.6rem', display: 'flex', flexDirection: 'column', gap: '0.7rem', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: AMBER, fontFamily: MONO }}>{p.tag}</span>
                    <span style={{ fontSize: '12px', color: FAINT, fontFamily: MONO }}>{p.date}</span>
                  </div>
                  <h3 style={{ fontSize: '16.5px', fontWeight: 700, margin: 0, color: TEXT, letterSpacing: '-0.02em', lineHeight: 1.4 }}>{p.title}</h3>
                  <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11 · FINAL CTA ─── */}
      <section style={{ padding: '6rem 0', borderTop: BORDER }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ borderRadius: '24px', border: '1px solid rgba(245,158,11,0.3)', background: 'linear-gradient(140deg, rgba(245,158,11,0.12), rgba(245,158,11,0.02) 60%)', padding: '4.2rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '560px', height: '320px', background: 'radial-gradient(ellipse, rgba(245,158,11,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <h2 style={{ fontSize: 'clamp(1.9rem, 4vw, 2.9rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 1rem', position: 'relative' }}>Your next build could take 412ms</h2>
            <p style={{ color: MUTED, fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto 2.4rem', lineHeight: 1.7, position: 'relative' }}>
              One install, one config file, and your slowest pipeline becomes the fast one. Free for solo developers — no credit card, no sales call.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.9rem', flexWrap: 'wrap', position: 'relative' }}>
              <a href="#" style={{ background: AMBER, color: '#1c1102', borderRadius: '10px', padding: '14px 30px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 0 45px rgba(245,158,11,0.35)' }}>Install Forge free</a>
              <a href="#" style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '14px 30px', fontSize: '15px', fontWeight: 600, color: TEXT, textDecoration: 'none', fontFamily: MONO }}>Read the docs</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 12 · FOOTER ─── */}
      <footer style={{ borderTop: BORDER, padding: '3.5rem 0 2.5rem', background: '#0c0c0f' }}>
        <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: AMBER, fontFamily: MONO, fontWeight: 800, fontSize: '13px' }}>⌁</div>
                <span style={{ fontSize: '16px', fontWeight: 800, fontFamily: MONO }}>forge</span>
              </div>
              <p style={{ fontSize: '13px', color: FAINT, lineHeight: 1.7, margin: 0 }}>The typed, cache-everything toolchain for developers who would rather ship than wait. Open core, MIT licensed.</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: FAINT, margin: '0 0 1rem', fontFamily: MONO }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {col.links.map(l => <li key={l}><a href="#" style={{ fontSize: '13.5px', color: '#5b5b63', textDecoration: 'none' }}>{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: BORDER, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: '#3f3f46', margin: 0, fontFamily: MONO }}>© 2026 Forge Systems Inc. — built in 412ms.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['GitHub', 'Twitter', 'Discord'].map(s => <a key={s} href="#" style={{ fontSize: '12.5px', color: '#3f3f46', textDecoration: 'none', fontFamily: MONO }}>{s}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
