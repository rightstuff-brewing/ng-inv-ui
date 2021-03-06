import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Injectable()
export class RouterStub {
    navigateByUrl(url: string) { return url; }
}

export class HeroServiceStub {
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve([]);
  }
}

describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: HeroService, useClass: HeroServiceStub },
        { provide: Router, useClass: RouterStub }
      ],
      imports: [ FormsModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
