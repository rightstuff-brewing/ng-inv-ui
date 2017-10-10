import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { HeroService } from './hero.service';

class HttpClientStub {}

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: HttpClient, useClass: HttpClientStub }
      ]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
