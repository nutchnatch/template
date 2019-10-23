import { Link } from 'app/models/breadcrumb';

import * as sharedActions from 'app/store/actions/shared.actions';
import * as appConfigActions from 'app/store/actions/app-config.actions';

import * as AppConfigState from 'app/store/states/app-config.state';


export class State extends AppConfigState.State { }

export const initialState: AppConfigState.State = AppConfigState.initialState;

/**
 *
 * This state is stored in localstorage
 * note: if new property is not appear on redux-devTools, clean yours localstorage ('config' key);
 *
 * @export
 * @param {any} [state=initialState]
 * @param {{ type: 'null'}} [action]
 * @returns {AppConfigState.State}
 */
export function reducer(state = initialState, action?: appConfigActions.Actions): AppConfigState.State {
  switch (action.type) {
    case appConfigActions.ActionTypes.PUT_PAGE_SIZE:
      state = Object.assign({}, state, { pageSize: action.payload });
      return state;
    case appConfigActions.ActionTypes.PUT_SCOPE:
      state = Object.assign({}, state, { scope: action.payload });
      return state;
    default:
      return state;
  }
}

export const getAppConfigParams = (state: AppConfigState.State) => state;
export const getAppConfigLocaleList = (state: State) => state.localeList;
export const getAppConfigDashboard = (state: AppConfigState.State) => state.dashboard;

