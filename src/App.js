import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Navbar from "./component/Navbar";
import NoteState from "./context/notes/noteState";
import DarkModeState from "./context/dark mode/darkModeState"
import Alert from "./component/Alert";
import LoginSignUp from "./component/Login_SignUp";
function App() {
  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };

  return (
    <>
    <NoteState>
    <DarkModeState>
            <Router>
              <Navbar />
              <Alert alert={alert} />
              <div className="container">
                <Switch>
                  <Route exact path="/">
                    <Home showAlert={showAlert} />
                  </Route>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/login_signup">
                    <LoginSignUp showAlert={showAlert} />
                  </Route>
                </Switch>
              </div>
            </Router>
            </DarkModeState>
          </NoteState>
    </>
  );
}

export default App;
