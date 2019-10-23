import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

/* store and store interface */
import { Store, select } from '@ngrx/store';
import * as fromStore from 'app/store';

/* actions */
import * as language from 'app/store/actions/language.actions';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent {

  currentLanguage$: Observable<string>;
  localesList$: Observable<Array<string>>;

  constructor(
    private store: Store<fromStore.State>
  ) {
    this.currentLanguage$ = store.pipe(select(fromStore.getCurrentLanguage));
    this.localesList$ = store.pipe(select(fromStore.getAppConfigLocaleList));
  }

  changeLang(lang: string) {
    this.store.dispatch(new language.ChangeLanguageAction(lang));
  }

}
