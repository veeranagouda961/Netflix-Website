import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Landing from './pages/Landing'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          ) : (
            <Landing />
          )
        }
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route
        path="/movie/:id"
        element={
          user ? (
            <>
              <Navbar />
              <MovieDetails />
              <Footer />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/search"
        element={
          user ? (
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
