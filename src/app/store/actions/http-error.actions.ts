import { Error } from 'app/models/error';
import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  PUT_HTTP_ERROR: type('[Http Error] Put Http Error'),
  PUT_LOADED_ERROR: type('[Http Error] Put Loaded Error'),
  ERASE_HTTP_ERROR: type('[Http Error] Erase Http Error'),
};


export class PutHttpErrorAction implements Action {
  type = ActionTypes.PUT_HTTP_ERROR;

  /**
   * Creates an instance of PutHttpErrorAction.
   * @param {Error} payload
   *
   * @memberOf PutHttpErrorAction
   */
  constructor(public payload: Error) { }

}

export class PutLoadedErrorAction implements Action {
  type = ActionTypes.PUT_LOADED_ERROR;

  /**
   * Creates an instance of PutLoadedErrorAction.
   * @param {boolean} payload
   *
   * @memberOf PutHttpErrorAction
   */
  constructor(public payload: boolean) { }

}

export class EraseHttpErrorAction implements Action {
  type = ActionTypes.ERASE_HTTP_ERROR;
  constructor(public payload?) { }

}


export type Actions
  = PutHttpErrorAction
  | EraseHttpErrorAction
  | PutLoadedErrorAction;
