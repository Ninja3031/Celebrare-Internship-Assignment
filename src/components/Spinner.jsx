export default function Spinner() {
  return (
    <div role="status" className="flex flex-col items-center gap-5 py-32">
      <div className="h-12 w-12 animate-spin rounded-full border border-blush border-t-wine motion-reduce:animate-none" />
      <span className="font-display text-xl text-muted italic">Developing your photos…</span>
    </div>
  )
}
