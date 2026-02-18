import { Link } from 'react-router-dom'
import { IMAGE_BASE_URL } from '../services/tmdb'
import './MovieCard.css'

function MovieCard({ movie, onClick }) {
  const title = movie.title || movie.name || 'Untitled'
  const posterPath = movie.poster_path || movie.backdrop_path

  if (!posterPath) return null

  return (
    <article className="movie-card">
      <div
        className="movie-card__image-wrapper"
        onClick={() => onClick && onClick(movie)}
      >
        <img
          className="movie-card__image"
          src={`${IMAGE_BASE_URL}${posterPath}`}
          alt={title}
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <p className="movie-card__title">{title}</p>
          <Link
            to={`/movie/${movie.id}`}
            className="movie-card__more"
            onClick={(e) => e.stopPropagation()}
          >
            More details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default MovieCard

