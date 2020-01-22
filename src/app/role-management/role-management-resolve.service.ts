import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {take, mergeMap} from 'rxjs/operators';
import {RoleService} from './role.service';
import {Role} from './models/role';

@Injectable({providedIn: 'root'})
export class RoleManagementResolveService implements Resolve<Role> {
    constructor(private roleService : RoleService, private router : Router) {}

    resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<Role> | Observable<never> {
        const id = route.paramMap.get('id');
        return this.roleService.returnRole(id).pipe(take(1), mergeMap(role => {
            if (role) {
                return of(role);
            } else { // id not found
                this.router.navigate(['/users']);
                return EMPTY;
            }
        }));
    }
}
