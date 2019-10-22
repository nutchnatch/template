import * as languageActions from '../actions/language.actions';


/**
 * Language State
 * 
 * @export
 * @class State
 */
export class State {
  currentLanguage: string
}

const initialState: State = {
  currentLanguage: 'en',
};


/**
 * Language Reducer
 * 
 * @export
 * @param {any} [state=initialState] 
 * @param {languageActions.Actions} action 
 * @returns {State} 
 */
export function reducer(state = initialState, action: languageActions.Actions): State {
    
  switch (action.type) {
    case languageActions.ActionTypes.CHANGE_LANGUAGE:
      return {
        currentLanguage: action.payload
      };

    default:
      return state;
  }
}

export const getCurrentLanguage = (state: State) => state.currentLanguage;
