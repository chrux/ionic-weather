import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';
import { WeatherPageBase } from '../weather-page-base/weather-page-base';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastPage extends WeatherPageBase<Forecast> {
  constructor(
    public iconMap: IconMapService,
    userPreferences: UserPreferencesService,
    loadingController: LoadingController,
    weather: WeatherService) {
      super(userPreferences, loadingController, () => weather.forecast());
    }
}
