import React, { useState, useContext} from "react";
import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import classes from "./signup.module.css";
import { auth } from "../../Utility/fireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader} from "react-spinners"
import { DataContext} from "../../Componenets/Dataprovider/DataProvider";
import { Type } from "../../Utility/actiontype";
import { red } from "@mui/material/colors";



function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const [loading, setLoading] = useState({
     signIn: false,
     signUP: false,
   });
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  const navStateData= useLocation();
  console.log(navStateData);




  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      // firebase auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
           setLoading({ ...loading, signUP: false });
          
        });
    } else {
      setLoading({ ...loading, signUP: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
           setLoading({ ...loading, signUP: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
           setLoading({ ...loading, signUP: false });
        });
    }
  };


  return (
    <section className={classes.login}>
      {/* {Logo} */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>

      {/* {form} */}

      <div className={classes.login_container}>
        <h1>sign in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            {/* controlled input */}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="Black" size={15} />
            ) : (
              "sign in"
            )}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* {signup} */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className="classes.login_registerButton"
        >
          {loading.signup ? (
            <ClipLoader color="Black" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error} </small>
        )}
      </div>
    </section>
  );
}

export default Auth;




