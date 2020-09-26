import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

describe('LocationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Geolocation,
          useFactory: () =>
            jasmine.createSpyObj('Geolocation', {
              getCurrentPosition: Promise.resolve({
                coords: { latitude: 42, longitude: 73 }
              })
            })
        }
      ]
    })
  );

  it('should be created', () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });

  describe('current', () => {
    it('calls the gelocation plugin', () => {
      // Arrange
      const geolocation = TestBed.get(Geolocation);
      const service: LocationService = TestBed.get(LocationService);
      // Act
      service.current();
      // Assert
      expect(geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('resolves the unpacked position', async () => {
      const service: LocationService = TestBed.get(LocationService);
      expect(await service.current()).toEqual({
        latitude: 42,
        longitude: 73
      });
    });
  });
});
