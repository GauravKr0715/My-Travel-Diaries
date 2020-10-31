import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import BG from "../images/graphic3.svg";

const RegisterPage = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Register - My Travel Diaries"
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await registerAPI(data);
    console.log(res);
    // console.log(data);
  };

  const registerAPI = async ({ username, email, password }) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('ex-user');
      history.push("/");
    } else {
      setError(data.message);
      setLoading(false);
      // console.log(data.message);
    }
    return data;
  };

  return (
    // <div>
    //   <h1>Please Register to Continue..</h1>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <label htmlFor="username">Username: </label>
    //     <input type="username" name="username" required ref={register} />
    //     <br />
    //     <label htmlFor="email">Email ID: </label>
    //     <input type="email" name="email" required ref={register} />
    //     <br />
    //     <label htmlFor="password">Password: </label>
    //     <input type="password" name="password" required ref={register} />
    //     <br />
    //     <button type="submit">Register!!</button>
    //   </form>
    // </div>
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
              <h3>Register a new account</h3>
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
                  type="username"
                  name="username"
                  placeholder="Username"
                  ref={register}
                />
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
                      Register
                    </button>{" "}
                  </div>
                )}
              </form>
              <></>
              <div className="page-links">
                <a href="/">Login</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
