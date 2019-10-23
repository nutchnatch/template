import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggerService } from 'app/services/logger/logger.service';
import { MockBackend } from '@angular/http/testing';
import { HttpModule, XHRBackend } from '@angular/http';
import { HttpClientService } from 'app/services/http-client.service';
import { SampleService } from 'app/services/sample.service';
import { SampleEffect } from 'app/effects/sample.effect';
import { RouterStub } from '../../../../testing/router.stub';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SampleExtendComponent } from './sample-extend.component';
import * as fromStore from 'app/store';

describe('SampleExtendComponent', () => {
  let component: SampleExtendComponent;
  let fixture: ComponentFixture<SampleExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleExtendComponent ],
      imports: [
        StoreModule.provideStore(fromStore.reducers, fromStore.State),
        HttpModule,
        NgbModule.forRoot()
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        SampleEffect,
        SampleService,
        HttpClientService,
        LoggerService,
        { provide: XHRBackend, useClass: MockBackend }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
