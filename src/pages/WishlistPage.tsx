import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { useWishlist } from '../hooks/useWishlist';
import { templates } from '../data/templates';
import TemplateCard from '../components/ui/TemplateCard';
import Container from '../components/ui/Container';

const TNUM = { fontFeatureSettings: '"tnum"' } as const;

export default function WishlistPage() {
  useSEO({ title: 'My Wishlist', description: 'Your saved Templix templates.' });
  const { wishlist } = useWishlist();
  const saved = templates.filter(t => wishlist.includes(t.id));

  return (
    <div className="min-h-screen bg-canvas">
      <Container style={{ paddingTop: 'clamp(48px, 8vw, 80px)', paddingBottom: '96px' }}>

        {/* Page header */}
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent">
              Saved
            </p>
            <h1 className="headline-fade text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[44px]">
              My wishlist
            </h1>
            {/* Always mounted, so unhearting a card announces the new count
                instead of silently swapping the grid for the empty state. */}
            <p role="status" aria-live="polite" className="mt-3 text-[15px] text-text-secondary">
              <span className="font-mono font-medium text-text-primary" style={TNUM}>{saved.length}</span>
              {' '}saved template{saved.length !== 1 ? 's' : ''} - kept on this device, ready when you are.
            </p>
          </div>
          {saved.length > 0 && (
            <Link to="/templates" className="btn btn-ghost">
              Continue browsing
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          )}
        </header>

        {saved.length === 0 ? (
          /* Empty state - dashed tile, duotone heart disc */
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border-default px-6 py-24 text-center">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-danger-soft-border bg-danger-soft">
              <Heart size={24} className="text-danger" aria-hidden="true" />
            </div>
            <h2 className="m-0 text-lg font-semibold text-text-primary">
              No saved templates yet
            </h2>
            <p className="m-0 mt-1.5 max-w-[40ch] text-[15px] leading-relaxed text-text-secondary">
              Tap the heart on any template to keep it here for later - no account needed.
            </p>
            <Link to="/templates" className="btn btn-primary mt-7">
              Browse templates
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="hairline mb-6" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 min-[1440px]:grid-cols-4">
              {saved.map(t => <TemplateCard key={t.id} template={t} />)}
            </div>
          </>
        )}

      </Container>
    </div>
  );
}
