import * as layoutActions from '../actions/layout.actions';
import * as sharedActions from '../actions/shared.actions';
import * as LayoutState from 'app/store/states/layout.state';

export class State extends LayoutState.State { }

const initialState: LayoutState.State = LayoutState.initialState;
/**
 * Layout Reducer
 *
 * @export
 * @param {any} [state=initialState]
 * @param {layoutActions.Actions} action
 * @returns {State}
 */
export function reducer(state = initialState, action: layoutActions.Actions): LayoutState.State {
  switch (action.type) {
    case layoutActions.ActionTypes.CLOSE_SIDENAV:
      state = Object.assign({}, state, { showSidenav: false });
      return state;
    case layoutActions.ActionTypes.OPEN_SIDENAV:
      state = Object.assign({}, state, { showSidenav: true });
      return state;
    case layoutActions.ActionTypes.TOGGLE_SIDENAV:
      state = Object.assign({}, state, { showSidenav: action.payload });
      return state;
    case layoutActions.ActionTypes.CURRENT_URL:
      state = Object.assign({}, state, { url: action.payload });
      return state;
    case sharedActions.ActionTypes.INIT_STORE:
      state = Object.assign({}, state, initialState);
      return state;
    default:
      return state;
  }
}

export const getShowSidenav = (state: LayoutState.State) => state.showSidenav;
export const getLayoutUrl = (state: LayoutState.State) => state.url;
