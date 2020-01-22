import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {UserService} from '../user.service';
import {Observable, of, EMPTY} from 'rxjs';
import {take, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleListAddResolveService implements Resolve<string[]> {
  constructor(private userService : UserService, private router : Router) {}

  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<string[]> | Observable<never> {
      const id = route.paramMap.get('id');
      return this.userService.returnRolesToAddForUser(id).pipe(take(1), mergeMap(role => {
          if (role) {
              return of(role);
          } else { // id not found
              this.router.navigate(['/users']);
              return EMPTY;
          }
      }));
  }
}
