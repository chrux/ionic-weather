import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { UvIndexPage } from './uv-index.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';
import { createWeatherServiceMock } from '../services/weather/weather.service.mock';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { createOverlayElementMock, createOverlayControllerMock } from 'test/mocks';
import { createUserPreferencesServiceMock } from '../services/user-preferences/user-preferences.service.mock';

describe('UvIndexPage', () => {
  let component: UvIndexPage;
  let fixture: ComponentFixture<UvIndexPage>;
  let loading;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [UvIndexPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: WeatherService, useFactory: createWeatherServiceMock },
        {
          provide: LoadingController,
          useFactory: () =>
            createOverlayControllerMock('LoadingController', loading)
        },
        { provide: UserPreferencesService, useFactory: createUserPreferencesServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(UvIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    beforeEach(() => {
      const weather = TestBed.get(WeatherService);
      weather.uvIndex.and.returnValue(
        of({
          value: 3.5,
          riskLevel: 1
        })
      );
    });

    it('displays a loading indicator', fakeAsync(() => {
      const loadingController = TestBed.get(LoadingController);
      component.ionViewDidEnter();
      tick();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    }));

    it('gets the UV index', fakeAsync(() => {
      const weather = TestBed.get(WeatherService);
      component.ionViewDidEnter();
      tick();
      expect(weather.uvIndex).toHaveBeenCalledTimes(1);
    }));

    it('displays the UV index', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('kws-uv-index'));
      expect(el).toBeTruthy();
    }));

    it('displays the appropriate description', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.description'));
      expect(el.nativeElement.textContent).toContain('Stay in the shade');
    }));

    it('dismisses the loading indicator', fakeAsync(() => {
      component.ionViewDidEnter();
      tick();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    }));
  });
});
