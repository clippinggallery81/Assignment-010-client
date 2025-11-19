import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import signUpImg from "../assets/signup-img.png";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthContext.jsx";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);

  const togglePasswordVisibility = () => setPasswordVisible((p) => !p);
  const passwordRegex = useMemo(() => /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, []);

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (!password) {
      setPasswordError("");
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters and include at least one uppercase and one lowercase letter."
      );
    } else {
      setPasswordError("");
    }
  }, [password, passwordRegex]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters and include at least one uppercase and one lowercase letter."
      );
      return;
    }

    try {
      setLoading(true);
      await createUser(email.trim(), password);

      // Update profile with name and photo
      if (name || photoUrl) {
        await updateUserProfile({
          displayName: name || null,
          photoURL: photoUrl || null,
        });
      }

      if (remember) localStorage.setItem("rememberEmail", email.trim());
      else localStorage.removeItem("rememberEmail");
      toast.success("Successfully signed up!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();

      const googleEmail = result.user?.email;
      if (remember && googleEmail)
        localStorage.setItem("rememberEmail", googleEmail);
      else localStorage.removeItem("rememberEmail");

      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("rememberEmail");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-easing="ease-out-cubic"
      data-aos-duration="2000"
      className="bg-gray-50 shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden w-full max-w-4xl mx-auto my-10"
    >
      <div className="hidden md:block md:w-1/2">
        <img
          src={signUpImg}
          alt="Sign Up Visual"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-2 text-center">Welcome 👋</h2>

        <form onSubmit={handleSignup}>
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="write your name"
              className="border w-full mb-4 border-gray-300 rounded-full focus:outline-none px-5 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Photo URL</label>
            <input
              type="url"
              name="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="write your photo url"
              className="border w-full mb-4 border-gray-300 rounded-full focus:outline-none px-5 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              name="email"
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
                name="password"
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

          <div className="flex items-center gap-2 mb-6 mt-3">
            <input
              id="remember-signup"
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <label htmlFor="remember-signup" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !!passwordError}
            className="w-full btn btn-primary hover:scale-105 text-white font-medium rounded-full py-2 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {passwordError && (
            <p className="text-red-500 text-sm mt-3">{passwordError}</p>
          )}
        </form>

        <div className="divider my-5 text-gray-400 text-sm">or</div>

        <button
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center gap-3 border border-gray-300 rounded-full py-2 hover:bg-gray-100 transition"
          type="button"
          disabled={loading}
        >
          <FcGoogle size={22} />
          <span className="text-sm font-medium">Sign Up with Google</span>
        </button>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
