import { memo } from 'react'

function SearchBar({ value, onSearch }) {
  return (
    <div className="relative">
      <label htmlFor="search" className="sr-only">
        Search by photographer
      </label>
      <svg
        className="pointer-events-none absolute top-1/2 left-0 h-5 w-5 -translate-y-1/2 text-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
      <input
        id="search"
        type="search"
        value={value}
        onChange={onSearch}
        placeholder="Search by photographer"
        className="w-full border-b border-ink/25 bg-transparent py-3 pr-2 pl-8 font-display text-xl text-ink italic transition-colors placeholder:text-muted/70 focus:border-wine focus:outline-none"
      />
    </div>
  )
}

// memo: skip re-rendering unless value or onSearch actually changes
export default memo(SearchBar)
