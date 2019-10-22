import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterStub } from '../../../../testing/router.stub';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import * as fromRoot from 'app/reducers';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseComponent ],
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State),
        NgbModule.forRoot()
      ],
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
