import { LoadingController } from '@ionic/angular';
import { Observable, Subject, from } from 'rxjs';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';
import { flatMap, tap } from 'rxjs/operators';
import { keys } from 'ts-transformer-keys';

export class WeatherPageBase<T> {
  private refresh: Subject<void>;
  data$: Observable<T>;
  scale: string;

  constructor(
    protected userPreferences: UserPreferencesService,
    private loadingController: LoadingController,
    private fetch: () => Observable<T>
  ) {
    this.refresh = new Subject();
    this.data$ = this.refresh.pipe(flatMap(() => this.getData()));
  }

  async ionViewDidEnter() {
    this.scale = (await this.userPreferences.getUseCelcius() ? 'C' : 'F');
    this.refresh.next();
  }

  private async showLoading(): Promise<HTMLIonLoadingElement> {
    const l = await this.loadingController.create({
      message: 'Please wait...'
    });
    await l.present();
    return l;
  }

  private getData(): Observable<T> {
    let loading: HTMLIonLoadingElement;
    return from(this.showLoading()).pipe(flatMap(l => {
        loading = l;
        return this.fetch();
      }),
      tap(() => loading.dismiss())
    );
  }

  toggleScale() {
    this.scale = this.scale === 'C' ? 'F' : 'C';
    this.userPreferences.setUseCelcius(this.scale === 'C');
  }
}
