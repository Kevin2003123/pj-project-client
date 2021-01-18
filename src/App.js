import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Photos from './components/homePage/Photos';
import UploadAvatar from './components/images/UploadAvatar';
import MyProfile from './components/profile/MyProfile';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Photos} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/uploadAvatar' component={UploadAvatar} />
            <Route exact path='/myProfile' component={MyProfile} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
