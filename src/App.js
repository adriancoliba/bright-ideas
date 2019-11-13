import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import firebase from 'firebase';
import NotepadPage from "./containers/NotepadPage";
import NavigationBar from "./Layout/NavigationBar";
import SignUpPage from "./containers/SignUpPage";
import SignInPage from "./containers/SignInPage";
import ResetPassword from "./containers/ResetPasswordPage";
import HomePage from "./containers/HomePage";
import * as ROUTES from "./constants/routes";

class App extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      user: null,
      isAuthenticated: false,
      registerMessage: '',
      loginMessage: '',
    };
  }

  componentDidMount() {
    this.state.isAuthenticated && this.authListener();
  }

  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: {
            email: user.email,
            id: user.uid,
            displayName: user.displayName,
          }
        });
      } else if (!user) {
        this.setState({ user: null });
      }
    });
  };

  handleChangeUser = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    })
  };

  onSignUp = () => {
    if (this.state.user == null || this.state.user.firstName == null || this.state.user.lastName == null ||
      this.state.user.email == null || this.state.user.password == null) {
      return this.setState({registerMessage: 'Complete all fields.'})
    } else {
      const { firstName, lastName } = this.state.user;
      const fullName = `${firstName ? firstName : ''} ${lastName ? lastName : ''}`;
      const fullNameRegex = new RegExp ('^\\s*([A-Za-z]{1,}([\\.,] |[-\']| ))+[A-Za-z]+\\.?\\s*$');
      if (!fullNameRegex.test(fullName)){
        return this.setState({registerMessage: 'Your FirstName or LastName is badly formatted.'})
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.user.email, this.state.user.password)
          .then( u => {
            firebase.auth().currentUser.updateProfile({
              displayName: `${this.state.user.firstName} ${this.state.user.lastName}`,
            }).then( () => {
              this.setState({user: null})
            }).catch( error => {
              console.log(error)
            });
            this.setState({registerMessage: 'successful'})
          })
          .catch( error => {
            this.setState({registerMessage: error.message})
          });
      }
    }
  };

  onSignIn = () => {
    if (this.state.user == null || this.state.user.email == null || this.state.user.password == null) {
      return this.setState({loginMessage: 'Complete all fields.'})
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.user.email, this.state.user.password)
        .then( u => {
          this.setState({isAuthenticated: true})
          this.authListener();
        })
        .catch( error => {
          this.setState({loginMessage: error.message})
        });
    }
  };

  onSignOut = () => {
    this.setState({ isAuthenticated: false, user: null });
  };

  clearMessage = type => {
    if (type === 'register') { this.setState({registerMessage: false}) }
  };

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.state.isAuthenticated ? <Component {...props} /> : <Redirect to='/signin' />
      )} />
    );

    return(
      <Router>
        <div className="app-container">
          <NavigationBar isAuthenticated={this.state.isAuthenticated} onSignOut={this.onSignOut}/>
          <div>
            <Switch>
              {
                !this.state.isAuthenticated ?
                  <>
                    <Route exact path={ROUTES.HOME}> <HomePage user={this.state.user}/> </Route>
                    <Route exact path={ROUTES.SIGN_IN}>
                      <SignInPage user={this.state.user}
                                handleChangeUser={this.handleChangeUser}
                                onSignIn={this.onSignIn}
                                loginMessage={this.state.loginMessage}
                      />
                    </Route>
                    <Route exact path={ROUTES.SIGN_UP}>
                      <SignUpPage user={this.state.user}
                                handleChangeUser={this.handleChangeUser}
                                onSignUp={this.onSignUp}
                                registerMessage={this.state.registerMessage}
                                clearMessage={this.clearMessage}
                      />
                    </Route>
                    <Route exact path={ROUTES.RESET_PASSWORD}>
                      <ResetPassword user={this.state.user}/>
                    </Route>
                  </> :
                  <>
                    <Redirect to={ROUTES.HOME}/>
                    <Route exact path={ROUTES.HOME}>
                      <NotepadPage isAuthenticated={this.state.isAuthenticated}/>
                    </Route>
                  </>
              }
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
