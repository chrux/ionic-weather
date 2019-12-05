import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IconMapService } from '../services/icon-map/icon-map.service';

export class WeatherPageBase<T> {
  data: T;

  constructor(
    private loadingController: LoadingController,
    private fetch: () => Observable<T>
  ) { }

  async ionViewDidEnter() {
    const l = await this.loadingController.create({
      message: 'Please wait...',
      translucent: true
    });
    l.present();
    this.fetch().subscribe(d => {
      this.data = d;
      l.dismiss();
    });
  }
}
