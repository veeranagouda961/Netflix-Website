import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Landing.css'

function Landing() {
    const { user } = useAuth();

    // Requirement 6: "Do not redirect users from landing page". 
    // Wait, typical flow is if logged in, suggest "Go to Home" or something, OR just show landing.
    // The requirement explicitly says "Do not redirect users from landing page (/)".
    // So even if logged in, they see the landing page.

    // However, usually "Sign In" button should change to "Go to Home" if logged in?
    // User request "Only /home should be protected".

    return (
        <div className="landing">
            <header className="landing__header">
                <Link to="/" className="landing__logo">NETFLIX</Link>
                {user ? (
                    <Link to="/home" className="landing__signin-btn">Go to Home</Link>
                ) : (
                    <Link to="/login" className="landing__signin-btn">Sign In</Link>
                )}
            </header>

            <div className="landing__content">
                <h1 className="landing__title">Unlimited movies, TV shows, and more</h1>
                <p className="landing__subtitle">Watch anywhere. Cancel anytime.</p>

                <Link to="/signup" className="landing__cta-btn">
                    Get Started &gt;
                </Link>
            </div>

            <footer className="landing__footer">
                <div className="landing__divider"></div>
                <div className="landing__footer-content">
                    <p>Developed by Veeranagouda | KodNest ID: KODYVB03M</p>
                    <p>© 2026 All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Landing
