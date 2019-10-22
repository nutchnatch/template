import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpiredSessionComponent } from './modal-expired-session.component';
import { AuthenticationServiceStub } from "testing/authentication.service.stub";
import { StoreModule } from "@ngrx/store";

import * as fromRoot from 'app/reducers';
import { RouterStub } from "testing/router.stub";
import { LoggerService } from "app/services/logger/logger.service";

describe('ModalExpiredSessionComponent', () => {
  let component: ModalExpiredSessionComponent;
  let fixture: ComponentFixture<ModalExpiredSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalExpiredSessionComponent],
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State),
        TranslateModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        NgbModal,
        NgbActiveModal,
        LoggerService,
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExpiredSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
