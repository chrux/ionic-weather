import { Component, ChangeDetectionStrategy } from '@angular/core';

import { IconMapService } from '../services/icon-map/icon-map.service';
import { Weather } from '../models/weather';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';
import { WeatherPageBase } from '../weather-page-base/weather-page-base';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  constructor(
    public iconMap: IconMapService,
    userPreference: UserPreferencesService,
    loadingController: LoadingController,
    weather: WeatherService
  ) {
    super(userPreference, loadingController, () => weather.current());
  }
}
