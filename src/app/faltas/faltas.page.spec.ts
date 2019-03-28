import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaltasPage } from './faltas.page';

describe('FaltasPage', () => {
  let component: FaltasPage;
  let fixture: ComponentFixture<FaltasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaltasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaltasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
