import React from 'react'
import app from "../../../firebase"; // immporting firebase file 
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import './Login.css' // 🆕 Import login-specific styles

 function Login() {
  const navigate = useNavigate()

  const handleGoogleSignIn = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error('Error during sign in:', error)
      })
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome to StudySite</h2>
        <p className="login-subtext">Your companion for efficient study management</p>
        <button className="login-button" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
export default Login