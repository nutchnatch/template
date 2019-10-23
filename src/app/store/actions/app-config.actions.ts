import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  PUT_PAGE_SIZE: type('[AppConfig] Put pageSize'),
  PUT_SCOPE: type('[AppConfig] Put scope'),
};

/**
 * Action Update PageSize to store
 *
 * @export
 * @class PutPageSizeAction
 * @implements {Action}
 */
export class PutPageSizeAction implements Action {
  type = ActionTypes.PUT_PAGE_SIZE;
  /**
   * @param {number} [payload]
   * @memberof PutPageSizeAction
   */
  constructor(public payload?: number ) {}
}
/**
 * Action Update Scope to store
 *
 * @export
 * @class PutScopeAction
 * @implements {Action}
 */
export class PutScopeAction implements Action {
  type = ActionTypes.PUT_SCOPE;
  /**
   * Creates an instance of PutScopeAction.
   * @param {string} [payload]
   * @memberof PutScopeAction
   */
  constructor(public payload?: string ) {}
}

export type Actions
= PutPageSizeAction
| PutScopeAction;
