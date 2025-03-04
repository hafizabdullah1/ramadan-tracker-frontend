import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaMosque } from "react-icons/fa";


export default function LoginForm() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [loginName, setLoginName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${baseUrl}/api/login/`, {
                username: loginName,
                password: loginPassword,
            });

            const { access, refresh, user } = response.data;

            localStorage.setItem("accessToken", access);
            localStorage.setItem("refreshToken", refresh);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success(`Welcome back, ${user.name}!`);
            navigate("/ramadan-calendar");
        } catch (error) {
            toast.error("Invalid credentials, please try again.");
            console.error("Login error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a3a4d] via-[#1a5f6e] to-[#2d8579] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <FaMosque className="h-12 w-12 text-[#ffd700]" />
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-200 mb-4">
                        Continue your spiritual Ramadan journey
                    </p>
                    <div className="bg-[#d4af37]/20 p-4 rounded-lg border border-[#ffd700]/30">
                        <p className="text-sm text-[#ffd700]">
                            🌙 Track your fasting progress<br />
                            📅 Monitor prayer achievements<br />
                            🤲 Connect with believers
                        </p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-[#ffd700] text-sm font-medium mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full p-3 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] placeholder-[#ffd700]/50 text-white"
                            placeholder="Enter your username"
                            value={loginName}
                            onChange={(e) => setLoginName(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-[#ffd700] text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] placeholder-[#ffd700]/50 text-white"
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ffd700] text-[#0a3a4d] py-3 px-4 rounded-lg hover:bg-[#d4af37] transition-colors font-bold shadow-lg"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-3"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Authenticating...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-3">
                    <p className="text-sm text-[#ffd700]/80">
                        Forgot password?{' '}
                        <Link
                            to="/reset-password"
                            className="text-[#ffd700] hover:underline"
                        >
                            Reset here
                        </Link>
                    </p>

                    <p className="text-sm text-[#ffd700]/80">
                        New to Ramadan Tracker?{' '}
                        <Link
                            to="/register"
                            className="text-[#ffd700] hover:underline font-semibold"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

}
