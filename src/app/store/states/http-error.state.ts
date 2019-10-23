import { RestError } from 'app/models/rest-error';

/**
 * Http Error State
 *
 * @export
 * @class State
 */
export class State {
  httpError: RestError;
}

export const initialState: State = {
  httpError: new RestError
};
