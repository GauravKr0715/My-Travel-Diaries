import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner.gif";
import BG from "../images/graphic3.svg";
import "../styles/bootstrap.min.css";
import "../styles/iofrm-style.css";
import "../styles/iofrm-theme20.css";
// import '../styles/loginForm.css';

const LoginPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Login - My Travel Diaries"
  });

  const onSubmit = async ({ email, password }) => {
    setLoading(true);
    if (localStorage.getItem("ex-user")) localStorage.removeItem("ex-user");
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    console.log(response.status);
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      localStorage.setItem("auth-token", data.token);
      // history.push("/");
      window.location.reload(false);
    } else {
      setError(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="form-body without-side">
      <div className="row">
        <div className="img-holder">
          <div className="bg"></div>
          <div className="info-holder">
            <img src={BG} alt="bg" />
          </div>
        </div>
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <h3>Login to your account</h3>
              <p>
                Record and keep a track of your memorable visits and outings!!
              </p>
              {error ? (
                <p className="alert-message">
                  <b>{error}</b>
                </p>
              ) : (
                <> </>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="E-mail Address"
                  ref={register}
                />
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={register}
                />
                {loading ? (
                  <div className="form-button">
                    <button
                      id="submit"
                      type="submit"
                      className="ibtn"
                      disabled={true}
                      style={{ backgroundColor: "#a9c5b5" }}
                    >
                      <i className="fa fa-cog fa-spin" /> Loading...
                    </button>{" "}
                  </div>
                ) : (
                  <div className="form-button">
                    <button id="submit" type="submit" className="ibtn">
                      Login
                    </button>{" "}
                  </div>
                )}
              </form>
              <></>
              <div className="page-links">
                <a href="/register">Register new account</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // <div>
  //   <h1>Please Log In to Continue..</h1>
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <label htmlFor="email">Email ID: </label>
  //     <input type="email" name="email" required ref={register} />
  //     <br />
  //     <label htmlFor="password">Password: </label>
  //     <input type="password" name="password" required ref={register} />
  //     <br />
  //     <button type="submit">Log IN!!</button>
  //   </form>
  // </div>
  //
};

export default LoginPage;
