import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using Templix, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of any changes.',
  },
  {
    title: '2. License & Usage',
    body: 'Upon purchasing a template, you are granted a non-exclusive, non-transferable license to use the template for one commercial or personal project. Free templates may be used for unlimited personal and commercial projects. You may not resell, redistribute, or sublicense any template as a standalone product.',
  },
  {
    title: '3. Intellectual Property',
    body: 'All templates, designs, and code on Templix are the intellectual property of their respective creators. Purchasing a template grants you a license to use it — it does not transfer ownership. You may not claim the original design as your own or resell it on other marketplaces.',
  },
  {
    title: '4. Payments & Refunds',
    body: 'All purchases are processed securely through Stripe. Prices are listed in USD. Due to the digital nature of our products, all sales are final. However, if a template is fundamentally broken or misrepresented, please contact us within 7 days of purchase and we will review your case.',
  },
  {
    title: '5. Account Responsibilities',
    body: 'You are responsible for maintaining the security of your account credentials. You must not share your account with others or use it for any illegal purposes. We reserve the right to terminate accounts that violate our terms.',
  },
  {
    title: '6. Disclaimer of Warranties',
    body: 'Templates are provided "as is" without warranties of any kind. While we strive for quality, we do not guarantee that templates will meet every specific requirement or be error-free. We are not responsible for any damages resulting from the use of our templates.',
  },
  {
    title: '7. Limitation of Liability',
    body: 'Templix shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform or templates, even if advised of the possibility of such damages. Our total liability shall not exceed the amount paid for the specific template in question.',
  },
  {
    title: '8. Contact',
    body: 'If you have any questions about these Terms of Service, please contact us at legal@templix.com.',
  },
];

export default function TermsPage() {
  useSEO({ title: 'Terms of Service', description: 'Read the Templix terms of service.' });

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: '5rem', paddingBottom: '7rem', maxWidth: '760px' }}>

        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-text">Legal</p>
        <h1 className="m-0 mb-3 text-[clamp(2rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
          Terms of Service
        </h1>
        <p className="m-0 mb-8 font-mono text-[13px] text-text-tertiary" style={{ fontFeatureSettings: '"tnum"' }}>
          Last updated: June 2024
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
          Questions about these terms? Reach us at{' '}
          <a href="mailto:legal@templix.com" className="font-medium text-accent no-underline transition-colors duration-150 hover:text-accent-hover hover:underline">
            legal@templix.com
          </a>
          .
        </p>

      </Container>
    </div>
  );
}
