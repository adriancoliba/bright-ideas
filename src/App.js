import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NotepadPage from "./containers/NotepadPage";
import NavigationBar from "./Layout/NavigationBar";
import SignUpPage from "./containers/SignUpPage";
import SignInPage from "./containers/SignInPage";
import ResetPassword from "./containers/ResetPasswordPage";
import HomePage from "./containers/HomePage";
import * as ROUTES from "./constants/routes";
import { connect } from 'react-redux';
import { checkUserAuth } from './utils/utilities';

class App extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      user: null,
    };
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.isUserAuthenticated ? <Component {...props} /> : <Redirect to='/signin' />
      )} />
    );

    return(
      <Router>
        <div className="app-container">
          <NavigationBar isUserAuthenticated={this.props.isUserAuthenticated}/>
          <div>
            <Switch>
              {
                checkUserAuth(this.props.isUserAuthenticated) ?
                  <>
                    <Redirect to={ROUTES.HOME}/>
                    <Route exact path={ROUTES.HOME}>
                      <NotepadPage/>
                    </Route>
                  </> :
                  <>
                    <Route exact path={ROUTES.HOME}> <HomePage user={this.props.user}/> </Route>
                    <Route exact path={ROUTES.SIGN_IN}> <SignInPage/> </Route>
                    <Route exact path={ROUTES.SIGN_UP}> <SignUpPage/> </Route>
                    <Route exact path={ROUTES.RESET_PASSWORD}><ResetPassword user={this.state.user}/></Route>
                  </>
              }
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(App);
