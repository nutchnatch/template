import { RouterModule } from '@angular/router';
import { CommonUiModule } from 'app/modules/common-ui/common-ui.module';
import { ModalExpiredSessionComponent } from 'app/modules/core/modals/modal-expired-session/modal-expired-session.component';
import { CoreModule } from 'app/modules/core/core.module';
import { ContainersRoutingModule } from './containers-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { SampleExtendComponent } from './sample-extend/sample-extend.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    CommonUiModule,
    NgbModule,
    ContainersRoutingModule,
    CoreModule,
  ],
  entryComponents: [
    ModalExpiredSessionComponent
  ],
  declarations: [
    BaseComponent,
    SampleExtendComponent,
    DashboardComponent
  ]
})
export class ContainersModule { }
