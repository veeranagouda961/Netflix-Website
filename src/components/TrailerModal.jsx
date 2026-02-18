import { useEffect, useState } from 'react'
import { fetchMovieVideos } from '../services/tmdb'
import './TrailerModal.css'

/**
 * Full-screen modal that fetches and plays a movie trailer from YouTube.
 */
function TrailerModal({ movie, onClose }) {
  const [videoKey, setVideoKey] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!movie) return

    let isMounted = true

    const loadVideos = async () => {
      try {
        setLoading(true)
        setError('')
        const videos = await fetchMovieVideos(movie.id)
        if (!isMounted) return

        const youTubeVideos = (videos || []).filter((v) => v.site === 'YouTube')
        const trailer =
          youTubeVideos.find((v) => v.type === 'Trailer') ||
          youTubeVideos.find((v) => v.type === 'Teaser') ||
          youTubeVideos[0]

        if (!trailer) {
          setError('Trailer not available for this title.')
          return
        }

        setVideoKey(trailer.key)
      } catch (err) {
        setError('Unable to load trailer right now.')
      } finally {
        setLoading(false)
      }
    }

    loadVideos()

    return () => {
      isMounted = false
    }
  }, [movie])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!movie) return null

  return (
    <div
      className="trailer-modal"
      onClick={onClose}
    >
      <div
        className="trailer-modal__dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="trailer-modal__close"
          onClick={onClose}
          aria-label="Close trailer"
        >
          ×
        </button>
        <h3 className="trailer-modal__title">
          {movie.title || movie.name || 'Trailer'}
        </h3>
        <div className="trailer-modal__body">
          {loading && <div className="trailer-modal__skeleton" />}
          {!loading && error && <p className="trailer-modal__error">{error}</p>}
          {!loading && !error && videoKey && (
            <div className="trailer-modal__frame-wrapper">
              <iframe
                title="Movie trailer"
                src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrailerModal

