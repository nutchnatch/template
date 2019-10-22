import { HttpError } from './../models/http-error';
import { createSelector } from 'reselect';
import * as userDetailActions from '../actions/user-detail.actions';
import * as sharedActions from '../actions/shared.actions';

import { UserDetails, UserDetailsFormatizer } from '../models/user-details';

/**
 * User State
 * 
 * @export
 * @class State
 */
export class State {
  loaded: boolean;
  loading: boolean;
  httpError: HttpError;
  userDetail: UserDetails;
}


export const initialState: State = {
  loaded: false,
  loading: false,
  httpError: new HttpError,
  userDetail: new UserDetails
};


/**
 * User Reducer
 * 
 * @export
 * @param {any} [state=initialState] 
 * @param {userDetailActions.Actions} action 
 * @returns {State} 
 */
export function reducer(state = initialState, action: userDetailActions.Actions): State {

  switch (action.type) {
    case userDetailActions.ActionTypes.PUT_USER_DETAIL:
      state = Object.assign({}, state, {
        loading: false,
        loaded: true,
        userDetail: UserDetailsFormatizer(action.payload),
        httpError: new HttpError
      });
      return state;
    case userDetailActions.ActionTypes.LOADING_USER_DETAIL:
      state = Object.assign({}, state, { loading: true });
      return state;
    case userDetailActions.ActionTypes.DELETE_USER_DETAIL:
      state = Object.assign({}, state, initialState );
      return state;
    case userDetailActions.ActionTypes.PUT_HTTP_ERROR:
      state = Object.assign({}, state, { loading: false, httpError: action.payload });
      return state;
    case sharedActions.ActionTypes.INIT_STORE:
      state = Object.assign({}, state, initialState );
      return state;
    default:
      return state;
  }
}

export const getUserDetail = (state: State) => state.userDetail;
export const getUserDetailLoaded = (state: State) => state.loaded;
export const getUserDetailisLoading = (state: State) => state.loading;
export const getUserName = (state: State) => state.userDetail.username;
export const getFirstName = (state: State) => state.userDetail.firstName;
export const getLastName = (state?: State) => state.userDetail.lastName;
export const getFullUserName: any = createSelector(getFirstName, getLastName, (firstName, lastName) => {
  return `${firstName} ${lastName}`;
});

export const getAuthorities = (state: State) => state.userDetail.authorities;

export const getHttpError = (state: State) => state.httpError;
export const getErrorStatusText = (state: State) => state.httpError.statusText;
export const getErrorStaus = (state: State) => state.httpError.status;
export const getError: any = createSelector(getErrorStaus, getErrorStatusText, (status, statusText) => {
  return status ? `code: ${status} - ${statusText}` : null;
});




