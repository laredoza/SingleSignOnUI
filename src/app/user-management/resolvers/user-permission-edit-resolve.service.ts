import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionEditResolveService implements Resolve<Claim> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Claim> | Observable<never> {
      const id = route.paramMap.get('id');
      const type = route.paramMap.get('type');
      return this.userService.returnUserClaim(type, id).pipe(
              take(1),
              mergeMap(user => {
                  if (user) {
                      return of(user);
                  } else { // id not found
                      this.router.navigate([`/users/permissions/${id}`]);
                      return EMPTY;
                  }
              })
          );
  }
}
