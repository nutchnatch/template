import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  INIT_STORE: type('[Shared Action] Init Store')
};

export class InitStore implements Action {
  type = ActionTypes.INIT_STORE;

  /**
   * Creates an instance of InitStore.
   * @param {any} [payload]
   *
   * @memberOf InitStore
   */
  constructor(public payload?) { }
}

export type Actions
  = InitStore;
