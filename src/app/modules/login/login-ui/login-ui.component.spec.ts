import { RouterStub } from './../../../testing/router.stub';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LoggerService } from './../../services/logger/logger.service';
import { HttpModule } from '@angular/http';
import { HttpClientService } from './../../services/http-client.service';
import { AuthenticationService } from './../../services/authentication.service';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement, DebugNode } from '@angular/core';

import { LoginUiComponent } from './login-ui.component';
import * as fromRoot from '../../reducers';

describe('LoginUiComponent', () => {
  let component: LoginUiComponent;
  let fixture: ComponentFixture<LoginUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginUiComponent],
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
    fixture = TestBed.createComponent(LoginUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
