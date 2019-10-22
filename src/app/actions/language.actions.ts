import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  CHANGE_LANGUAGE:   type('[Language] change language')
};


export class ChangeLanguageAction implements Action {
  type = ActionTypes.CHANGE_LANGUAGE;

  /**
   * payload<string> - new language code in string format - ex: 'en', 'pt'.
   * @param {string} payload - new language code ex: 'en', 'pt'.
   */
  constructor(public payload: string) { }

}


export type Actions
    = ChangeLanguageAction;
