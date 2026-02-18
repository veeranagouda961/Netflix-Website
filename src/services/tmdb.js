import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original'

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
})

export const fetchTrending = async () => {
  const response = await tmdbClient.get('/trending/movie/week')
  return response.data.results || []
}

export const fetchTopRated = async () => {
  const response = await tmdbClient.get('/movie/top_rated')
  return response.data.results || []
}

const withGenre = (genreId) => `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`

export const fetchByGenre = async (genreId) => {
  const response = await tmdbClient.get(withGenre(genreId))
  return response.data.results || []
}

// Search movies by free-text query.
export const searchMovies = async (query) => {
  if (!query) return []
  const response = await tmdbClient.get('/search/movie', {
    params: {
      query,
      include_adult: false,
    },
  })
  return response.data.results || []
}

// Fetch full movie details for details page.
export const fetchMovieDetails = async (id) => {
  const response = await tmdbClient.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits',
    },
  })
  return response.data
}

// Fetch videos (trailers, teasers, etc.) for a movie.
export const fetchMovieVideos = async (id) => {
  const response = await tmdbClient.get(`/movie/${id}/videos`)
  return response.data.results || []
}

export const GENRES = {
  action: 28,
  comedy: 35,
  horror: 27,
}

