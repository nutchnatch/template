import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule } from '@ngx-translate/core';

import { BnpBrandBarComponent } from './bnp-brand-bar/bnp-brand-bar.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoadingBarsComponent } from './loading-bars/loading-bars.component';
import { MainContentComponent } from './main-content/main-content.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { GuardedContentComponent } from './guarded-content/guarded-content.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ModalExpiredSessionComponent } from './modals/modal-expired-session/modal-expired-session.component';


/**
 * TSP UI SHARED COMPONENTS
 * 
 * @export
 * @class TspUIModule
 */
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateModule,
    BnpBrandBarComponent,
    MainNavComponent,
    SidebarComponent,
    LoadingBarsComponent,
    MainContentComponent,
    LanguageSelectComponent,
    GuardedContentComponent,
    ModalExpiredSessionComponent
  ],
  declarations: [
    BnpBrandBarComponent,
    MainNavComponent,
    SidebarComponent,
    LoadingBarsComponent,
    MainContentComponent,
    LanguageSelectComponent,
    GuardedContentComponent,
    BreadcrumbComponent,
    ModalExpiredSessionComponent
  ]
})
export class TspUIModule { }
