import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';

export default function PrivacyPage() {
  useSEO({ title: 'Privacy Policy', description: 'Learn how Templix collects, uses, and protects your personal data.' });

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Container style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '760px' }}>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '14px', color: '#475569', marginBottom: '3rem' }}>Last updated: June 2024</p>

        {[
          {
            title: '1. Information We Collect',
            body: 'We collect information you provide directly to us, such as your name, email address, and payment information when you create an account or purchase a template. We also automatically collect certain technical information when you use our platform, including IP address, browser type, pages visited, and usage patterns.',
          },
          {
            title: '2. How We Use Your Information',
            body: 'We use the information we collect to provide, maintain, and improve our services; process transactions and send related information such as purchase confirmations and invoices; send promotional communications (you may opt out at any time); respond to your comments, questions, and support requests; and monitor and analyze usage and trends to improve your experience.',
          },
          {
            title: '3. Information Sharing',
            body: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our platform, processing payments (Stripe), and delivering services to you — subject to confidentiality agreements. We may also disclose your information when required by law.',
          },
          {
            title: '4. Payment Information',
            body: 'All payment processing is handled securely by Stripe. We do not store your full credit card number, CVV, or other sensitive payment details on our servers. Stripe\'s privacy policy governs the collection and use of your payment information. We only receive confirmation of successful transactions and basic billing information.',
          },
          {
            title: '5. Cookies',
            body: 'We use cookies and similar tracking technologies to improve your experience on our platform, remember your preferences, and collect usage analytics. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some platform features may not function properly without cookies.',
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
            body: 'Depending on your location, you may have the right to access, correct, or delete your personal data; object to or restrict its processing; and receive a portable copy of your data. To exercise any of these rights, please contact us at privacy@templix.com. We will respond within 30 days.',
          },
          {
            title: '9. Children\'s Privacy',
            body: 'Our platform is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately and we will promptly delete it.',
          },
          {
            title: '10. Contact Us',
            body: 'If you have any questions about this Privacy Policy or our data practices, please contact us at privacy@templix.com. We are committed to resolving any concerns you may have about your privacy.',
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
              {section.title}
            </h2>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.85 }}>{section.body}</p>
          </div>
        ))}

      </Container>
    </div>
  );
}
