import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Shared page container - 1240px max width, 24px gutters (16px on
 * small viewports via clamp). Callers may override anything through
 * `style` (spread last so caller wins).
 */
export default function Container({ children, className = '', style }: Props) {
  return (
    <div
      style={{
        maxWidth: '1240px',
        margin: '0 auto',
        paddingLeft: 'clamp(1rem, 3.5vw, 1.5rem)',
        paddingRight: 'clamp(1rem, 3.5vw, 1.5rem)',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
