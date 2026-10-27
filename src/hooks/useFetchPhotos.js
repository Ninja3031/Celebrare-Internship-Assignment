import { useEffect, useState } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Lets us cancel the request if the component unmounts mid-fetch
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })

        // fetch() only throws on network failure, so we check the status ourselves
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (err) {
        // An aborted request is not a real error, so ignore it
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
