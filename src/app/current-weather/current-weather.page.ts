import { Component } from '@angular/core';

import { IconMapService } from '../services/icon-map/icon-map.service';
import { Weather } from '../models/weather';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';
import { WeatherPageBase } from '../weather-page-base/weather-page-base';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage extends WeatherPageBase<Weather> {
  constructor(
    iconMap: IconMapService,
    loadingController: LoadingController,
    weather: WeatherService
  ) {
    super(iconMap, loadingController, weather.current);
  }
}
