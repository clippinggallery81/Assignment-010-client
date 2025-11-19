import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toast } from "react-toastify";
import loginImg from "../assets/login-img.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase/firebase.config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const saved = localStorage.getItem("rememberEmail");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const togglePasswordVisibility = () => setPasswordVisible((p) => !p);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      if (remember) localStorage.setItem("rememberEmail", email.trim());
      else localStorage.removeItem("rememberEmail");
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const targetEmail = email.trim();
    if (!targetEmail) {
      toast.error("Please enter your email above to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, targetEmail);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className="bg-gray-50 shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl mx-auto my-10"
    >
      <div className="hidden md:block md:w-1/2">
        <img
          src={loginImg}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back👋</h2>

        <form onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="write your email"
              className="border w-full mb-4 border-gray-300 rounded-full focus:outline-none px-5 py-3"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="write your password"
                className="w-full border border-gray-300 rounded-full px-5 py-3 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-900 transition"
              >
                {passwordVisible ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center gap-2 mb-6 mt-3">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="checkbox checkbox-sm"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 ml-2">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600"
            >
              Forgot Password?
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full btn btn-primary hover:scale-105 text-white font-medium rounded-full py-2 transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="divider my-5 text-gray-400 text-sm">or</div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 border border-gray-300 rounded-full py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          <span className="text-sm font-medium">Sign In with Google</span>
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-medium hover:underline"
          >
            Create free account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
