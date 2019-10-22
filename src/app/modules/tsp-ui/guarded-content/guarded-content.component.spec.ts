import { StoreModule } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement, DebugNode } from '@angular/core';

import { GuardedContentComponent } from './guarded-content.component';
import * as fromRoot from '../../reducers';

describe('GuardedContentComponent', () => {
  let component: GuardedContentComponent;
  let fixture: ComponentFixture<GuardedContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardedContentComponent ],
      imports: [
        StoreModule.provideStore(fromRoot.reducers, fromRoot.State)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
