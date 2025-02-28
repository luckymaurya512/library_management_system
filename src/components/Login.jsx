import { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginType, setLoginType] = useState("user"); // "admin" or "user"
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignInToggle = () => setIsSignIn(!isSignIn);

  const handleLoginTypeChange = (type) => setLoginType(type);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      // Register User
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name?.current?.value,
            photoURL: loginType, // Store role in photoURL (Can use Firestore instead)
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, displayName, email, role: photoURL }));
            navigate("/browse");
          }).catch((error) => setErrorMessage(error.message));
        })
        .catch((error) => setErrorMessage(error.code + " - " + error.message));
    } else {
      // Sign In User
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(() => {
          const { uid, email, displayName, photoURL } = auth.currentUser;
          dispatch(addUser({ uid, displayName, email, role: photoURL }));
          navigate("/browse");
        })
        .catch((error) => setErrorMessage(error.code + " - " + error.message));
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Header />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div className="bg-black bg-opacity-75 px-16 py-12 rounded-lg shadow-lg w-4/12">
          <h2 className="text-3xl font-bold text-white mb-6">{isSignIn ? "Sign In" : "Sign Up"}</h2>

          {/* Admin/User Selection */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => handleLoginTypeChange("user")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${loginType === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}`}
            >
              {isSignIn ? "Sign In as User" : "Register as User"}
            </button>
            <button
              onClick={() => handleLoginTypeChange("admin")}
              className={`px-4 py-2 rounded-lg font-semibold transition ${loginType === "admin" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}
            >
              {isSignIn ? "Sign In as Admin" : "Register as Admin"}
            </button>
          </div>

          <form onSubmit={(event) => event.preventDefault()}>
            <div className="mb-4">
              {!isSignIn && (
                <input
                  type="text"
                  id="name"
                  ref={name}
                  className="w-full p-3 rounded text-white focus:outline-none focus:ring-2 mb-4 focus:ring-white bg-transparent border opacity-75"
                  placeholder="Full Name"
                />
              )}
              <input
                type="text"
                id="email"
                ref={email}
                className="w-full p-3 rounded text-white focus:outline-none focus:ring-2 focus:ring-white bg-transparent border opacity-75"
                placeholder="Email or mobile number"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                id="password"
                ref={password}
                placeholder="Password"
                className="w-full p-3 rounded text-white focus:outline-none focus:ring-2 border bg-transparent opacity-75 focus:ring-white"
              />
            </div>
            <p className="text-red-500 text-sm font-semibold mb-4">{errorMessage}</p>
            <button
              type="submit"
              onClick={handleButtonClick}
              className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              {isSignIn ? "Sign In" : `Register as ${loginType === "admin" ? "Admin" : "User"}`}
            </button>
          </form>

          {isSignIn && (
            <>
              <h3 className="text-white text-center mt-2">OR</h3>
              <div className="items-center mt-4">
                <button
                  type="submit"
                  className="w-full bg-[#9ea0a0] opacity-50 text-white p-3 rounded-lg font-semibold hover:bg-[#313434] transition duration-300"
                >
                  <span className="text-white opacity-100">Use a sign-in code</span>
                </button>
                <p className="text-white hover:underline mx-auto text-center mt-2 cursor-pointer hover:text-gray-400">
                  Forgot Password?
                </p>
              </div>
            </>
          )}

          <div className="flex items-center mt-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-400">Remember me</label>
          </div>

          <div className="mt-6 text-left">
            {isSignIn ? (
              <p className="text-gray-400">
                New?{' '}
                <span className="text-white hover:underline cursor-pointer" onClick={handleSignInToggle}>
                  Sign up now.
                </span>
              </p>
            ) : (
              <p className="text-gray-400">
                Already registered?{' '}
                <span className="text-white hover:underline cursor-pointer" onClick={handleSignInToggle}>
                  Sign in now.
                </span>
              </p>
            )}
          </div>

          <div className="mt-6 text-left text-gray-400 text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="#" className="text-blue-500 hover:underline">Learn more.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
