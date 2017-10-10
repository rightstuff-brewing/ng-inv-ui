import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { HeroSearchService } from './hero-search.service';

class HttpClientStub {}

describe('HeroSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroSearchService,
        { provide: HttpClient, useClass: HttpClientStub }
      ]
    });
  });

  it('should be created', inject([HeroSearchService], (service: HeroSearchService) => {
    expect(service).toBeTruthy();
  }));
});
