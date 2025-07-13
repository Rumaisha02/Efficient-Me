import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Sign-in error:", err);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        // User doesn't exist, ask them to sign up
        alert("User not found. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        alert("Incorrect password. Try again.");
      } else {
        console.error("Email login error:", err);
        alert(err.message);
      }
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in.");
      } else {
        console.error("Email signup error:", err);
        alert(err.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>StudySite</h2>
        <p className="login-subtext">
          Your companion for efficient study management
        </p>

        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={handleEmailLogin}>
            Login with Email
          </button>
          <button className="login-button" onClick={handleEmailSignUp}>
            Sign Up
          </button>
        </form>

        <hr />
        <button className="login-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
