import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

export class WeatherPageBase<T> {
  data: T;
  scale: string;

  constructor(
    protected userPreferences: UserPreferencesService,
    private loadingController: LoadingController,
    private fetch: () => Observable<T>
  ) { }

  async ionViewDidEnter() {
    this.scale = (await this.userPreferences.getUseCelcius() ? 'C' : 'F');
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

  toggleScale() {
    this.scale = this.scale === 'C' ? 'F' : 'C';
    this.userPreferences.setUseCelcius(this.scale === 'C');
  }
}
