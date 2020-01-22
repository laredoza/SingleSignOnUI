import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {take, mergeMap} from 'rxjs/operators';
import { ApiResourceClaim } from '../models/api-resource.claim';
import { ApiResourceService } from '../api-resource.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClaimEditResolverService implements Resolve<ApiResourceClaim> {
  constructor(private apiResourceService : ApiResourceService, private router : Router) {}

  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<ApiResourceClaim> | Observable<never> {
      const name = route.paramMap.get('name');
      const id = route.paramMap.get('id');


      if (id == '0') {
          return new Observable((observer) => { // observable execution
              observer.next(null);
              observer.complete();
          })
      }
      return this.apiResourceService.returnApiResourceClaim(name, parseInt(id)).pipe(take(1), mergeMap(apiResourceClaim => {
          if (apiResourceClaim) {
              return of(apiResourceClaim);
          } else { // id not found
              this.router.navigate(['/identity-resources']);
              return EMPTY;
          }
      }));
  }
}
