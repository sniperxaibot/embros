// ═══════════════════════════════════════════════════
// EmbrOS — Brand logo (single source of truth)
// Gold spark-star framed by two swirling ribbons (vectorised
// from the brand mark). ForgeMark = icon, ForgeLogo = icon + wordmark.
// ═══════════════════════════════════════════════════

export function ForgeMark({
  className = 'w-7 h-7',
  glow = false,
}: {
  className?: string
  glow?: boolean
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden
      style={glow ? { filter: 'drop-shadow(0 0 9px rgba(240,180,41,0.6))' } : undefined}
    >
      <defs>
        <linearGradient id="embrSwirl" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffe9a8" />
          <stop offset="0.5" stopColor="#f0b429" />
          <stop offset="1" stopColor="#b87d12" />
        </linearGradient>
        <radialGradient id="embrSpark" cx="50%" cy="46%" r="58%">
          <stop stopColor="#fff7da" />
          <stop offset="0.5" stopColor="#ffd24d" />
          <stop offset="1" stopColor="#e0980f" />
        </radialGradient>
      </defs>

      {/* swirling ribbons */}
      <path d="M11.5 7.5C6.4 9.6 5.2 15.4 8.8 19.2" stroke="url(#embrSwirl)" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M20.5 24.5C25.6 22.4 26.8 16.6 23.2 12.8" stroke="url(#embrSwirl)" strokeWidth="2.3" strokeLinecap="round" />

      {/* central spark-star */}
      <path
        d="M16 5.4C16.7 11.9 19.1 14.3 26 16C19.1 17.7 16.7 20.1 16 26.6C15.3 20.1 12.9 17.7 6 16C12.9 14.3 15.3 11.9 16 5.4Z"
        fill="url(#embrSpark)"
      />

      {/* tiny accent spark */}
      <path d="M25 6.4C25.3 8.1 25.7 8.5 27.4 8.8C25.7 9.1 25.3 9.5 25 11.2C24.7 9.5 24.3 9.1 22.6 8.8C24.3 8.5 24.7 8.1 25 6.4Z" fill="#ffe08a" />
    </svg>
  )
}

export function ForgeLogo({
  markClass = 'w-7 h-7',
  wordClass = 'text-lg',
  glow = true,
  className = '',
}: {
  markClass?: string
  wordClass?: string
  glow?: boolean
  className?: string
}) {
  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <ForgeMark className={markClass} glow={glow} />
      <span className={`font-bold tracking-tight font-sans ${wordClass}`}>
        <span className="lowercase text-[var(--text)]">embr</span>
        <span className="bg-gradient-to-b from-[#ffe9a8] to-[#e8a019] bg-clip-text text-transparent">OS</span>
      </span>
    </span>
  )
}
