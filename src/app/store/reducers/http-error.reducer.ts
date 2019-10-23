import * as httpErrorActions from '../actions/http-error.actions';
import * as sharedActions from '../actions/shared.actions';
import * as HttpErrorState from 'app/store/states/http-error.state';

export class State extends HttpErrorState.State { }

const initialState: HttpErrorState.State = HttpErrorState.initialState;

export function reducer(state = initialState, action: httpErrorActions.Actions): HttpErrorState.State {

  switch (action.type) {
    case httpErrorActions.ActionTypes.PUT_HTTP_ERROR:
      state = Object.assign({}, state, { httpError: action.payload });
      return state;
    case httpErrorActions.ActionTypes.ERASE_HTTP_ERROR:
      state = Object.assign({}, state, { httpError: null });
      return state;
    case sharedActions.ActionTypes.INIT_STORE:
      state = Object.assign({}, state, initialState );
      return state;
    default:
      return state;
  }
}

export const getHttpError = (state: HttpErrorState.State) => state.httpError;
