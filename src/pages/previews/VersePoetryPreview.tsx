import { useState } from 'react';

/* ============================================================
   VERSE — Poetry & Lit Magazine Template
   Paper ivory (#fdfbf7) · ink black · burgundy accent (#7f1d1d)
   Georgia/serif throughout · drop caps · thin rules · issue labels
   Next.js + MDX flavor
   ============================================================ */

const IVORY = '#fdfbf7';
const PAPER = '#f7f1e6';
const INK = '#1c1714';
const MUTED = '#6f6557';
const BURGUNDY = '#7f1d1d';
const RULE = '#e4dccb';
const SERIF = "Georgia, 'Times New Roman', serif";

const navLinks = ['Home', 'Poetry', 'Fiction', 'Authors', 'Submit', 'About'];

const featuredPoemLines = [
  'The pears have gone to sugar on the sill,',
  'and somewhere south of sleep my mother hums',
  'a tune the war mislaid — that autumn still',
  'returns to her in baskets, crumb by crumb.',
  '',
  'I write to say the orchard held. The fence',
  'leans east, the way that all our letters lean,',
  'toward whatever country recompense',
  'is paid in: plums, forgiveness, kerosene.',
  '',
  'Come back before the frost. The dog remembers.',
  'The gate sings on its hinge like something asked.',
  'We kept your room. We kept the fire’s embers.',
  'We kept the names of everything you tasked.',
];

type TocGenre = 'All' | 'Poetry' | 'Fiction' | 'Essay';

const tocFilters: TocGenre[] = ['All', 'Poetry', 'Fiction', 'Essay'];

const tocEntries: { num: string; genre: Exclude<TocGenre, 'All'>; title: string; author: string; page: string }[] = [
  { num: '01', genre: 'Poetry', title: 'Letters from the Orchard', author: 'Mariam Haddad', page: '04' },
  { num: '02', genre: 'Poetry', title: 'Three Studies of My Father’s Hands', author: 'Theo Brandt', page: '09' },
  { num: '03', genre: 'Fiction', title: 'The Lighthouse Keeper’s Ledger', author: 'June Okafor', page: '14' },
  { num: '04', genre: 'Essay', title: 'On Reading in Borrowed Languages', author: 'Silvia Marchetti', page: '27' },
  { num: '05', genre: 'Fiction', title: 'A Small Rain over Ohio', author: 'Caleb Nash', page: '33' },
  { num: '06', genre: 'Poetry', title: 'Aubade with Power Lines', author: 'Ruth Achebe', page: '41' },
  { num: '07', genre: 'Essay', title: 'The Margins Are the Country', author: 'Daniel Reyes', page: '46' },
];

const categories = [
  {
    name: 'Poetry',
    count: '214 poems published',
    desc: 'Formal and free verse, sequences, and the occasional sonnet crown. We read for the line that makes the room go quiet.',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
  },
  {
    name: 'Fiction',
    count: '86 stories published',
    desc: 'Short stories and flash under 6,000 words. Quiet domestic ruptures, strange weather, and sentences worth reading twice.',
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
  },
  {
    name: 'Essays & Criticism',
    count: '52 essays published',
    desc: 'Personal essays, translation notes, and criticism that argues generously. The footnote is welcome here; so is the wound.',
    img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
  },
];

const authors = [
  {
    name: 'Mariam Haddad',
    role: 'Poet · Beirut & Marseille',
    bio: 'Author of the collection Salt Atlas (Greenfern, 2024) and a Pushcart Prize nominee. Her poems map orchards, exile, and the post office.',
    credit: 'Featured in Issues 19, 23 & 27',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    name: 'June Okafor',
    role: 'Fiction writer · Lagos',
    bio: 'Her stories have appeared in Granta and The Common. She is finishing a novel about a lighthouse that keeps a ledger of the drowned.',
    credit: 'Featured in Issues 22 & 27',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    name: 'Theo Brandt',
    role: 'Poet · Minneapolis',
    bio: 'A carpenter by trade, he writes in the truck between job sites. Winner of the 2025 Driftless Prize for his sequence on inherited tools.',
    credit: 'Featured in Issues 25 & 27',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Silvia Marchetti',
    role: 'Essayist & translator · Turin',
    bio: 'She translates from Italian and Friulian, and writes essays about reading as a form of border crossing. Her notebook count is at forty-one.',
    credit: 'Featured in Issues 21, 24 & 27',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  },
];

const fictionParagraphs = [
  'he ledger was older than the light. Forty years of weather had been entered into it in four different hands, and Ada’s was the fifth — smaller than the others, as if she did not yet believe she was allowed the full width of the page. October 3rd. Wind NNE, force six. Two trawlers passed south before noon. No letters. She wrote the last two words the way her predecessor had taught her, without self-pity, the way one records barometric pressure.',
  'It was the entries between the entries she had begun to live for. A pressed gull feather at March. A sum of money, crossed out. In the winter of 1961, in the third keeper’s hand, a single line that did not concern the weather at all: He did not come back, and the sea did not apologize. Ada read it every night that first winter, the lamp turning above her like a patient, enormous thought.',
];

const pastIssues = [
  { no: 'No. 27', season: 'Summer 2026', theme: 'The Orchard Issue' },
  { no: 'No. 26', season: 'Spring 2026', theme: 'Letters & Distances' },
  { no: 'No. 25', season: 'Winter 2025', theme: 'Inheritance' },
  { no: 'No. 24', season: 'Autumn 2025', theme: 'Salt & Signal' },
];

type SubmitGenre = 'Poetry' | 'Fiction' | 'Essays';

const submitGenres: SubmitGenre[] = ['Poetry', 'Fiction', 'Essays'];

const guidelines: Record<SubmitGenre, { window: string; length: string; payment: string; response: string; notes: string[] }> = {
  Poetry: {
    window: 'Open March 1 – May 31 and September 1 – November 30',
    length: 'Up to 5 poems in a single document, 10 pages maximum',
    payment: '$50 per poem, plus two contributor copies',
    response: 'We respond within 8 weeks; simultaneous submissions welcome',
    notes: [
      'No previously published work, including personal blogs and social media.',
      'Translations are warmly encouraged — include the original and permissions.',
      'We nominate for the Pushcart Prize and Best New Poets every year.',
    ],
  },
  Fiction: {
    window: 'Open year-round, with a reading pause each August',
    length: 'One story up to 6,000 words, or up to 3 flash pieces',
    payment: '$200 per story, plus two contributor copies',
    response: 'We respond within 12 weeks; please withdraw promptly if placed elsewhere',
    notes: [
      'We publish two stories per issue, so we read slowly and argue often.',
      'Novel excerpts are fine if they stand fully on their own.',
      'Cover letters can be three sentences. We promise we read the story first.',
    ],
  },
  Essays: {
    window: 'Open year-round by pitch or full draft',
    length: 'Essays and criticism between 1,500 and 5,000 words',
    payment: '$150 per essay, plus two contributor copies',
    response: 'Pitches answered within 3 weeks, drafts within 10 weeks',
    notes: [
      'Criticism should be generous: argue with the work, not at it.',
      'Translation notes and marginalia-style pieces are a house favorite.',
      'First-person is welcome when the self is doing real work on the page.',
    ],
  },
};

const footerCols = [
  { title: 'Read', links: ['Current issue', 'Poetry', 'Fiction', 'Essays', 'Archive'] },
  { title: 'Magazine', links: ['About', 'Masthead', 'Submit', 'Prizes', 'Donate'] },
  { title: 'Connect', links: ['Newsletter', 'Events', 'Bookshop', 'RSS'] },
];

export default function VersePoetryPreview() {
  const [tocFilter, setTocFilter] = useState<TocGenre>('All');
  const [submitTab, setSubmitTab] = useState<SubmitGenre>('Poetry');

  const visibleToc = tocFilter === 'All' ? tocEntries : tocEntries.filter(e => e.genre === tocFilter);
  const g = guidelines[submitTab];

  return (
    <div style={{ fontFamily: SERIF, background: IVORY, color: INK, minHeight: '100vh' }}>

      {/* ── Masthead Nav (sticky) ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(253,251,247,0.94)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 0', borderBottom: `1px solid ${RULE}` }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: MUTED }}>Est. 2019 · Issue No. 27</span>
            <span style={{ fontSize: 'clamp(1.7rem, 4vw, 2.3rem)', fontWeight: 700, letterSpacing: '0.04em' }}>
              Verse<span style={{ color: BURGUNDY }}>.</span>
            </span>
            <a href="#" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: BURGUNDY, textDecoration: 'none', borderBottom: `1px solid ${BURGUNDY}`, paddingBottom: '2px' }}>Subscribe</a>
          </div>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '2.2rem', padding: '0.7rem 0', flexWrap: 'wrap' }}>
            {navLinks.map((l, i) => (
              <a key={l} href="#" style={{ fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.14em', color: i === 0 ? BURGUNDY : INK, textDecoration: 'none', fontStyle: i === 0 ? 'italic' : 'normal' }}>{l}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Current Issue Hero with Featured Poem ── */}
      <section style={{ padding: '4.5rem 1.5rem 4rem' }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(300px, 1.1fr)', gap: '3.5rem', alignItems: 'start' }}>
          <div>
            <span style={{ display: 'inline-block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: BURGUNDY, borderTop: `1px solid ${BURGUNDY}`, borderBottom: `1px solid ${BURGUNDY}`, padding: '5px 0', marginBottom: '1.6rem' }}>
              Issue No. 27 · Summer 2026 · The Orchard Issue
            </span>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.01em', margin: '0 0 1.4rem' }}>
              A magazine for the line that makes the room go quiet.
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: MUTED, margin: '0 0 2rem', maxWidth: '440px' }}>
              Verse publishes poetry, short fiction, and essays four times a year, in print and online. Issue No. 27 gathers twenty-three writers around orchards, letters, and the things we keep for people who left.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#" style={{ background: BURGUNDY, color: IVORY, padding: '13px 26px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>Read the issue</a>
              <a href="#" style={{ border: `1px solid ${INK}`, color: INK, padding: '13px 26px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>Order in print — $14</a>
            </div>
          </div>

          <div style={{ background: PAPER, border: `1px solid ${RULE}`, padding: '2.5rem 2.5rem 2.2rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-1px', left: '2.5rem', right: '2.5rem', height: '3px', background: BURGUNDY }} />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: BURGUNDY }}>Featured poem</span>
            <h2 style={{ fontSize: '1.7rem', fontWeight: 700, margin: '0.7rem 0 0.3rem' }}>Letters from the Orchard</h2>
            <p style={{ fontSize: '13.5px', fontStyle: 'italic', color: MUTED, margin: '0 0 1.6rem' }}>Mariam Haddad · page 4</p>
            <div>
              {featuredPoemLines.map((line, i) => (
                line === ''
                  ? <div key={i} style={{ height: '1rem' }} />
                  : <div key={i} style={{ fontSize: '15.5px', fontStyle: 'italic', lineHeight: 1.85, color: INK }}>{line}</div>
              ))}
            </div>
            <p style={{ fontSize: '12.5px', color: MUTED, margin: '1.8rem 0 0', borderTop: `1px solid ${RULE}`, paddingTop: '1rem' }}>
              — from Issue No. 27. Continue reading in print or with a digital subscription.
            </p>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section style={{ padding: '4rem 1.5rem', borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.4rem' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: BURGUNDY }}>Issue No. 27</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, margin: '0.6rem 0 0' }}>Table of Contents</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '2.2rem', flexWrap: 'wrap' }}>
            {tocFilters.map(f => (
              <button
                key={f}
                onClick={() => setTocFilter(f)}
                style={{ fontFamily: SERIF, cursor: 'pointer', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '7px 18px', border: `1px solid ${tocFilter === f ? BURGUNDY : RULE}`, background: tocFilter === f ? BURGUNDY : 'transparent', color: tocFilter === f ? IVORY : MUTED, borderRadius: '999px' }}
              >
                {f}
              </button>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${INK}` }}>
            {visibleToc.map(entry => (
              <div key={entry.num} style={{ display: 'flex', alignItems: 'baseline', gap: '1.2rem', padding: '1.1rem 0.2rem', borderBottom: `1px solid ${RULE}` }}>
                <span style={{ fontSize: '12px', color: BURGUNDY, letterSpacing: '0.1em', flexShrink: 0 }}>{entry.num}</span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: MUTED, width: '64px', flexShrink: 0 }}>{entry.genre}</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{entry.title}</span>
                <span style={{ fontSize: '14px', fontStyle: 'italic', color: MUTED }}>{entry.author}</span>
                <span style={{ flex: 1, borderBottom: `1px dotted ${RULE}`, transform: 'translateY(-4px)' }} />
                <span style={{ fontSize: '13px', color: MUTED, flexShrink: 0 }}>p. {entry.page}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Cards ── */}
      <section style={{ padding: '4.5rem 1.5rem', background: PAPER, borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: BURGUNDY }}>Departments</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, margin: '0.6rem 0 0.8rem' }}>What we publish</h2>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: MUTED, maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Three rooms in the same house — each with its own editor, its own slush pile, and its own stubborn taste.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {categories.map(c => (
              <div key={c.name} style={{ background: IVORY, border: `1px solid ${RULE}` }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block', filter: 'sepia(0.25)' }} />
                <div style={{ padding: '1.6rem 1.6rem 1.8rem' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.18em', color: BURGUNDY }}>{c.count}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0.5rem 0 0.7rem' }}>{c.name}</h3>
                  <p style={{ fontSize: '14px', color: MUTED, lineHeight: 1.75, margin: '0 0 1.2rem' }}>{c.desc}</p>
                  <a href="#" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em', color: INK, textDecoration: 'none', borderBottom: `1px solid ${BURGUNDY}`, paddingBottom: '2px' }}>Browse the archive →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pull-quote Interlude ── */}
      <section style={{ padding: '4.5rem 1.5rem', borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3.4rem', color: BURGUNDY, lineHeight: 0.6, marginBottom: '1.2rem' }}>“</div>
          <p style={{ fontSize: 'clamp(1.4rem, 3.2vw, 1.9rem)', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 1.6rem' }}>
            Verse is the rare magazine that still edits like it matters — every issue reads as if someone stayed up late arguing over the commas, because someone did.
          </p>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.18em', color: MUTED, margin: 0 }}>
            — The Inkwell Review, on Issue No. 25
          </p>
        </div>
      </section>

      {/* ── Fiction Excerpt with Drop Cap ── */}
      <section style={{ padding: '4.5rem 1.5rem', borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.4rem' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: BURGUNDY }}>From the fiction desk · Issue No. 27</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, margin: '0.6rem 0 0.3rem' }}>The Lighthouse Keeper’s Ledger</h2>
            <p style={{ fontSize: '14px', fontStyle: 'italic', color: MUTED, margin: 0 }}>June Okafor · a story in eleven entries</p>
          </div>
          <p style={{ fontSize: '1.06rem', lineHeight: 1.95, margin: '0 0 1.4rem' }}>
            <span style={{ float: 'left', fontSize: '4.3rem', lineHeight: 0.82, fontWeight: 700, color: BURGUNDY, paddingRight: '12px', paddingTop: '5px' }}>T</span>
            {fictionParagraphs[0]}
          </p>
          <p style={{ fontSize: '1.06rem', lineHeight: 1.95, margin: 0 }}>{fictionParagraphs[1]}</p>
          <div style={{ textAlign: 'center', marginTop: '2.4rem' }}>
            <a href="#" style={{ display: 'inline-block', border: `1px solid ${INK}`, color: INK, padding: '12px 28px', fontSize: '12.5px', textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none' }}>Continue reading — p. 14</a>
          </div>
        </div>
      </section>

      {/* ── Author Profiles ── */}
      <section style={{ padding: '4.5rem 1.5rem', background: PAPER, borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: BURGUNDY }}>Contributors</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, margin: '0.6rem 0 0.8rem' }}>The voices of Issue No. 27</h2>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: MUTED, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
              Twenty-three writers from eleven countries. Here are four we keep returning to.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem' }}>
            {authors.map(a => (
              <div key={a.name} style={{ background: IVORY, border: `1px solid ${RULE}`, padding: '2rem 1.6rem', textAlign: 'center' }}>
                <img src={a.img} alt={a.name} style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${BURGUNDY}`, padding: '3px', marginBottom: '1.1rem', filter: 'sepia(0.2)' }} />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.25rem' }}>{a.name}</h3>
                <p style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.14em', color: BURGUNDY, margin: '0 0 0.9rem' }}>{a.role}</p>
                <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.7, margin: '0 0 1rem' }}>{a.bio}</p>
                <p style={{ fontSize: '12px', fontStyle: 'italic', color: MUTED, margin: 0, borderTop: `1px solid ${RULE}`, paddingTop: '0.8rem' }}>{a.credit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Submissions Call with Guideline Tabs ── */}
      <section style={{ padding: '4.5rem 1.5rem', borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.6rem' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: BURGUNDY }}>Submissions</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, margin: '0.6rem 0 0.8rem' }}>Send us the page you almost kept to yourself</h2>
            <p style={{ fontSize: '1rem', fontStyle: 'italic', color: MUTED, maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
              We read every submission — about 4,800 a year — and we pay every contributor. Choose a department to see its guidelines.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', borderBottom: `1px solid ${RULE}`, marginBottom: '2rem' }}>
            {submitGenres.map(sg => (
              <button
                key={sg}
                onClick={() => setSubmitTab(sg)}
                style={{ fontFamily: SERIF, cursor: 'pointer', background: 'transparent', border: 'none', borderBottom: submitTab === sg ? `3px solid ${BURGUNDY}` : '3px solid transparent', padding: '0.8rem 1.8rem', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.14em', color: submitTab === sg ? BURGUNDY : MUTED, fontWeight: submitTab === sg ? 700 : 400 }}
              >
                {sg}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem', marginBottom: '1.8rem' }}>
            {[
              { label: 'Reading window', value: g.window },
              { label: 'Length', value: g.length },
              { label: 'Payment', value: g.payment },
              { label: 'Response time', value: g.response },
            ].map(item => (
              <div key={item.label} style={{ border: `1px solid ${RULE}`, background: PAPER, padding: '1.2rem 1.3rem' }}>
                <div style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.16em', color: BURGUNDY, marginBottom: '0.55rem' }}>{item.label}</div>
                <div style={{ fontSize: '13.5px', lineHeight: 1.65 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.2rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {g.notes.map(note => (
              <li key={note} style={{ display: 'flex', gap: '0.8rem', alignItems: 'baseline', fontSize: '14.5px', fontStyle: 'italic', color: MUTED, lineHeight: 1.7 }}>
                <span style={{ color: BURGUNDY, fontStyle: 'normal' }}>❧</span>
                {note}
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'center' }}>
            <a href="#" style={{ display: 'inline-block', background: BURGUNDY, color: IVORY, padding: '13px 30px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.14em', textDecoration: 'none' }}>Submit via our portal</a>
          </div>
        </div>
      </section>

      {/* ── Past Issues Archive ── */}
      <section style={{ padding: '4rem 1.5rem', background: PAPER, borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.8rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>From the archive</h2>
            <a href="#" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.14em', color: BURGUNDY, textDecoration: 'none' }}>All 27 issues →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.2rem' }}>
            {pastIssues.map(issue => (
              <div key={issue.no} style={{ background: IVORY, border: `1px solid ${RULE}`, borderTop: `3px solid ${BURGUNDY}`, padding: '1.6rem 1.4rem' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.3rem' }}>{issue.no}</div>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: MUTED, marginBottom: '0.7rem' }}>{issue.season}</div>
                <div style={{ fontSize: '14.5px', fontStyle: 'italic', color: BURGUNDY }}>{issue.theme}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Subscribe Band ── */}
      <section style={{ padding: '4.5rem 1.5rem', background: BURGUNDY, color: IVORY }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(253,251,247,0.75)' }}>Subscriptions</span>
          <h2 style={{ fontSize: 'clamp(1.9rem, 4.5vw, 2.6rem)', fontWeight: 700, margin: '0.8rem 0 1rem' }}>Four issues a year. Zero algorithms.</h2>
          <p style={{ fontSize: '1.05rem', fontStyle: 'italic', lineHeight: 1.75, color: 'rgba(253,251,247,0.85)', maxWidth: '520px', margin: '0 auto 2.2rem' }}>
            Print arrives on 80gsm cream stock with a letterpressed cover. Digital arrives quietly, in your inbox, the morning each issue ships.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.4rem' }}>
            <a href="#" style={{ background: IVORY, color: BURGUNDY, padding: '13px 28px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none', fontWeight: 700 }}>Print + digital — $40 / year</a>
            <a href="#" style={{ border: '1px solid rgba(253,251,247,0.6)', color: IVORY, padding: '13px 28px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.12em', textDecoration: 'none' }}>Digital only — $18 / year</a>
          </div>
          <p style={{ fontSize: '12.5px', color: 'rgba(253,251,247,0.65)', margin: 0 }}>
            2,900 subscribers in 34 countries · cancel anytime · student rate available
          </p>
        </div>
      </section>

      {/* ── Footer with Colophon ── */}
      <footer style={{ padding: '3.5rem 1.5rem 2rem', borderTop: `1px solid ${RULE}` }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <div style={{ maxWidth: '300px' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 700, marginBottom: '0.9rem' }}>Verse<span style={{ color: BURGUNDY }}>.</span></div>
              <p style={{ fontSize: '13.5px', color: MUTED, lineHeight: 1.75, margin: '0 0 1rem' }}>
                A quarterly magazine of poetry, fiction, and essays, edited from a small office above a bookshop in Portland, Maine.
              </p>
              <p style={{ fontSize: '12px', fontStyle: 'italic', color: MUTED, lineHeight: 1.7, margin: 0 }}>
                Colophon: set in Caslon and Georgia; printed by Tidewater Press on 80gsm cream stock; the website is built with Next.js and MDX, typeset with the same care as the page.
              </p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: BURGUNDY, margin: '0 0 1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontSize: '14px', color: MUTED, textDecoration: 'none' }}>{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${RULE}`, paddingTop: '1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '12.5px', color: MUTED, margin: 0 }}>© 2026 Verse Magazine · ISSN 2641-8807 · A 501(c)(3) literary nonprofit</p>
            <p style={{ fontSize: '12.5px', fontStyle: 'italic', color: MUTED, margin: 0 }}>“We kept the names of everything you tasked.”</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
