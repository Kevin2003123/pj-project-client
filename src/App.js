import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Photos from './components/homePage/Photos';
import UploadAvatar from './components/images/UploadAvatar';
import ProfileView from './components/profile/ProfileView';
import MyProfile from './components/profile/MyProfile';
import { loadUser } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import UploadImage from './components/images/UploadImage';

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
            <Route exact path='/profile/view/:id?' component={ProfileView} />
            <Route exact path='/upload' component={UploadImage} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
