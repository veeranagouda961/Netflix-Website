import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import './Row.css'

function Row({ title, fetchMovies, onMovieClick }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadMovies = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await fetchMovies()
        if (!isMounted) return
        setMovies(data || [])
      } catch (err) {
        if (!isMounted) return
        setError('Unable to load titles right now.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadMovies()

    return () => {
      isMounted = false
    }
  }, [fetchMovies])

  return (
    <section className="row">
      <h2 className="row__title">{title}</h2>
      {loading && (
        <div className="row__scroller">
          <div className="row__inner">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="row__skeleton-card"
              />
            ))}
          </div>
        </div>
      )}
      {error && !loading && <p className="row__status row__status--error">{error}</p>}
      {!loading && !error && (
        <div className="row__scroller">
          <div className="row__inner">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={onMovieClick}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default Row

