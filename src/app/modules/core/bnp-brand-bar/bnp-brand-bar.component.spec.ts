import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, DebugElement, DebugNode } from '@angular/core';

import { BnpBrandBarComponent } from './bnp-brand-bar.component';

describe('BnpBrandBarComponent', () => {
  let component: BnpBrandBarComponent;
  let fixture: ComponentFixture<BnpBrandBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BnpBrandBarComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BnpBrandBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
