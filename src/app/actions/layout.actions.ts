import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  OPEN_SIDENAV:   type('[Layout] Open Sidenav'),
  CLOSE_SIDENAV:  type('[Layout] Close Sidenav'),
  CURRENT_URL: type('[Layout] current url'),
};


export class OpenSidenavAction implements Action {
  type = ActionTypes.OPEN_SIDENAV;
  constructor(public payload? ) {}
}

export class CloseSidenavAction implements Action {
  type = ActionTypes.CLOSE_SIDENAV;
  constructor( public payload?) {}
}

export class CurrentUrlAction implements Action {
  type = ActionTypes.CURRENT_URL;

  constructor( public payload: string) {}
}


export type Actions
  = OpenSidenavAction
  | CloseSidenavAction
  | CurrentUrlAction;
