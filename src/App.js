import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import SignUpPage from "./containers/SignUpPage";
import SignInPage from "./containers/SignInPage";
import ResetPassword from "./containers/ResetPasswordPage";
import HomePage from "./containers/HomePage";
import NotepadPage from "./containers/NotepadPage";
import BlogPage from "./containers/BlogPage";
import ProfilePage from "./containers/ProfilePage";
import PostsPage from "./containers/PostsPage";
import DemoPage from "./containers/DemoPage";
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
                    <Route exact path={ROUTES.HOME}><BlogPage/></Route>
                    <Route exact path={ROUTES.NOTEPAD}><NotepadPage/></Route>
                    <Route path={ROUTES.PROFILE}><ProfilePage/></Route>
                    <Route path={ROUTES.POSTS}><PostsPage/></Route>
                  </> :
                  <>
                    <Route exact path={ROUTES.HOME}> <HomePage/> </Route>
                    <Route path={ROUTES.POSTS}><PostsPage/></Route>
                    <Route exact path={ROUTES.SIGN_IN}> <SignInPage/> </Route>
                    <Route exact path={ROUTES.SIGN_UP}> <SignUpPage/> </Route>
                    <Route exact path={ROUTES.DEMO}> <DemoPage/> </Route>
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
