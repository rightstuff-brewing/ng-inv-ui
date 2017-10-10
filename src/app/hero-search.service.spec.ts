import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { HeroSearchService } from './hero-search.service';

class HttpStub {}

describe('HeroSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroSearchService,
        { provide: Http, useClass: HttpStub }
      ]
    });
  });

  it('should be created', inject([HeroSearchService], (service: HeroSearchService) => {
    expect(service).toBeTruthy();
  }));
});
