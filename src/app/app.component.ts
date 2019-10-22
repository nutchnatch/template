import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientService } from './services/http-client.service';
import { LoggerService } from './services/logger/logger.service';

import { Store } from '@ngrx/store';

import * as fromRoot from './reducers';
import * as layout from './actions/layout.actions';
import * as language from './actions/language.actions';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentLanguage$: Observable<string>;
  showSidenav$: Observable<boolean>;

  constructor(private http: HttpClientService, private logger: LoggerService,
    private store: Store<fromRoot.State>,
    private translate: TranslateService) {
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
    this.currentLanguage$ = store.select(fromRoot.getCurrentLanguage);
    this.currentLanguage$.subscribe( (selectedLanguage) => {translate.use(selectedLanguage); } );

    this.showSidenav$ = store.select(fromRoot.getShowSidenav);
    // this.showSidenav$.subscribe((open) => console.log(open))


  }

  ngOnInit() {
   /* this.http.get("/yourapplication-frontend-webapp/v1/samples/json/list")
     .subscribe((res:any) => this.logger.debug('AppComponent', 'Get List Sample - proxy good', res.json()) )*/
  }

}
