import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from 'app/app.config';

/* store and store interface */
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/reducers';

/* actions */
import * as language from 'app/actions/language.actions';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent implements OnInit {

  currentLanguage$: Observable<string>;
  private localList: Array<string>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.currentLanguage$ = store.select(fromRoot.getCurrentLanguage);
  }

  ngOnInit() {
    this.localList = AppConfig.localeList;
  }

  changeLang(lang: string) {
    this.store.dispatch(new language.ChangeLanguageAction(lang));
  }

}
