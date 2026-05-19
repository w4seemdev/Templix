import { useSEO } from '../hooks/useSEO';
import Container from '../components/ui/Container';

export default function TermsPage() {
  useSEO({ title: 'Terms of Service', description: 'Read the Templix terms of service.' });

  return (
    <div style={{ minHeight: '100vh', background: '#020617' }}>
      <Container style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '760px' }}>

        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '14px', color: '#475569', marginBottom: '3rem' }}>Last updated: June 2024</p>

        {[
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
