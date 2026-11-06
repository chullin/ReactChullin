import type { ReactNode } from 'react';

type SitePageHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  headingLevel?: 'h1' | 'h2';
};

export default function SitePageHeading({
  eyebrow,
  title,
  description,
  headingLevel: Heading = 'h1',
}: SitePageHeadingProps) {
  return (
    <header className="space-y-5">
      <p className="site-eyebrow">{eyebrow}</p>
      <Heading className={Heading === 'h1' ? 'site-title' : 'text-2xl font-black tracking-tight text-slate-950 sm:text-3xl'}>
        {title}
      </Heading>
      {description ? <p className="site-description">{description}</p> : null}
    </header>
  );
}
