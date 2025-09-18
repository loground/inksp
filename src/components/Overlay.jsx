import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'OpenSea', href: 'https://opensea.io/collection/meme-park-cards' },
  { label: 'VibeMarket', href: 'https://vibechain.com/market/meme-park-cards?ref=0HTIY11FVZDZ' },
  {
    label: 'Dexscreener',
    href: 'https://dexscreener.com/base/0x5a8e535a71cf042790c4ffefa502d554908ff72a',
  },
];

const ABOUT_TEXT = `Oh boy, here they
come again... friends
 from the meme park!
they're weird, they're dumb,
they're totally broke...
but that's exactly why 
we love 'em.

Just rip the packs, dude,
that's the whole point!`;

export default function UIOverlay() {
  const [linksOpen, setLinksOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      {/* Top-left heading */}
      <div className="pointer-events-none fixed left-3 top-3 lg:left-6 lg:top-6">
        <h1
          className="
            font-sp uppercase tracking-wide text-white text-outline
            text-2xl sm:text-3xl md:text-4xl lg:text-4xl
          ">
          Welcome to MEME PARK!
        </h1>
      </div>

      {/* Bottom-right: Links */}
      <div className="pointer-events-auto fixed right-3 bottom-3 lg:right-6 lg:bottom-6">
        {/* Desktop: inline links */}
        <div className="hidden lg:flex flex-col items-end gap-2">
          {LINKS.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              className="
                font-sp uppercase tracking-wide
                text-white text-xl text-outline-soft transition-[color,transform] duration-150
                hover:text-yellow-300 select-none
              ">
              {l.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile: Links button -> menu */}
        <div className="lg:hidden">
          <motion.button
            type="button"
            onClick={() => setLinksOpen((s) => !s)}
            aria-expanded={linksOpen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="
              font-sp uppercase tracking-wide
              text-white text-outline transition-[color,transform] duration-150
              hover:text-yellow-300 select-none
            ">
            Links
          </motion.button>

          <AnimatePresence>
            {linksOpen && (
              <motion.ul
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 4, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="mt-2 flex w-56 flex-col items-start gap-1">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <motion.a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setLinksOpen(false)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.96 }}
                      className="
                        font-sp uppercase tracking-wide
                        text-white text-outline transition-[color,transform] duration-150
                        hover:text-yellow-300 select-none
                        block
                      ">
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom-left: About */}
      <div className="pointer-events-auto fixed left-3 bottom-3 lg:left-6 lg:bottom-6">
        {/* Desktop: always visible text */}
        <div className="hidden lg:block max-w-sm">
          <p className="font-sp whitespace-pre-line leading-tight tracking-wide text-white text-outline-soft">
            {ABOUT_TEXT}
          </p>
        </div>

        {/* Mobile: About button -> text panel (no bg) */}
        <div className="lg:hidden">
          <motion.button
            type="button"
            onClick={() => setAboutOpen((s) => !s)}
            aria-expanded={aboutOpen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="
              font-sp uppercase tracking-wide
              text-white text-outline transition-[color,transform] duration-150
              hover:text-yellow-300 select-none
            ">
            About
          </motion.button>

          <AnimatePresence>
            {aboutOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 4, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mt-2 max-w-xs">
                <p className="font-sp whitespace-pre-line leading-tight tracking-wide text-white text-outline-soft">
                  {ABOUT_TEXT}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
