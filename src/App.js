import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Photos from './components/homePage/Photos';
import UploadAvatar from './components/images/UploadAvatar';
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
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/photos' component={Photos} />
            <Route exact path='/uploadAvatar' component={UploadAvatar} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
