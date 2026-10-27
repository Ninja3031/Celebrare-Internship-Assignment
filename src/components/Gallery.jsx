import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
  TOGGLE_FAVOURITE,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import Spinner from './Spinner'

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [query, setQuery] = useState('')

  // Third argument = init function. It reads localStorage once, before the
  // first render, so saved favourites are there from the very start.
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)

  // Save to localStorage every time the favourites list changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  // useCallback: keeps the same function between renders, so the memoized
  // SearchBar doesn't re-render when only the favourites change.
  const handleSearch = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

  // Same idea for the heart button: a stable function lets each memoized
  // PhotoCard skip re-rendering unless its own favourite status changed.
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVOURITE, id })
  }, [])

  // useMemo: only re-filter when the photos or the search text change,
  // not on every render (e.g. when a heart is clicked).
  const filteredPhotos = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(search))
  }, [photos, query])

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-5 pt-16 pb-24 sm:px-8 lg:pt-24">
        <header className="mb-16 grid gap-10 md:grid-cols-[1fr_minmax(0,22rem)] md:items-end lg:mb-20">
          <div>
            <h1 className="font-display text-6xl leading-[0.95] font-normal tracking-tight text-ink italic sm:text-7xl lg:text-8xl">
              A gallery of
              <br />
              moments
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed font-light text-muted">
              Thirty photographs from the Picsum collection. Search by photographer and
              keep the ones you love.
            </p>
          </div>
          <SearchBar value={query} onSearch={handleSearch} />
        </header>

        {loading && <Spinner />}

        {error && (
          <div role="alert" className="mx-auto max-w-lg border-y border-wine/30 py-10 text-center">
            <p className="font-display text-2xl text-wine italic">The photos didn't arrive.</p>
            <p className="mt-3 text-muted">
              {error}. Check your internet connection and refresh the page.
            </p>
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="py-32 text-center font-display text-2xl text-muted italic">
            No photographer matches "{query}".
          </p>
        )}

        {!loading && !error && filteredPhotos.length > 0 && (
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo, index) => (
              <li
                key={photo.id}
                // This is a fun little animation that rotates the cards in a pattern, and makes them pop up when hovered. The nth-child selectors are used to create a repeating pattern of rotations for every 4 cards.
                className="group animate-deal transition-[rotate,translate] duration-300 ease-out nth-[4n+1]:-rotate-[1.5deg] nth-[4n+2]:rotate-1 nth-[4n+3]:-rotate-[0.5deg] nth-[4n+4]:rotate-[1.5deg] hover:-translate-y-1.5 hover:rotate-0 focus-within:rotate-0 motion-reduce:animate-none motion-reduce:rotate-0"
              >
                <PhotoCard
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              </li>
            ))}
          </ul>
        )}
      </main>

      <footer className="border-t border-ink/10 py-8 text-center text-sm text-muted">
        Photos from <a href="https://picsum.photos" className="underline decoration-gold underline-offset-4 hover:text-wine">Lorem Picsum</a>
      </footer>
    </div>
  )
}
