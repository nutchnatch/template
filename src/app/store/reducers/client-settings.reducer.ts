import * as sharedActions from 'app/store/actions/shared.actions';
import * as appConfigActions from 'app/store/actions/app-config.actions';

import * as clientSettingsState from 'app/store/states/client-settings.state';


export class State extends clientSettingsState.State { }

export const initialState: clientSettingsState.State = clientSettingsState.initialState;

/**
 *
 * This state is stored in localstorage
 * note: if new property is not appear on redux-devTools, clean yours localstorage ('config' key);
 *
 * @export
 * @param {any} [state=initialState]
 * @param {{ type: 'null'}} [action]
 * @returns {AppConfigState.State}
 *
 * NOTE: PROXY to deal to localstorage
 */

export function reducer(state = initialState, action?: appConfigActions.Actions): clientSettingsState.State {
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

export const getClientSettingsPageSize = (state: State) => state.pageSize;
export const getClientSettingsScope = (state: State) => state.scope;

