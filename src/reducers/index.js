import { combineReducers } from 'redux';

import auth from './auth';
import workspace from './workspace';

export const reducers = combineReducers({ auth, workspace });