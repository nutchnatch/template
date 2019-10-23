import * as breadcrumbActions from '../actions/breadcrumb.actions';
import * as sharedActions from '../actions/shared.actions';
import * as BreadcrumbState from 'app/store/states/breadcrumb.state';

export class State extends BreadcrumbState.State { }

const initialState: BreadcrumbState.State = BreadcrumbState.initialState;

/**
 * Breadcrumb Reducer
 *
 * @export
 * @param {any} [state=initialState]
 * @param {breadcrumbActions.Actions} action
 * @returns {State}
 */
export function reducer(state = initialState, action: breadcrumbActions.Actions): BreadcrumbState.State {

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

export const getCurrentBreadcrumb = (state: BreadcrumbState.State) => state.currentBreadcrumb.links;

