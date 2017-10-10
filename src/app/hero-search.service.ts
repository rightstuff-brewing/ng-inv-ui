import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {

  constructor(private http: HttpClient) { }

  search(term: string): Observable<Hero[]> {
    return this.http
               .get<Hero[]>(`api/heroes/?name=${term}`);
  }

}
