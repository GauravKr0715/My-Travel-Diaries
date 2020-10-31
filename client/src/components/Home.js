import React, { useState, useEffect, useContext } from "react";
import { listLogEntriesNew } from '../API';
import Login from "./Login";
import MapBoxComponent from './MapBoxComponent';
import AppNavbar from './AppNavbar';
import Spinner from "./Spinner";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [token, setToken ] = useState(null);
//   const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Travel Diaries"
    const exUser = localStorage.getItem("ex-user");
    const tokenFromLS = localStorage.getItem("auth-token");
    if (tokenFromLS) {
        setToken(tokenFromLS);
      if (exUser) {
        const user = JSON.parse(exUser);
        setUser(user);
        setLoading(false);
        //   console.log(user._id);
      } else getUser(tokenFromLS);
    } else setLoading(false);
  }, []);

  const getUser = async (tokenFromLS) => {
    const data = await fetch("/api/verifyUser", {
      method: "GET",
      headers: {
        Authorization: tokenFromLS,
      },
    });
    const user = await data.json();
    // console.log(user);
    if (data.status === 200) {
      setUser(user);
      localStorage.setItem("ex-user", JSON.stringify(user));
    }
    setLoading(false);
  };

//   const getLinks = async (token) => {
//     // console.log(id + ":" + token);
//     const logEntries = await listLogEntriesNew(token);
//     // const data = await fetch("http://localhost:5000/api/links", {
//     //   method: "GET",
//     //   headers: {
//     //     Authorization: token,
//     //     id: id,
//     //   },
//     // });
//     // const links = await data.json();
//      console.log(logEntries);
//       setLogEntries(logEntries);
//     setLoading(false);
//   };

  return loading ? (
    <Spinner />
  ) : user ? (
    <>
        <AppNavbar user={user}/>
      {/* <NavBarMine user={user} /> */}
      <MapBoxComponent token = {token}/>
    </>
  ) : (
    <div>
      <Login />
    </div>
  );
};

export default Home;
