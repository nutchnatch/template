import { Breadcrumb } from './../models/breadcrumb';
import * as breadcrumbActions from '../actions/breadcrumb.actions';
import * as sharedActions from '../actions/shared.actions';

/**
 * Breadcrumb State
 *
 * @export
 * @class State
 */
export class State {
    currentBreadcrumb: Breadcrumb;
}

const initialState: State = {
    currentBreadcrumb: new Breadcrumb,
};

/**
 * Breadcrumb Reducer
 *
 * @export
 * @param {any} [state=initialState]
 * @param {breadcrumbActions.Actions} action
 * @returns {State}
 */
export function reducer(state = initialState, action: breadcrumbActions.Actions): State {

    switch (action.type) {
        case breadcrumbActions.ActionTypes.PUT_BREADCRUMB:
            state = Object.assign({}, state, { currentBreadcrumb: action.payload });
            return state;
        case breadcrumbActions.ActionTypes.ERASE_BREADCRUMB:
            state = Object.assign({}, state, { initialState });
            return state;
        case sharedActions.ActionTypes.INIT_STORE:
            state = Object.assign({}, state, initialState);
            return state;
        default:
            return state;
    }
}

export const getCurrentBreadcrumb = (state: State) => state.currentBreadcrumb.links;

