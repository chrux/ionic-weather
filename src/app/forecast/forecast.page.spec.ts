import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { IonicModule, LoadingController } from '@ionic/angular';

import { ForecastPage } from './forecast.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherService } from '../services/weather/weather.service';
import { createWeatherServiceMock } from '../services/weather/weather.service.mock';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { createOverlayElementMock, createOverlayControllerMock } from 'test/mocks';
import { createUserPreferencesServiceMock } from '../services/user-preferences/user-preferences.service.mock';

describe('ForecastPage', () => {
  let component: ForecastPage;
  let fixture: ComponentFixture<ForecastPage>;
  let loading;

  beforeEach(async(() => {
    loading = createOverlayElementMock('Loading');
    TestBed.configureTestingModule({
      declarations: [ForecastPage],
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

    fixture = TestBed.createComponent(ForecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('entering the page', () => {
    it('displays a loading indicator', fakeAsync(() => {
      const loadingController = TestBed.get(LoadingController);
      component.ionViewDidEnter();
      tick();
      expect(loadingController.create).toHaveBeenCalledTimes(1);
      expect(loading.present).toHaveBeenCalledTimes(1);
    }));

    it('gets the forecast', fakeAsync(() => {
      const weather = TestBed.get(WeatherService);
      component.ionViewDidEnter();
      tick();
      expect(weather.forecast).toHaveBeenCalledTimes(1);
    }));

    it('shows the forecast items', fakeAsync(() => {
      const weather = TestBed.get(WeatherService);
      weather.forecast.and.returnValue(
        of([
          [
            {
              temperature: 300,
              condition: 200,
              date: new Date(2018, 8, 19)
            }
          ],
          [
            {
              temperature: 265,
              condition: 601,
              date: new Date(2018, 8, 20)
            }
          ],
          [
            {
              temperature: 293,
              condition: 800,
              date: new Date(2018, 8, 21)
            }
          ]
        ])
      );
      component.ionViewDidEnter();
      tick();
      fixture.detectChanges();
      const f = fixture.debugElement.queryAll(By.css('kws-daily-forecast'));
      expect(f.length).toEqual(3);
    }));

    it('dismisses the loading indicator', fakeAsync(() => {
      const weather = TestBed.get(WeatherService);
      weather.forecast.and.returnValue(
        of([
          [
            {
              temperature: 300,
              condition: 200,
              date: new Date(2018, 8, 19)
            }
          ],
          [
            {
              temperature: 265,
              condition: 601,
              date: new Date(2018, 8, 20)
            }
          ],
          [
            {
              temperature: 293,
              condition: 800,
              date: new Date(2018, 8, 21)
            }
          ]
        ])
      );
      component.ionViewDidEnter();
      tick();
      expect(loading.dismiss).toHaveBeenCalledTimes(1);
    }));
  });
});
