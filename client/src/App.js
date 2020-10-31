import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {

  return (
    <>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
