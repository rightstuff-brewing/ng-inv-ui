import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { HeroService } from './hero.service';

class HttpStub {}

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: Http, useClass: HttpStub }
      ]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
