import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HeroDetailComponent } from './hero-detail.component';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

import { ActivatedRoute, ActivatedRouteStub, Location, LocationStub } from '../../testing/router-stubs';

class HeroServiceStub {
  getHero(id: number): Promise<Hero> {
    return Promise.resolve({id: 1, name: 'test'});
  }
}

describe('HeroDetailComponent', () => {
  let activatedRoute: ActivatedRouteStub;
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let location: LocationStub;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    location = new LocationStub();

    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      providers: [
        { provide: HeroService, useClass: HeroServiceStub },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Location, useValue: location }
      ],
      imports: [
        FormsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
