import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Container({ children, className = '', style }: Props) {
  return (
    <div
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        ...style,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
