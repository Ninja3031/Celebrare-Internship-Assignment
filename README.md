# Photo Gallery

A React + Vite + Tailwind CSS app that fetches 30 photos from the Picsum API, shows them in a responsive grid, filters them by author name, and saves favourites to localStorage.

## Run it

```bash
npm install
npm run dev
```

## Where things are

```
src/
  hooks/useFetchPhotos.js        Fetch logic. Returns { photos, loading, error }
  reducers/favouritesReducer.js  Favourites reducer + loading saved favourites
  components/Gallery.jsx         Main component: search, favourites, grid
  components/PhotoCard.jsx       One photo with author name and heart button
  components/SearchBar.jsx       Search input
  components/Spinner.jsx         Loading spinner
```

## How each requirement is met

- **Setup:** React + Vite, styled only with Tailwind CSS v4.
- **Fetching:** `useFetchPhotos` loads photos once, shows a spinner while loading and an error message if the request fails.
- **Grid:** 1 column on mobile, 2 on tablet (`md`), 4 on desktop (`lg`).
- **Search:** filters the already-fetched photos by author as you type. No extra API calls.
- **Favourites:** managed with `useReducer`, saved to localStorage, and loaded back on refresh.
- **useCallback / useMemo:** `useCallback` keeps the search handler stable so the memoized search bar doesn't re-render needlessly; `useMemo` recalculates the filtered list only when the photos or search text change.

## Design

Inspired by wedding stationery: a blush-white paper background, Bodoni Moda italic for headings and names, Jost for body text, and photos styled as slightly tilted prints that straighten on hover. Colours, fonts and animations are defined as Tailwind theme tokens in `src/index.css`.
