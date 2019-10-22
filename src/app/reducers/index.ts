import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
/*import * as fromRouter from '@ngrx/router-store';*/
import { environment } from '../../environments/environment';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * localStorageSync is another useful library that takes part/all store sync with localstorage
 * Simple syncing between ngrx store and local storage.
 *
 * More: https://github.com/btroncone/ngrx-store-localstorage
 */
import { localStorageSync } from 'ngrx-store-localstorage';


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from './layout.reducer';
import * as fromLanguage from './language.reducer';
import * as fromBreadcrumb from './breadcrumb.reducer';
import * as fromUserDetail from './user-detail.reducer';
import * as fromSample from './sample.reducer';
import * as fromHttpError from './http-error.reducer';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export class State {
  errors: fromHttpError.State;
  layout: fromLayout.State;
  breadcrumb: fromBreadcrumb.State;
  language: fromLanguage.State;
  user: fromUserDetail.State;
  sample: fromSample.State;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const reducers = {
  errors: fromHttpError.reducer,
  layout: fromLayout.reducer,
  breadcrumb: fromBreadcrumb.reducer,
  language : fromLanguage.reducer,
  user: fromUserDetail.reducer,
  sample: fromSample.reducer
};

/**
 * List of part of store to be sync in localstorage. Each key represent a reducer in store.
 * ex: 'language' is the key of language: fromLanguage.State
 */
const syncStoreLocalStorage : Array<string> = [
  'language'
  ]


const developmentReducer: ActionReducer<State> = compose(storeFreeze, localStorageSync( { keys: syncStoreLocalStorage , rehydrate: true } ) , combineReducers)(reducers);
//const productionReducer: ActionReducer<State> = combineReducers(reducers);
const productionReducer: ActionReducer<State> =  compose(localStorageSync( { keys: syncStoreLocalStorage, rehydrate: true }  ) , combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


/**
 * SELECTOR HELP ON THE BOTTOM OF DOCUMENT
 */

/**
 * HTTP ERRORS Reducers
 */
export const getStateErrors = (state: State) => state.errors;
export const getHttpError:any = createSelector(getStateErrors, fromHttpError.getHttpError );

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;
// get show side menu state from a store <boolean> 
export const getShowSidenav:any = createSelector(getLayoutState, fromLayout.getShowSidenav );
export const getLayoutUrl:any = createSelector(getLayoutState, fromLayout.getLayoutUrl );

/**
 * Breadcrumb Reducers
 */
export const getBreadcrumbState = (state: State) => state.breadcrumb;
export const getCurrentBreadcrumb: any = createSelector(getBreadcrumbState, fromBreadcrumb.getCurrentBreadcrumb);

/**
 * Language Reducers
 */
export const getLanguageState = (state: State) => state.language;

/* 
 * get current language from the store <string>
 */
export const getCurrentLanguage:any = createSelector(getLanguageState, fromLanguage.getCurrentLanguage);


/**
 * User Reducers
 */
export const getUserState = (state: State) => state.user;
export const getUserDetailsLoaded: any = createSelector(getUserState, fromUserDetail.getUserDetailLoaded);
export const getUserDetailsIsLoading: any = createSelector(getUserState, fromUserDetail.getUserDetailisLoading);
export const getUserName: any = createSelector(getUserState, fromUserDetail.getUserName);
export const getFullUserName: any = createSelector(getUserState, fromUserDetail.getFullUserName);
export const getUserAuthorities: any = createSelector(getUserState, fromUserDetail.getAuthorities);
//TODO: change name
export const getError: any = createSelector(getUserState, fromUserDetail.getError);


/**
 * Sample Reducers
 */
export const getSampleState = (state: State) => state.sample;
export const getSampleList: any = createSelector(getSampleState, fromSample.getSampleList);
export const getSampleDetail: any = createSelector(getSampleState, fromSample.getSampleSelected);
export const getSampleIsLoading: any = createSelector(getSampleState, fromSample.getSampleListLoading);
export const getSampleIsLoaded: any = createSelector(getSampleState, fromSample.getSampleListLoaded);
export const getSampleError: any = createSelector(getSampleState, fromSample.getSampleHttpError);
export const getSampleSelectedIsLoading: any = createSelector(getSampleState, fromSample.getSampleSelectedLoading);
export const getSampleSelectedIsLoaded: any = createSelector(getSampleState, fromSample.getSampleSelectedLoaded);
export const getSampleSelectedError: any = createSelector(getSampleState, fromSample.getSampleSelectedHttpError);


/**
 * AUX DOCUMENTACTION / HELPER / EXPLANATION ON SELECTORS
 */
/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `books` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 * 	constructor(state$: Observable<State>) {
 * 	  this.languageState$ = state$.select(getLanguageState);
 * 	}
 * }
 * ```
 * export const getLanguageState = (state: State) => state.language;
 */

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function from the reselect library creates
 * very efficient selectors that are memoized and only recompute when arguments change.
 * The created selectors can also be composed together to select different
 * pieces of state.
 *
 * export const getCurrentLanguage:any = createSelector(getLanguageState, fromLanguage.getCurrentLanguage);
 * 
 */
