import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {take, mergeMap} from 'rxjs/operators';
import { IdentityResourceService } from '../identity-resource-.service';
import { IdentityResource } from '../models/identity-resource';

@Injectable({
  providedIn: 'root'
})
export class IdentityResourceResolveService implements Resolve<IdentityResource> {
  constructor(private identityResourceService : IdentityResourceService, private router : Router) {}

  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<IdentityResource> | Observable<never> {
      const name = route.paramMap.get('name');
      return this.identityResourceService.returnIdentityResource(name).pipe(take(1), mergeMap(identityResource => {
          if (identityResource) {
              return of(identityResource);
          } else { // id not found
              this.router.navigate(['/identity-resources']);
              return EMPTY;
          }
      }));
  }
}
