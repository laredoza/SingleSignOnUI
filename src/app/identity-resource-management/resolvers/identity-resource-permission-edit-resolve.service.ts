import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {take, mergeMap} from 'rxjs/operators';
import {IdentityResourceService} from '../identity-resource-.service';
import {IdentityResourceClaim} from '../models/identity-resource.claim';
@Injectable({providedIn: 'root'})
export class IdentityResourcePermissionEditResolveService implements Resolve<IdentityResourceClaim> {
    constructor(private identityResourceService : IdentityResourceService, private router : Router) {}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<IdentityResourceClaim> | Observable<never> {
        const name = route.paramMap.get('name');
        const id = route.paramMap.get('id');


        if (id == '0') {
            return new Observable((observer) => { // observable execution
                observer.next(null);
                observer.complete();
            })
        }
        return this.identityResourceService.returnIdentityResourceClaim(name, parseInt(id)).pipe(take(1), mergeMap(identityResourceClaim => {
            if (identityResourceClaim) {
                return of(identityResourceClaim);
            } else { // id not found
                this.router.navigate(['/identity-resources']);
                return EMPTY;
            }
        }));
    }
}
