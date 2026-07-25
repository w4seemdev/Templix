import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';
import { CONTACT_EMAIL } from '../lib/constants';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect information you provide directly to us, such as your name, email address, and payment information when you create an account or purchase a template. We also automatically collect certain technical information when you use our platform, including IP address, browser type, pages visited, and usage patterns.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send related information such as purchase confirmations and invoices; respond to your comments, questions, and support requests; and monitor and analyze usage and trends to improve your experience.',
  },
  {
    title: '3. Information Sharing',
    body: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, processing payments (Stripe), and delivering services to you - subject to confidentiality agreements. We may also disclose your information when required by law.',
  },
  {
    title: '4. Payment Information',
    body: 'All payment processing is handled securely by Stripe. We do not store your full credit card number, CVV, or other sensitive payment details on our servers. Stripe\'s privacy policy governs the collection and use of your payment information. We only receive confirmation of successful transactions and basic billing information.',
  },
  {
    title: '5. Cookies and Browser Storage',
    body: 'We use browser storage (localStorage) to keep you signed in and to store your wishlist on your device. We do not run third-party analytics or advertising trackers. Our payment provider, Stripe, may set its own cookies on its checkout pages - see Stripe\'s privacy policy for details.',
  },
  {
    title: '6. Data Retention',
    body: 'We retain your personal information for as long as your account is active or as needed to provide you with our services. You may request deletion of your account and associated data at any time by contacting us. We will respond to your request within 30 days, subject to any legal obligations to retain certain data.',
  },
  {
    title: '7. Security',
    body: 'We take the security of your personal information seriously and implement industry-standard technical and organizational measures to protect it. However, no method of transmission over the internet or electronic storage is 100% secure. We encourage you to use a strong, unique password for your account.',
  },
  {
    title: '8. Your Rights',
    body: `Depending on your location, you may have the right to access, correct, or delete your personal data; object to or restrict its processing; and receive a portable copy of your data. To exercise any of these rights, please contact us at ${CONTACT_EMAIL}. We will respond within 30 days.`,
  },
  {
    title: '9. Children\'s Privacy',
    body: 'Our platform is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will promptly delete it.',
  },
  {
    title: '10. Contact Us',
    body: `If you have any questions about this Privacy Policy or our data practices, please contact us at ${CONTACT_EMAIL}. We are committed to resolving any concerns you may have about your privacy.`,
  },
];

export default function PrivacyPage() {
  useSEO({ title: 'Privacy Policy', description: 'Learn how Templix collects, uses, and protects your personal data.' });

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: '5rem', paddingBottom: '7rem', maxWidth: '760px' }}>

        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Legal</p>
        <h1 className="m-0 mb-3 text-[clamp(2rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
          Privacy Policy
        </h1>
        <p className="m-0 mb-8 font-mono text-[13px] text-text-tertiary" style={{ fontFeatureSettings: '"tnum"' }}>
          Last updated: July 2026
        </p>

        <div className="hairline mb-12" />

        {sections.map(section => (
          <section key={section.title} className="mb-10">
            <h2 className="m-0 mb-3 text-lg font-semibold tracking-[-0.01em] text-text-primary">
              {section.title}
            </h2>
            <p className="m-0 text-[15px] leading-[1.85] text-text-secondary">{section.body}</p>
          </section>
        ))}

        <div className="hairline mt-2 mb-8" />
        <p className="m-0 text-[13px] text-text-tertiary">
          Questions about your data? Reach us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>

      </Container>
    </div>
  );
}
