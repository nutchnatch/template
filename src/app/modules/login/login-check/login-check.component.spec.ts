import { LoggerService } from './../../services/logger/logger.service';
import { RouterStub } from './../../../testing/router.stub';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientService } from "app/services/http-client.service";

import { LoginCheckComponent } from './login-check.component';

import * as fromRoot from '../../reducers';


describe('LoginCheckComponent', () => {
  let component: LoginCheckComponent;
  let fixture: ComponentFixture<LoginCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginCheckComponent],
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State),
        TranslateModule.forRoot(),
        HttpModule
      ],
      providers: [
        AuthenticationService,
        HttpClientService,
        LoggerService,
        { provide: Router, useClass: RouterStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});