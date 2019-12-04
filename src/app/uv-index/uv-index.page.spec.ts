import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UvIndexPage } from './uv-index.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UvIndexPage', () => {
  let component: UvIndexPage;
  let fixture: ComponentFixture<UvIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UvIndexPage],
      imports: [IonicModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UvIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
