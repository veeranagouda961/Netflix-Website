import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [term, setTerm] = useState('')

  const isHome = location.pathname === '/'

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = term.trim()
    if (!trimmed) return

    navigate(`/search?query=${encodeURIComponent(trimmed)}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <span className="navbar__logo-accent">N</span>
          <span className="navbar__logo-text">Netflix</span>
        </Link>
      </div>
      <nav className="navbar__links">
        <Link
          to="/"
          className={`navbar__link ${isHome ? 'navbar__link--active' : ''}`}
        >
          Home
        </Link>
        <button className="navbar__link">TV Shows</button>
        <button className="navbar__link">Movies</button>
      </nav>
      <div className="navbar__actions">
        <form
          className="navbar__search"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button
            type="submit"
            className="navbar__icon-button"
            aria-label="Search"
          >
            <span className="navbar__icon-search" />
          </button>
        </form>
        <button
          className="navbar__link navbar__logout"
          onClick={handleLogout}
          style={{ marginLeft: '1rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar

