import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
      user: null,
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  };

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.state.user ? <Component {...props} /> : <Redirect to='/signin' />
      )} />
    );

    return(
      <Router>
        <div className="app-container">
          <NavigationBar/>
          <div>
            <Switch>
              <Route exact path="/"> <HomePage/> </Route>
              <Route exact path="/signin"> <SignInPage/> </Route>
              <Route exact path="/signup"> <SignUpPage/> </Route>
              <PrivateRoute exact path='/app' component={NotepadPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
