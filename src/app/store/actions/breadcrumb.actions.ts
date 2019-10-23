import { Breadcrumb } from 'app/models/breadcrumb';
import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  PUT_BREADCRUMB: type('[Breadcrumb] put Breadcrumb'),
  ERASE_BREADCRUMB: type('[Breadcrumb] erase Breadcrumb')
};


export class PutBreadcrumbAction implements Action {
  type = ActionTypes.PUT_BREADCRUMB;

  /**
   * Creates an instance of PutBreadcrumbAction.
   * @param {Breadcrumb} payload
   *
   * @memberOf PutBreadcrumbAction
   */
  constructor(public payload: Breadcrumb) { }

}

export class EraseBreadcrumbAction implements Action {
  type = ActionTypes.ERASE_BREADCRUMB;

  /**
   * Creates an instance of EraseBreadcrumbAction.
   * @param {any} [payload]
   *
   * @memberOf EraseBreadcrumbAction
   */
  constructor(public payload?) { }

}


export type Actions
  = PutBreadcrumbAction
  | EraseBreadcrumbAction;
