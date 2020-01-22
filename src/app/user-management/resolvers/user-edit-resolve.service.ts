import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEditResolveService implements Resolve<User> {
  constructor(private userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Observable<never> {
      const id = route.paramMap.get('id');
      return this.userService.returnUser(id).pipe(
              take(1),
              mergeMap(user => {
                  if (user) {
                      return of(user);
                  } else { // id not found
                      this.router.navigate(['/users']);
                      return EMPTY;
                  }
              })
          );
  }
}
