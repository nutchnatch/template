import { Router } from '@angular/router';
import { ModalExpiredSessionComponent } from 'app/modules/core/modals/modal-expired-session/modal-expired-session.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientService } from './services/http-client.service';
import { LoggerService } from './services/logger/logger.service';
import { Error } from 'app/models/error';


import { Store, select } from '@ngrx/store';

import * as fromStore from 'app/store';
import * as layoutAction from 'app/store/actions/layout.actions';
import * as httpErrorAction from 'app/store/actions/http-error.actions';


// import { BusinessScopeEffect } from 'app/effects/business-scope.effect';
// import { InfoEffect } from 'app/effects/application.effect';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentLanguage$: Observable<string>;
  showSidenav$: Observable<boolean>;
  userDetailsLoaded$: Observable<boolean>;
  httpError$: Observable<Error>;
  userName$: Observable<string>;
  userName: string;
  fullUserName$: Observable<string>;
  fullUserName: string;

  loadedError: boolean;

  modalExpiredSession;

  constructor(
    public http: HttpClientService<any>,
    public logger: LoggerService,
    public store: Store<fromStore.State>,
    public translate: TranslateService,
    protected router: Router,
    protected modalService: NgbModal
  ) {
    /**
    * debug store uncoment line bellow
    */
    // store.subscribe( (state)=> console.log(state));

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    /**
    * Selectors can be applied with the `select` operator which passes the state
    * tree to the provided selector
    */
    this.currentLanguage$ = store.pipe(select(fromStore.getCurrentLanguage));
    this.currentLanguage$.subscribe((selectedLanguage) => { translate.use(selectedLanguage); });

    this.showSidenav$ = store.pipe(select(fromStore.getShowSidenav));
    // this.showSidenav$.subscribe((open) => console.log(open))

    this.userDetailsLoaded$ = store.pipe(select(fromStore.getUserDetailsLoaded));
    this.userDetailsLoaded$.subscribe(userLoaded => {
      if (userLoaded ) { console.log('User Loaded'); }

    });


    // this.fullUserName$ = store.pipe(select(fromStore.getUserDetailsFullUserName));
    // this.fullUserName$.subscribe((fullname) => this.fullUserName = fullname);

    // this.userName$ = store.pipe(select(fromStore.getUserDetailsUserName));
    // this.userName$.subscribe((username) => this.userName = username);

    // this.httpError$ = store.pipe(select(fromStore.getHttpError));
    // this.httpError$.subscribe(error => error && this.errorHandler(error));

    // this.store.dispatch(new layoutAction.PutFromSearchAction(null));
    // this.store.dispatch(new layoutAction.PutAdvanceSearch(false));

  }

  ngOnInit() {
    // this.infoEffect.getApplicationConfigInfo();
  }

  protected errorHandler(error: Error) {
    this.store.dispatch(new httpErrorAction.PutLoadedErrorAction(true));
    if (error.code === '401' || error.code === 401) {
      this.openExpiredModal();
      // if (!this.modalExpiredSession) {
      //   this.modalExpiredSession = this.modalService.open(ModalExpiredSessionComponent);
      //   this.modalExpiredSession.componentInstance.fullName = this.fullUserName;
      //   this.modalExpiredSession.componentInstance.username = this.userName;
      // }

      // this.modalExpiredSession.result.then((result) => {
      //   this.store.dispatch(new httpErrorAction.PutLoadedErrorAction(false));
      //   this.modalExpiredSession = undefined;
      // }, (reason) => {
      //   this.getDismissReason(reason);
      //   this.store.dispatch(new httpErrorAction.PutLoadedErrorAction(false));
      // });

    } else if (error.code === '403' || error.code === 403) {
      // TODO: SHOW A MODAL BOX WITH MISSING CORRECTS ROLES / AUTORIZATION
      //  alert('Missing Role!');
      this.openExpiredModal();

      // this.onError403();
    } else if (error.code === '404' || error.code === 404) {
      // TODO: SHOW A MODAL WITH PAGE NOT FOUND
      alert('PAGE NOT FOUND');
      // this.onError404();
    }
  }

  getDismissReason(reason: any) {
    if (reason === ModalDismissReasons.ESC) {
      this.router.navigate(['app/user/logout']);
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.router.navigate(['app/user/logout']);
    }

    this.modalExpiredSession = undefined;
  }

  openExpiredModal() {

    if (!this.modalExpiredSession) {
      this.modalExpiredSession = this.modalService.open(ModalExpiredSessionComponent);
      this.modalExpiredSession.componentInstance.fullName = this.fullUserName;
      this.modalExpiredSession.componentInstance.username = this.userName;
    }

    this.modalExpiredSession.result.then((result) => {
      this.store.dispatch(new httpErrorAction.PutLoadedErrorAction(false));
      this.modalExpiredSession = undefined;
    }, (reason) => {
      this.getDismissReason(reason);
      this.store.dispatch(new httpErrorAction.PutLoadedErrorAction(false));
    });
  }
}
