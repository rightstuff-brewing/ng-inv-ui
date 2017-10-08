export { ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
export { Location } from '@angular/common';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { convertToParamMap, ParamMap } from '@angular/router';

@Injectable()
export class LocationStub {}

@Injectable()
export class ActivatedRouteStub {
    // ActivatedRoute.paramMap is observable
    private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
    paramMap = this.subject.asObservable();

    // Test parameters
    private _testParamMap: ParamMap;
    get testParamMap() { return this._testParamMap; }
    set testParamMap(params: {}) {
        this._testParamMap = convertToParamMap(params);
        this.subject.next(this._testParamMap);
    }

    // ActivatedRoute.snapshot.paramMap
    get snapshot() {
        return { paramMap: this.testParamMap };
    }
}
