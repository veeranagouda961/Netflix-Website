import { useEffect, useState } from 'react'
import { fetchTrending, IMAGE_BASE_URL } from '../services/tmdb'
import './Hero.css'

function Hero() {
  const [heroMovie, setHeroMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadHero = async () => {
      try {
        setLoading(true)
        setError('')
        const trending = await fetchTrending()
        if (!isMounted) return
        if (trending.length > 0) {
          const randomIndex = Math.floor(Math.random() * trending.length)
          setHeroMovie(trending[randomIndex])
        }
      } catch (err) {
        if (!isMounted) return
        setError('Unable to load banner right now.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadHero()

    return () => {
      isMounted = false
    }
  }, [])

  const backgroundImage =
    heroMovie && (heroMovie.backdrop_path || heroMovie.poster_path)
      ? `${IMAGE_BASE_URL}${heroMovie.backdrop_path || heroMovie.poster_path}`
      : ''

  return (
    <section
      className="hero"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 40%, transparent 100%), url(${backgroundImage})`,
            }
          : undefined
      }
    >
      <div className="hero__content">
        {loading && <p className="hero__status">Loading spotlight...</p>}
        {error && !loading && <p className="hero__status hero__status--error">{error}</p>}
        {!loading && !error && heroMovie && (
          <>
            <h1 className="hero__title">
              {heroMovie.title || heroMovie.name || 'Featured'}
            </h1>
            <p className="hero__description">
              {heroMovie.overview ? `${heroMovie.overview.slice(0, 180)}...` : 'No description available.'}
            </p>
            <div className="hero__actions">
              <button className="hero__button hero__button--primary">Play</button>
              <button className="hero__button hero__button--secondary">My List</button>
            </div>
          </>
        )}
      </div>
      <div className="hero__fade-bottom" />
    </section>
  )
}

export default Hero

