import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                // Success: Create valid session
                login('hero-token-' + Date.now(), {
                    id: 1,
                    name: storedUser.name,
                    email: storedUser.email
                });
                navigate('/');
            } else {
                setError('Invalid email or password.');
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="auth-container">
            <div className="login-header">
                <h1>NETFLIX</h1>
            </div>

            <div className="auth-card">
                <h1 className="auth-title">Sign In</h1>
                {error && <div className="auth-error">{error}</div>}
                <form className="auth-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        className="auth-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="auth-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <div className="auth-link">
                    New to Netflix? <Link to="/signup">Sign up now</Link>.
                </div>
            </div>

            <footer className="login-footer">
                <p>Developed by Veeranagouda | KodNest ID: KODYVB03M</p>
                <p>© 2026 All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Login;
