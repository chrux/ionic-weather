import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { UserPreferencesService } from './user-preferences.service';
import { createIonicStorageMock } from './user-preferences.service.mock';

describe('UserPreferencesService', () => {
  let service: UserPreferencesService;
  let storage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Storage, useFactory: createIonicStorageMock }]
    });
    service = TestBed.get(UserPreferencesService);
    storage = TestBed.get(Storage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUseCelcius', () => {
    it('waits for storage to be ready', () => {
      service.getUseCelcius();
      expect(storage.ready).toHaveBeenCalledTimes(1);
    });

    it('gets the useCelcius value', async () => {
      await service.getUseCelcius();
      expect(storage.get).toHaveBeenCalledTimes(1);
      expect(storage.get).toHaveBeenCalledWith('useCelcius');
    });

    it('resolves the useCelcius value', async () => {
      storage.get.withArgs('useCelcius').and.returnValue(Promise.resolve(true));
      expect(await service.getUseCelcius()).toEqual(true);
    });

    it('caches the resolved useCelcius value', async () => {
      storage.get.withArgs('useCelcius').and.returnValue(Promise.resolve(true));
      expect(await service.getUseCelcius()).toEqual(true);
      expect(await service.getUseCelcius()).toEqual(true);
      expect(await service.getUseCelcius()).toEqual(true);
      expect(storage.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('setUseCelcius', () => {
    // Test for each requirement will go here
    it('waits for storage to be ready', () => {
      service.setUseCelcius(false);
      expect(storage.ready).toHaveBeenCalledTimes(1);
    });

    it('sets the useCelcius value', async () => {
      await service.setUseCelcius(false);
      expect(storage.set).toHaveBeenCalledTimes(1);
      expect(storage.set).toHaveBeenCalledWith('useCelcius', false);
    });

    it('updates the cache value for useCelcius', async () => {
      await service.setUseCelcius(false);
      expect(await service.getUseCelcius()).toEqual(false);
      expect(storage.get).not.toHaveBeenCalled();
    });
  });
});
