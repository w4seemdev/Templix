import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';
import { CONTACT_EMAIL } from '../lib/constants';

const topics = [
  'Pre-sale question',
  'Download or access issue',
  'Licensing',
  'Refund request',
  'Bug report',
  'Something else',
] as const;

export default function SupportPage() {
  useSEO({
    title: 'Support',
    description: 'Get help with Templix - contact support, ask a pre-sale question, or report a download issue.',
  });

  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [topic, setTopic]     = useState<string>(topics[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);

  // Submitting unmounts the focused button and navigates to a mail client, so
  // move focus onto the confirmation heading once it renders.
  useEffect(() => {
    if (sent) sentHeadingRef.current?.focus();
  }, [sent]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    // No backend inbox exists yet, so hand off to the user's mail client with a
    // prefilled message rather than silently discarding the request.
    const subject = `[${topic}] Support request from ${name.trim()}`;
    const body = `${message.trim()}\n\n- ${name.trim()} (${email.trim()})`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  };

  const fieldClass =
    'h-11 w-full rounded-lg border border-border-default bg-surface-2 px-3.5 text-[15px] text-text-primary outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text-tertiary focus:border-border-accent focus:shadow-[0_0_0_3px_rgba(124,92,252,0.18)]';

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: '96px', maxWidth: '900px' }}>

        {/* Header */}
        <header className="mb-12 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Support</p>
          <h1 className="headline-fade mx-auto text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[44px]">
            How can we help?
          </h1>
          <p className="mx-auto mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-text-secondary">
            Question before you buy, or trouble with a download? Send us a note and a real person will get back to you.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">

          {/* Contact form */}
          <div className="sheen rounded-2xl border border-border-subtle bg-surface-1 p-6 sm:p-8">
            {sent ? (
              <div role="status" className="flex flex-col items-center py-10 text-center">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-full border border-success-soft-border bg-success-soft">
                  <Check size={22} className="text-success" aria-hidden="true" />
                </div>
                <h2 ref={sentHeadingRef} tabIndex={-1} className="m-0 text-lg font-semibold text-text-primary outline-none">
                  Your message is ready to send
                </h2>
                <p className="m-0 mt-2 max-w-[42ch] text-[15px] leading-[1.6] text-text-secondary">
                  We opened your email app with the details filled in. If nothing happened, email us directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent no-underline hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn btn-secondary mt-6">
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="support-name" className="mb-2 block text-[13px] font-medium text-text-secondary">Your name</label>
                    <input id="support-name" type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="support-email" className="mb-2 block text-[13px] font-medium text-text-secondary">Email</label>
                    <input id="support-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={fieldClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="support-topic" className="mb-2 block text-[13px] font-medium text-text-secondary">Topic</label>
                  <select
                    id="support-topic"
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="h-11 w-full cursor-pointer rounded-lg border border-border-default bg-surface-2 px-3.5 text-[15px] text-text-primary outline-none transition-[border-color,box-shadow] duration-150 focus:border-border-accent focus:shadow-[0_0_0_3px_rgba(124,92,252,0.18)]"
                  >
                    {topics.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="support-message" className="mb-2 block text-[13px] font-medium text-text-secondary">Message</label>
                  <textarea
                    id="support-message"
                    required
                    rows={6}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what's going on…"
                    className="w-full resize-y rounded-lg border border-border-default bg-surface-2 px-3.5 py-3 text-[15px] leading-[1.6] text-text-primary outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-text-tertiary focus:border-border-accent focus:shadow-[0_0_0_3px_rgba(124,92,252,0.18)]"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg self-start">
                  Send message
                  <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          {/* Aside: direct contact + expectations */}
          <aside className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent-soft-border bg-accent-soft text-accent">
                <Mail size={20} aria-hidden="true" />
              </div>
              <h2 className="m-0 mb-1.5 text-[15px] font-semibold text-text-primary">Email us directly</h2>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[14px] font-medium text-accent no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent-soft-border bg-accent-soft text-accent">
                <Clock size={20} aria-hidden="true" />
              </div>
              <h2 className="m-0 mb-1.5 text-[15px] font-semibold text-text-primary">Response time</h2>
              <p className="m-0 text-[14px] leading-[1.6] text-text-secondary">
                We reply within 1-2 business days, Monday to Friday.
              </p>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent-soft-border bg-accent-soft text-accent">
                <MessageSquare size={20} aria-hidden="true" />
              </div>
              <h2 className="m-0 mb-1.5 text-[15px] font-semibold text-text-primary">Quick answers</h2>
              <p className="m-0 mb-3 text-[14px] leading-[1.6] text-text-secondary">
                Many questions about licensing, refunds, and downloads are covered in our FAQ.
              </p>
              <Link to="/faq" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-accent no-underline transition-colors duration-150 hover:text-accent-hover">
                Read the FAQ
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </aside>

        </div>
      </Container>
    </div>
  );
}
