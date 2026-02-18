import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchMovieDetails, IMAGE_BASE_URL } from '../services/tmdb'
import TrailerModal from '../components/TrailerModal'
import './MovieDetails.css'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadMovie = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchMovieDetails(id)
        if (!isMounted) return
        setMovie(data)
      } catch (err) {
        if (!isMounted) return
        setError('Unable to load movie details.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadMovie()

    return () => {
      isMounted = false
    }
  }, [id])

  const backdrop =
    movie && (movie.backdrop_path || movie.poster_path)
      ? `${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`
      : ''

  return (
    <div className="details">
      <div
        className="details__hero"
        style={
          backdrop
            ? {
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, transparent 100%), url(${backdrop})`,
              }
            : undefined
        }
      >
        <div className="details__hero-content">
          {loading && <div className="details__hero-skeleton" />}
          {!loading && error && <p className="details__error">{error}</p>}
          {!loading && !error && movie && (
            <>
              <h1 className="details__title">{movie.title || movie.name}</h1>
              <div className="details__meta">
                {movie.vote_average && (
                  <span className="details__badge">Rating: {movie.vote_average.toFixed(1)}</span>
                )}
                {movie.release_date && <span>{movie.release_date}</span>}
                {movie.genres && movie.genres.length > 0 && (
                  <span>{movie.genres.map((g) => g.name).join(', ')}</span>
                )}
              </div>
              <p className="details__overview">{movie.overview || 'No overview available.'}</p>
              <button
                className="details__button"
                onClick={() => setShowTrailer(true)}
              >
                ▶ Play Trailer
              </button>
            </>
          )}
        </div>
      </div>

      {movie && showTrailer && (
        <TrailerModal
          movie={movie}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  )
}

export default MovieDetails

