export default function SocialIcons() {
  const items = [
    { href: 'https://x.com/ink_mfer', src: '/icons/x.png', label: 'X' },
    { href: 'https://www.instagram.com/ignatevink/', src: '/icons/insta.png', label: 'Instagram' },
    { href: 'https://farcaster.xyz/inkmfer.eth', src: '/icons/fc.png', label: 'Facebook' },
  ];

  return (
    <div
      className="fixed left-3 z-[9999] flex items-center gap-2"
      style={{ top: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}>
      {items.map(({ href, src, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full
                       border border-neutral-600 bg-neutral-700 text-neutral-200
                       backdrop-blur shadow hover:bg-neutral-800/90 transition">
          <img src={src} alt={label} className="h-6 w-6 object-contain" draggable={false} />
        </a>
      ))}
    </div>
  );
}
