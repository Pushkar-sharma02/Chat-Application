import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = ()=>{
  const [err, setErr] = useState(null); // Change 'false' to 'null' for more flexibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
      console.error("Registration Error:", error);
      setErr("Registration failed. Please try again.");
    }
  };
    return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo"> ChatterApex</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type = "email" placeholder="Email"/>
          <input type = "password" placeholder="Password"/>
          <button>Sign In</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
    );
}

export default Login