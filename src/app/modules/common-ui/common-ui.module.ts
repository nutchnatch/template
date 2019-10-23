import { MainNavComponent } from './main-nav/main-nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableSampleComponent } from './tables/table-sample/table-sample.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
/**
 *
 *
 * @export
 * @class CoreModule
 */
@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
  ],
  exports: [
    TableSampleComponent,
    SidebarComponent,
    MainNavComponent,

  ],
  declarations: [
    TableSampleComponent,
    MainNavComponent,
    SidebarComponent
  ]
})
export class CommonUiModule { }
