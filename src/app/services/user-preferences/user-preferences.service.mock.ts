export function createIonicStorageMock() {
  return jasmine.createSpyObj('Storage', {
    get: Promise.resolve(),
    set: Promise.resolve(),
    ready: Promise.resolve()
  });
}
