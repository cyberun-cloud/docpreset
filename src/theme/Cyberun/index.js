// Front-page building blocks shared by every Cyberun docs site: a hero, link
// cards and the icons they use. Icons are Lucide outlines (ISC licence),
// inlined so a site needs no icon package.
//
//   import {Hero, Cards, Card} from '@theme/Cyberun';

import React from 'react';
import Link from '@docusaurus/Link';

const ICONS = {
  rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
  office: 'M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18ZM6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  atlas: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20',
  candles: 'M9 5v4M7 9h4v6H7zM9 15v2M17 3v2M15 5h4v8h-4zM17 13v3M3 3v18h18',
  replay: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8M3 3v5h5M10 9l5 3-5 3z',
  paper: 'M3 3v16a2 2 0 0 0 2 2h16M7 16l4-4 4 4 6-6',
  plug: 'M12 22v-5M9 8V2M15 8V2M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z',
  report: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7ZM14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8',
  send: 'M14.54 21.69a.5.5 0 0 0 .94-.03l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.03.94l7.93 3.18a2 2 0 0 1 1.11 1.11zM21.85 2.15 10.91 13.09',
  shield: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
  book: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20',
  chat: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',
  play: 'M6 3l14 9-14 9V3z',
  database: 'M12 2c4.97 0 9 1.34 9 3s-4.03 3-9 3-9-1.34-9-3 4.03-3 9-3zM3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3',
  terminal: 'M4 17l6-6-6-6M12 19h8',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3',
  key: 'M2.59 18.59A2 2 0 0 0 2 20v2h4v-2h2v-2h2l1.41-1.41a6.5 6.5 0 1 0-4-4ZM16.5 7.5h.01',
  zap: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  layers: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  bot: 'M12 8V4H8M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zM2 14h2M20 14h2M15 13v2M9 13v2',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
  orders: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
};

export function Icon({name}) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export function Cards({children}) {
  return <div className="cy-cards">{children}</div>;
}

export function Card({to, icon, title, children}) {
  return (
    <Link className="cy-card" to={to}>
      {icon ? <span className="cy-card__icon"><Icon name={icon} /></span> : null}
      <span className="cy-card__title">{title}</span>
      <span className="cy-card__text">{children}</span>
    </Link>
  );
}

export function Hero({eyebrow, title, children, actions = []}) {
  return (
    <div className="cy-hero">
      {eyebrow ? <div className="cy-hero__eyebrow">{eyebrow}</div> : null}
      <h1 className="cy-hero__title">{title}</h1>
      <div className="cy-hero__lead">{children}</div>
      {actions.length ? (
        <div className="cy-hero__actions">
          {actions.map((a, i) => (
            <Link key={a.to} to={a.to} className={i === 0 ? 'cy-button cy-button--primary' : 'cy-button'}>
              {a.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
