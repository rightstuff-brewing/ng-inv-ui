import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient) { }

  getHeroes(): Promise<Hero[]> {
    return this.http
               .get<Hero[]>(this.heroesUrl)
               .toPromise()
               .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
                    .toPromise()
                    .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
               .post(this.heroesUrl, {name: name})
               .toPromise()
               .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
               .put(url, hero)
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
               .delete(url)
               .toPromise()
               .then(() => null)
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
