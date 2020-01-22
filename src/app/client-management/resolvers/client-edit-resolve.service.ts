import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of, EMPTY} from 'rxjs';
import {take, mergeMap} from 'rxjs/operators';
import { Client } from '../models/client';
import { ClientService } from '../client.service';
@Injectable({
  providedIn: 'root'
})
export class ClientEditResolveService implements Resolve<Client> {
  constructor(private service : ClientService, private router : Router) {}

  resolve(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<Client> | Observable<never> {
      const id = route.paramMap.get('id');

      if (id == '0') {
          return new Observable((observer) => { // observable execution
              observer.next(null);
              observer.complete();
          })
      }
      return this.service.returnClient(parseInt(id)).pipe(take(1), mergeMap(client => {
          if (client) {
              return of(client);
          } else { // id not found
              this.router.navigate(['/clients']);
              return EMPTY;
          }
      }));
  }
}
