import { combineReducers } from 'redux';
import auth from './auth';
import image from './image';
import profile from './profile';
import util from './util';
export default combineReducers({ auth, image, util, profile });
