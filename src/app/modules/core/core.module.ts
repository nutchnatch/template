import { MainContentComponent } from './main-content/main-content.component';
import { CommonUiModule } from 'app/modules/common-ui/common-ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule } from '@ngx-translate/core';

import { BnpBrandBarComponent } from './bnp-brand-bar/bnp-brand-bar.component';
import { MainNavComponent } from '../common-ui/main-nav/main-nav.component';
import { LoadingBarsComponent } from './loading-bars/loading-bars.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { GuardedContentComponent } from './guarded-content/guarded-content.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ModalExpiredSessionComponent } from './modals/modal-expired-session/modal-expired-session.component';
import { RefreshUrlComponent } from 'app/modules/core/refresh-url/refresh-url.component';


/**
 * CORE COMPONENTS
 *
 * @export
 * @class CoreModule
 */
@NgModule({
  imports: [
    CommonModule,
    CommonUiModule,
    NgbModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TranslateModule,
    BnpBrandBarComponent,
    LoadingBarsComponent,
    MainContentComponent,
    LanguageSelectComponent,
    GuardedContentComponent,
    ModalExpiredSessionComponent
  ],
  declarations: [
    BnpBrandBarComponent,
    LoadingBarsComponent,
    MainContentComponent,
    LanguageSelectComponent,
    GuardedContentComponent,
    BreadcrumbComponent,
    ModalExpiredSessionComponent,
    RefreshUrlComponent
  ]
})
export class CoreModule { }
