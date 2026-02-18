import { useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import Hero from '../components/Hero'
import Row from '../components/Row'
import TrailerModal from '../components/TrailerModal'
import MovieCard from '../components/MovieCard'
import { fetchTrending, fetchTopRated, fetchByGenre, GENRES, searchMovies } from '../services/tmdb'
import './Home.css'

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function Home() {
  const query = useQuery()
  const searchTerm = query.get('query') || ''

  const [selectedMovie, setSelectedMovie] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      setSearchError('')
      setSearchLoading(false)
      return
    }

    let isMounted = true

    const runSearch = async () => {
      try {
        setSearchLoading(true)
        setSearchError('')
        const results = await searchMovies(searchTerm)
        if (!isMounted) return
        setSearchResults(results || [])
      } catch (err) {
        if (!isMounted) return
        setSearchError('Unable to search right now.')
      } finally {
        if (isMounted) setSearchLoading(false)
      }
    }

    runSearch()

    return () => {
      isMounted = false
    }
  }, [searchTerm])

  const showSearch = Boolean(searchTerm)

  return (
    <div className="home">
      <main className="home__main">
        <Hero />

        {showSearch && (
          <section className="home__search-section">
            <h2 className="home__search-title">
              Search results for <span className="home__search-term">{searchTerm}</span>
            </h2>
            {searchLoading && (
              <div className="home__search-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="home__search-skeleton"
                  />
                ))}
              </div>
            )}
            {!searchLoading && searchError && (
              <p className="home__search-status home__search-status--error">{searchError}</p>
            )}
            {!searchLoading && !searchError && (
              <>
                {searchResults.length === 0 ? (
                  <p className="home__search-status">No results found.</p>
                ) : (
                  <div className="home__search-grid">
                    {searchResults.map((movie) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        onClick={setSelectedMovie}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {!showSearch && (
          <div className="home__rows">
            <Row
              title="Trending Now"
              fetchMovies={fetchTrending}
              onMovieClick={setSelectedMovie}
            />
            <Row
              title="Top Rated"
              fetchMovies={fetchTopRated}
              onMovieClick={setSelectedMovie}
            />
            <Row
              title="Action Movies"
              fetchMovies={() => fetchByGenre(GENRES.action)}
              onMovieClick={setSelectedMovie}
            />
            <Row
              title="Comedy Movies"
              fetchMovies={() => fetchByGenre(GENRES.comedy)}
              onMovieClick={setSelectedMovie}
            />
            <Row
              title="Horror Movies"
              fetchMovies={() => fetchByGenre(GENRES.horror)}
              onMovieClick={setSelectedMovie}
            />
          </div>
        )}
      </main>

      {selectedMovie && (
        <TrailerModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  )
}

export default Home

