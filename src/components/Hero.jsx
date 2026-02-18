import { useEffect, useState } from 'react'
import { fetchTrending, IMAGE_BASE_URL } from '../services/tmdb'
import './Hero.css'

function Hero() {
  const [heroMovie, setHeroMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMuted, setIsMuted] = useState(true)

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

  if (loading) return <div className="hero hero--loading">Loading...</div>
  // If error, we might still want to render something or just null, but for now let's keep it simple
  if (error) return <div className="hero hero--error">{error}</div>
  if (!heroMovie) return null

  return (
    <header
      className="hero"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="hero__overlay-gradient" />

      <div className="hero__content">
        <div className="hero__branding">
          <span className="hero__n-logo">N</span>
          <span className="hero__series">S E R I E S</span>
        </div>

        <h1 className="hero__title">
          {heroMovie.title || heroMovie.name || 'Featured'}
        </h1>

        <div className="hero__meta">
          <span className="hero__match">98% Match</span>
          <span className="hero__year">2024</span>
          <span className="hero__seasons">2 Seasons</span>
          <span className="hero__hd">HD</span>
        </div>

        <p className="hero__description">
          {heroMovie.overview ? `${heroMovie.overview.slice(0, 150)}...` : 'No description available.'}
        </p>

        <div className="hero__actions">
          <button className="hero__button hero__button--primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hero__icon">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button className="hero__button hero__button--secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="hero__icon">
              <path d="M11 7h2v2h-2zm0 4h2v6h-2z" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            More Info
          </button>
        </div>
      </div>

      <div className="hero__right-controls">
        <button
          className="hero__mute-button"
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-8-7-8v1.65c3.16.59 5.5 3.39 5.5 6.35zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        <div className="hero__rating-badge">U/A 13+</div>
      </div>

      <div className="hero__fade-bottom" />
    </header>
  )
}

export default Hero

