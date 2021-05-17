import { TestBed } from '@angular/core/testing';

import { DemoAppServiceService } from './demo-app-service.service';

describe('DemoAppServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemoAppServiceService = TestBed.get(DemoAppServiceService);
    expect(service).toBeTruthy();
  });
});
