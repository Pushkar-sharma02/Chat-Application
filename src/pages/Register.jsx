import React, { useState } from "react";
import Add from "../images/addAvatar.png"
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth ,storage} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
const Register = () => {
  const [err, setErr] = useState(null); // Change 'false' to 'null' for more flexibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle progress...
        },
        (error) => {
          console.error("Upload Error:", error);
          setErr("Upload failed. Please try again."); // Provide a more specific error message
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.error("Firebase Firestore Error:", error);
            setErr("Firestore error. Please try again.");
          }
        }
      );
    } catch (error) {
      console.error("Registration Error:", error);
      setErr("Registration failed. Please try again.");
    }
  };
    return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo"> ChatterApex</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type = "text" placeholder="Display name"/>
          <input type = "email" placeholder="Email"/>
          <input type = "password" placeholder="Password"/>
          <input style={{display:"none"}} type="file" id = "file"/>
          <label htmlFor="file">
            <img src={Add} alt=""/>
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    );
}

export default Register