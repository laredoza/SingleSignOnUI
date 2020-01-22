import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {take, mergeMap} from 'rxjs/operators';
import { ApiResourceService } from '../api-resource.service';
import { ApiResource } from '../models/api-resource';

@Injectable({
  providedIn: 'root'
})
export class ApiResourceResolveService implements Resolve<ApiResource> {
  constructor(private apiResource : ApiResourceService, private router : Router) {}

  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<ApiResource> | Observable<never> {
      const name = route.paramMap.get('name');
      return this.apiResource.returnApiResource(name).pipe(take(1), mergeMap(apiResource => {
          if (apiResource) {
              return of(apiResource);
          } else {
              this.router.navigate(['/api-resources']);
              return EMPTY;
          }
      }));
  }
}
