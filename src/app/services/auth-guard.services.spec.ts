import { Observable } from 'rxjs/Observable';
import { AuthenticationServiceStub, createFakeuserDetailData } from './../../testing/authentication.service.stub';
import { StoreModule, Store } from '@ngrx/store';
import { RouterStub } from './../../testing/router.stub';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoggerService } from './logger/logger.service';
import { HttpModule } from '@angular/http';
import { HttpClientService } from './http-client.service';
import { AuthenticationService } from './authentication.service';
import { async, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardService } from './auth-guard.services';
import * as fromRoot from '../reducers';


describe('AuthGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State),
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        AuthGuardService,
        AuthenticationService,
        LoggerService,
        HttpClientService,
        LoggerService,
        HttpClientService,
        { provide: Router, useClass: RouterStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub }
      ]
    });
  });

  it('can instantiate service when inject service', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('can instantiate service with "new"', inject([AuthenticationService, Router, Store],
    (authenticationService: AuthenticationService, router: Router, store: Store<fromRoot.State>) => {
      expect(authenticationService).not.toBeNull('http authentication Service should be provided');
      expect(router).not.toBeNull('router should be provided');
      expect(store).not.toBeNull('store should be provided');
      const authGuardService = new AuthGuardService(authenticationService, router, store);
      expect(authGuardService instanceof AuthGuardService).toBe(true, 'new authGuardService should be ok');
    })
  );

  describe('canActivate()', () => {

    let authGuardService: AuthGuardService;
    let storeData: Store<fromRoot.State>;
    let authServiceMock: AuthenticationService;
    let routerStub: Router;

    beforeEach(
      inject([AuthenticationService, Router, Store],
        (authenticationService: AuthenticationService, router: Router, store: Store<fromRoot.State>) => {
          authGuardService = new AuthGuardService(authenticationService, router, store);
          storeData = store;
          authServiceMock = authenticationService;
          routerStub = router;
        }));

    it('method call | Logedin Test', inject([], () => {
      const activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot;
      const routerStateSnapshot: RouterStateSnapshot = { url: '/', root: null};

      const userLoadedResult: Boolean;

      const currentAuthGuard = authGuardService;
      const currentAuthService: AuthenticationService = authServiceMock;
      const currentStore: Store<fromRoot.State> = storeData;
      const currentRouter: Router = routerStub;

      currentAuthGuard.setUserLoadedResult(true);
      const result = currentAuthGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
      // Performe a User is logedin
      expect(result).toBe(true, ' fake login is true must then canActivate must return true');

    }));

    it('method call | Logedout Test', inject([], () => {
      let activatedRouteSnapshot: ActivatedRouteSnapshot = new ActivatedRouteSnapshot;
      let routerStateSnapshot: RouterStateSnapshot = { url: '/welcome', root: null};

      let userLoadedResult: boolean;

      const currentAuthGuard = authGuardService;
      const currentAuthService: AuthenticationService = authServiceMock;
      const currentStore: Store<fromRoot.State> = storeData;
      const currentRouter: Router = routerStub;

      currentAuthGuard.setUserLoadedResult(false);
      const result = currentAuthGuard.canActivate(activatedRouteSnapshot, routerStateSnapshot);
      // Performe a User is logedin
      expect(result).toBe(false, ' fake login is false must then canActivate must return false');
      expect(routerStub.url).toEqual('/user/check', ' after fail must redirect to check login');
      storeData.select('layout').subscribe((data:any) => { 
        expect(data.url).toEqual(routerStateSnapshot.url, 'The redirect url in store must be equal to  routerStateSnapshot url')
      });
    }));

  });
});
