export function createIonicStorageMock() {
  return jasmine.createSpyObj('Storage', {
    get: Promise.resolve(),
    set: Promise.resolve(),
    ready: Promise.resolve()
  });
}

export function createUserPreferencesServiceMock() {
  return jasmine.createSpyObj('UserPreferencesService', {
    getUseCelcius: Promise.resolve(false),
    setUseCelcius: Promise.resolve()
  });
}
