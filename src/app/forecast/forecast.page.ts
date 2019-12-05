import { Component } from '@angular/core';

import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';
import { WeatherPageBase } from '../weather-page-base/weather-page-base';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage extends WeatherPageBase<Forecast> {
  constructor(
    iconMap: IconMapService,
    loadingController: LoadingController,
    weather: WeatherService) {
      super(iconMap, loadingController, () => weather.forecast());
    }
}
