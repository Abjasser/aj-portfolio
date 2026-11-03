export default function Arrow({ className = 'arrow' }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h11M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  )
}
