export const STORAGE_KEY = 'favourite-photo-ids'

export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

// State is an array of photo ids, e.g. ['0', '10', '24']
export function favouritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return state.includes(action.id)
        ? state.filter((id) => id !== action.id) // already a favourite -> remove
        : [...state, action.id] // not a favourite -> add
    default:
      return state
  }
}

// Runs once, before the first render, to load saved favourites
export function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    // Bad JSON or localStorage blocked -> start with no favourites
    return []
  }
}
