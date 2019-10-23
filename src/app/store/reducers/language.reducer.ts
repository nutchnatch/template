import * as languageActions from '../actions/language.actions';
import * as LanguageState from 'app/store/states/language.state';

export class State extends LanguageState.State { }

const initialState: LanguageState.State = LanguageState.initialState;
/**
 * Language Reducer
 *
 * @export
 * @param {any} [state=initialState]
 * @param {languageActions.Actions} action
 * @returns {State}
 */
export function reducer(state = initialState, action: languageActions.Actions): LanguageState.State {

  switch (action.type) {
    case languageActions.ActionTypes.CHANGE_LANGUAGE:
      return {
        currentLanguage: action.payload
      };

    default:
      return state;
  }
}

export const getCurrentLanguage = (state: LanguageState.State) => state.currentLanguage;
