import { RestError } from './../models/rest-error';
import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  PUT_HTTP_ERROR: type('[Http Error] Put Http Error'),
  ERASE_HTTP_ERROR: type('[Http Error] Erase Http Error'),
};


export class PutHttpErrorAction implements Action {
  type = ActionTypes.PUT_HTTP_ERROR;

  /**
   * Creates an instance of PutHttpErrorAction.
   * @param {RestError} payload
   *
   * @memberOf PutHttpErrorAction
   */
  constructor(public payload: RestError) { }

}

export class EraseHttpErrorAction implements Action {
  type = ActionTypes.ERASE_HTTP_ERROR;
  constructor(public payload?) { }

}


export type Actions
  = PutHttpErrorAction
  | EraseHttpErrorAction;
