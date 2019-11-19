import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./Layout/NavigationBar";
import SignUpPage from "./containers/SignUpPage";
import SignInPage from "./containers/SignInPage";
import ResetPassword from "./containers/ResetPasswordPage";
import HomePage from "./containers/HomePage";
import NotepadPage from "./containers/NotepadPage";
import ApplicationPage from "./containers/ApplicationPage";
import ProfilePage from "./containers/ProfilePage";
import * as ROUTES from "./constants/routes";
import { connect } from 'react-redux';
import { checkUserAuth } from './utils/utilities';
import { authListener } from './store/actions/authActions';
class App extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      user: null,
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    if(localStorage.getItem('uid') || this.props.isUserAuthenticated){
      dispatch(authListener())
    }
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
                    <Route exact path={ROUTES.HOME}><ApplicationPage/></Route>
                    <Route exact path={ROUTES.NOTEPAD}><NotepadPage/></Route>
                    <Route path={ROUTES.PROFILE}><ProfilePage/></Route>
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
