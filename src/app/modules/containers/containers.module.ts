import { ModalExpiredSessionComponent } from 'app/modules/tsp-ui/modals/modal-expired-session/modal-expired-session.component';
import { SampleEffect } from 'app/effects/sample.effect';
import { TspUIModule } from 'app/modules/tsp-ui/tsp-ui.module';
import { ContainersRoutingModule } from './containers-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { SampleExtendComponent } from './sample-extend/sample-extend.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ContainersRoutingModule,
    TspUIModule
  ],
   providers: [
    SampleEffect
  ],
  entryComponents: [
    ModalExpiredSessionComponent
  ],
  declarations: [BaseComponent, SampleExtendComponent]
})
export class ContainersModule { }
