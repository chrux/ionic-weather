import { Component } from '@angular/core';

import { Forecast } from '../models/forecast';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { WeatherService } from '../services/weather/weather.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage {
  forecast: Forecast;

  constructor(
    public iconMap: IconMapService,
    private weather: WeatherService,
    private loadingController: LoadingController) {}

  async ionViewDidEnter() {
    const l = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true
    });
    l.present();
    this.weather.forecast().subscribe(f => {
      this.forecast = f;
      l.dismiss();
    });
  }
}
