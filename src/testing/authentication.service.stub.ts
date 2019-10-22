import { UserDetails } from './../app/models/user-details';
import { Credentials } from './../app/models/credentials';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';


import { Store } from '@ngrx/store';
import * as userDetailsAction from './../app/actions/user-detail.actions';
import * as fromRoot from './../app/reducers';


export const createFakeuserDetailData = () => {
  let userDetail = new UserDetails();
  userDetail.firstName = 'fake first name';
  userDetail.lastName = 'fake last name';
  userDetail.username = 'fake user name '
  return userDetail;
};

@Injectable()
export class AuthenticationServiceStub {

  constructor(private store: Store<fromRoot.State>) { }

  authenticate(credentials?: Credentials): Observable<UserDetails> {
      
      const observable = new Observable<UserDetails>(
        (subscriber: Subscriber<UserDetails>) => {   
          try {
            subscriber.next(createFakeuserDetailData());
            subscriber.complete();
            /*
            * FIXME:
            * JUST IN THIS CASE, ALL COMPONENTS DOESN'T KNOW THE SERVICE LAYER. ALL COMPONENTS 'SEE' THE EFFECT LAYER - 
            * AUTHENTICATION SERVICES IS THE ONLY SERVICES INJECTED ON COMPONENTS (LOGIN-UI-COMPONENT)
            * SO WE SIMULATE THE LOGIN ACTION
            */
            this.store.dispatch(new userDetailsAction.PutUserDetail(createFakeuserDetailData()))
            
          } catch (error) {
            subscriber.error(error);
          }
        }
      );
      // console.log(observable instanceof Observable<UserDetails> );
      return observable;
  }

  logout(): Observable<boolean> {
      console.log('services'); 
      const observable = new Observable<boolean>(
        (subscriber: Subscriber<boolean>) => {
         
          try {
            subscriber.next(true);
            subscriber.complete();
             /*
            * JUST IN THIS CASE, ALL COMPONENTS DOESN'T KNOW THE SERVICE LAYER. ALL COMPONENTS 'SEE' THE EFFECT LAYER - 
            * AUTHENTICATION SERVICES IS THE ONLY SERVICES INJECTED ON COMPONENTS (LOGIN-OUT-COMPONENT)
            * SO WE SIMULATE THE LOGIN ACTION
            */
            this.store.dispatch(new userDetailsAction.DeleteUserDetails())
          } catch (error) {
            subscriber.error(error);
          }
        }
      );
      return observable;
  }


}