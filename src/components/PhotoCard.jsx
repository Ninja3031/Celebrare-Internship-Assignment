import { memo } from 'react'

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // download_url is the full-size image (often several MB).
  // This URL asks Picsum for a small 400x500 version instead.
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/500`

  return (
    // Styled like a printed photo: white border, thicker at the bottom
    <article className="bg-white p-3 pb-2 shadow-[0_1px_2px_rgb(42_31_35/0.06),0_18px_36px_-18px_rgb(42_31_35/0.35)] transition-shadow duration-300 group-hover:shadow-[0_1px_2px_rgb(42_31_35/0.06),0_28px_48px_-20px_rgb(42_31_35/0.4)]">
      <img
        src={imageUrl}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        width="400"
        height="500"
        className="aspect-[4/5] w-full bg-blush object-cover"
      />
      <div className="flex items-center justify-between gap-2 pt-3 pl-1">
        <p className="truncate font-display text-lg text-ink italic">{photo.author}</p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-pressed={isFavourite}
          aria-label={
            isFavourite
              ? `Remove ${photo.author}'s photo from favourites`
              : `Add ${photo.author}'s photo to favourites`
          }
          className="rounded-full p-2 transition-colors hover:bg-blush/60 focus-visible:ring-2 focus-visible:ring-wine focus-visible:outline-none"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-6 w-6 ${
              isFavourite
                ? 'animate-pop fill-wine text-wine motion-reduce:animate-none'
                : 'fill-none text-muted'
            }`}
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinejoin="round"
              d="M12 20.5s-7.5-4.6-9.3-9.2C1.5 8 3.6 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.5 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2Z"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

// memo: a card only re-renders when its own photo or favourite status changes
export default memo(PhotoCard)
