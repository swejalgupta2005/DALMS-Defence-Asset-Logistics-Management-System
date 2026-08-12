import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight,
} from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            console.log("Login Response:", response.data);

            const token = response.data.data.token;
const user = response.data.data.user;

localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);

            setError(
                error.response?.data?.message ||
                    "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* Left Branding Section */}
            <div className="login-brand-section">

                <div className="login-brand-content">

                    <div className="login-defence-badge">
                        Defence
                    </div>

                    <h1>DALMS</h1>

                    <h2>
                        Asset & Logistics
                        <br />
                        Management System
                    </h2>

                    <p>
                        Secure and centralized management
                        of organizational assets, employees,
                        inventory and maintenance.
                    </p>

                    <div className="login-security-badge">
                        <ShieldCheck size={18} />
                        <span>
                            Secure Government Asset Management
                        </span>
                    </div>

                </div>

                {/* Decorative Illustration */}
                <div className="login-illustration">

                    <div className="illustration-circle circle-one"></div>
                    <div className="illustration-circle circle-two"></div>

                    <div className="illustration-dashboard">

                        <div className="illustration-header">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div className="illustration-content">

                            <div className="illustration-card">
                                <strong>Assets</strong>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="illustration-card">
                                <strong>Inventory</strong>
                                <span></span>
                                <span></span>
                            </div>

                            <div className="illustration-chart">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Right Login Section */}
            <div className="login-form-section">

                <div className="login-form-container">

                    <div className="login-mobile-brand">
                        <div className="login-mobile-logo">
                            Defence
                        </div>

                        <div>
                            <strong>DALMS</strong>
                            <span>Asset Management</span>
                        </div>
                    </div>

                    <div className="login-heading">

                        <span className="login-welcome">
                            Welcome back
                        </span>

                        <h2>Admin Login</h2>

                        <p>
                            Sign in to access your DALMS dashboard.
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="login-form"
                    >

                        {/* Email */}
                        <div className="login-field">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <div className="login-input-wrapper">

                                <Mail size={19} />

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div className="login-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="login-input-wrapper">

                                <Lock size={19} />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            <span>
                                {loading
                                    ? "Signing in..."
                                    : "Sign In"}
                            </span>

                            {!loading && (
                                <ArrowRight size={19} />
                            )}
                        </button>

                    </form>

                    <div className="login-footer">

                        <span>
                            DALMS • Secure Access
                        </span>

                        <span>
                            Authorized Personnel Only
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;