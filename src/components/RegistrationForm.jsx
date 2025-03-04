import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { FaMosque } from "react-icons/fa";

const Signup = () => {

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    age: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, name, age, password } = formData;

    // **Form Validation**
    if (!username || !name || !age || !password) {
      toast.error("Please fill all the fields!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/signup/`, {
        username,
        name,
        age: parseInt(age),
        password,
      });

      toast.success("Signup successful!");
      console.log("User signed up:", response.data);
      navigate('/login');

      // Clear form after successful signup
      setFormData({
        username: "",
        name: "",
        age: "",
        password: "",
      });
      setError(null);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Signup failed!";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a3a4d] via-[#1a5f6e] to-[#2d8579] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaMosque className="h-12 w-12 text-[#ffd700]" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-[#ffd700] bg-clip-text text-transparent mb-2">
            Begin Your Spiritual Journey
          </h1>
          <p className="text-gray-200 mb-4">
            Create your account to unlock Ramadan tracking features
          </p>
          <div className="bg-[#d4af37]/20 p-4 rounded-lg border border-[#ffd700]/30">
            <p className="text-sm text-[#ffd700]">
              ✨ Daily Progress Tracking<br />
              🕌 Personalized Prayer Goals<br />
              🤝 Community Connection
            </p>
          </div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {['username', 'name', 'age', 'password'].map((field) => (
            <div key={field}>
              <label className="block text-[#ffd700] text-sm font-medium mb-1 capitalize">
                {field === 'age' ? 'Age' : field.replace('name', ' Name')}
              </label>
              <input
                type={field === 'password' ? 'password' : field === 'age' ? 'number' : 'text'}
                name={field}
                className="w-full p-3 bg-white/5 border border-[#ffd700]/30 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] placeholder-[#ffd700]/50 text-white"
                placeholder={`Enter your ${field === 'username' ? 'username' : field}`}
                value={formData[field]}
                onChange={handleChange}
                disabled={loading}
                min={field === 'age' ? '1' : undefined}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-[#ffd700] text-[#0a3a4d] py-3 px-4 rounded-lg hover:bg-[#d4af37] transition-colors font-bold shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  {/* Loading spinner SVG */}
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-300 text-sm text-center">{error}</p>
        )}

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-[#ffd700]/80">
            By signing up, you agree to our{' '}
            <a href="#" className="hover:text-[#ffd700] underline">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="hover:text-[#ffd700] underline">
              Privacy Policy
            </a>
          </p>

          <p className="text-sm text-[#ffd700]/80">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#ffd700] hover:underline font-semibold"
            >
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
