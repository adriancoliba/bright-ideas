import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from 'firebase';

import NotepadPage from "./containers/NotepadPage";
import NavigationBar from "./Layout/NavigationBar";
import SignUpPage from "./containers/SignUpPage";
import SignInPage from "./containers/SignInPage";
import HomePage from "./containers/HomePage";

class App extends React.PureComponent {
  constructor(){
    super();
    this.state = {

    }
  }


  render() {
    return(
      <Router>
        <div className="app-container">
          <NavigationBar/>
          {/*<NotepadPage/>*/}

            <div>
              <Switch>
                <Route path="/app">
                  <NotepadPage />
                </Route>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/signin">
                  <SignInPage />
                </Route>
                <Route path="/signup">
                  <SignUpPage />
                </Route>
              </Switch>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
