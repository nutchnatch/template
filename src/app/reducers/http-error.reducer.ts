import { RestError } from './../models/rest-error';
import * as httpErrorActions from '../actions/http-error.actions';
import * as sharedActions from '../actions/shared.actions';

/**
 * Http Error State
 *
 * @export
 * @class State
 */
export class State {
  httpError: RestError;
}

const initialState: State = {
  httpError: new RestError
};

export function reducer(state = initialState, action: httpErrorActions.Actions): State {

  switch (action.type) {
    case httpErrorActions.ActionTypes.PUT_HTTP_ERROR:
      state = Object.assign({}, state, { httpError: action.payload });
      return state;
    case httpErrorActions.ActionTypes.ERASE_HTTP_ERROR:
      state = Object.assign({}, state, { httpError: new RestError });
      return state;
    case sharedActions.ActionTypes.INIT_STORE:
      state = Object.assign({}, state, initialState );
      return state;
    default:
      return state;
  }
}

export const getHttpError = (state: State) => state.httpError;
