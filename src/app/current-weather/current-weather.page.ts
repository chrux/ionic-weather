import { Component } from '@angular/core';

import { IconMapService } from '../services/icon-map/icon-map.service';
import { Weather } from '../models/weather';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather;

  constructor(
    public iconMap: IconMapService,
    private weather: WeatherService,
    private loadingController: LoadingController
  ) { }

  async ionViewDidEnter() {
    const l = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true
    });
    l.present();
    this.weather.current().subscribe(w => {
      this.currentWeather = w;
      l.dismiss();
    });
  }
}
