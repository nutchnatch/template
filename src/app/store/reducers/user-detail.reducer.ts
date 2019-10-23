import { createSelector } from 'reselect';
import { UserDetailsFormatizer } from 'app/models/user-details';
import * as userDetailActions from '../actions/user-detail.actions';
import * as sharedActions from '../actions/shared.actions';

import * as UserDetailsState from 'app/store/states/user-detail.state';

export class State extends UserDetailsState.State { }

const initialState: UserDetailsState.State = UserDetailsState.initialState;

/**
 * User Reducer
 *
 * @export
 * @param {any} [state=initialState]
 * @param {userDetailActions.Actions} action
 * @returns {State}
 */
export function reducer(state = initialState, action: userDetailActions.Actions): UserDetailsState.State {

  switch (action.type) {
    case userDetailActions.ActionTypes.PUT_USER_DETAIL:
      state = Object.assign({}, state, {
        loading: false,
        loaded: true,
        userDetail: UserDetailsFormatizer(action.payload),
        httpError: null
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

export const getUserDetail = (state: UserDetailsState.State) => state.userDetail;
export const getUserDetailLoaded = (state: UserDetailsState.State) => state.loaded;
export const getUserDetailisLoading = (state: UserDetailsState.State) => state.loading;
export const getUserName = (state: UserDetailsState.State) => state.userDetail.username;
export const getFirstName = (state: UserDetailsState.State) => state.userDetail.firstName;
export const getLastName = (state?: UserDetailsState.State) => state.userDetail.lastName;
export const getFullUserName: any = createSelector(getFirstName, getLastName, (firstName, lastName) => {
  return `${firstName} ${lastName}`;
});

export const getAuthorities = (state: UserDetailsState.State) => state.userDetail.authorities;

export const getHttpError = (state: UserDetailsState.State) => state.httpError;
export const getErrorStatusText = (state: UserDetailsState.State) => state.httpError.statusText;
export const getErrorStaus = (state: UserDetailsState.State) => state.httpError.status;
export const getError: any = createSelector(getErrorStaus, getErrorStatusText, (status, statusText) => {
  return status ? `code: ${status} - ${statusText}` : null;
});




