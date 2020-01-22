import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { MatSortable } from "@angular/material";
import { UserFilter } from "./models/user-filter";
import { AuthService } from "../services/auth.service";
import { User } from "./models/user";
import { Claim } from "./models/claim";
import { RolesToUserViewModel } from "./models/RolesToUserViewModel";
import { DataSourceRequest } from "../Modules/dataSource-request";
import { DataSourceResponse } from "../Modules/dataSource-response";

@Injectable({ providedIn: "root" })
export class UserService {
  filter: UserFilter;
  sort: MatSortable;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.filter = {
      search: ""
    };
    this.sort = { id: "type", start: "asc" } as MatSortable;
  }

  returnUsers(
    request: DataSourceRequest
  ): Observable<DataSourceResponse<User[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<User[]>>(
      `${environment.adminApi}/api/v1/User/ReturnUsers`,
      request,
      { headers }
    );
  }

  returnUser(id: string): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<User>(`${environment.adminApi}/api/v1/User/ReturnUser/${id}`, {
        headers
      })
      .pipe(
        map(user => user) // or any other operator
      );
  }

  addUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<User>(
      `${environment.adminApi}/api/v1/User/AddUser`,
      user,
      { headers }
    );
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<User>(
      `${environment.adminApi}/api/v1/User/UpdateUser`,
      user,
      { headers }
    );
  }

  changeUserPassword(user: User): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<User>(
      `${environment.adminApi}/api/v1/User/ChangeUserPassword`,
      user,
      { headers }
    );
  }
  
  returnClaimsForUser(
    request: DataSourceRequest,
    id: string
  ): Observable<DataSourceResponse<Claim[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<Claim[]>>(
      `${environment.adminApi}/api/v1/UserClaim/ReturnClaimsForUser/${id}`,
      request,
      { headers }
    );
  }

  returnRolesForUser(id: string): Observable<string[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<string[]>(
        `${environment.adminApi}/api/v1/UserRole/ReturnRolesForUser/${id}`,
        { headers }
      )
      .pipe(
        map(role => role) // or any other operator
      );
  }

  returnRolesToAddForUser(id: string): Observable<string[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<string[]>(
        `${environment.adminApi}/api/v1/UserRole/ReturnRolesToAddForUser/${id}`,
        { headers }
      )
      .pipe(
        map(role => role) // or any other operator
      );
  }

  addRolesToUser(
    userId: string,
    roles: string[]
  ): Observable<RolesToUserViewModel> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    const addRolesToUserViewModel = new RolesToUserViewModel();
    addRolesToUserViewModel.userId = userId;
    addRolesToUserViewModel.roles = roles;

    return this.http.post<RolesToUserViewModel>(
      `${environment.adminApi}/api/v1/UserRole/AddRolesToUser`,
      addRolesToUserViewModel,
      { headers }
    );
  }

  removeRolesFromUser(
    userId: string,
    roles: string[]
  ): Observable<RolesToUserViewModel> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    const addRolesToUserViewModel = new RolesToUserViewModel();
    addRolesToUserViewModel.userId = userId;
    addRolesToUserViewModel.roles = roles;

    return this.http.post<RolesToUserViewModel>(
      `${environment.adminApi}/api/v1/UserRole/RemoveRolesFromUser`,
      addRolesToUserViewModel,
      { headers }
    );
  }

  returnUserClaim(claimType: string, id: string): Observable<Claim> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<Claim>(`${environment.adminApi}/api/v1/UserClaim/ReturnClaimForUser/${claimType}/${id}`, {
        headers
      })
      .pipe(
        map(claim => claim) // or any other operator
      );
  }

  addClaimToUser(claim: Claim, userId: string): Observable<Claim> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<Claim>(
      `${environment.adminApi}/api/v1/UserClaim/AddClaimToUser/${userId}`,
      claim,
      { headers }
    );
  }

  updateUserClaim(claim: Claim, userId: string, oldClaimType: string): Observable<Claim> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<Claim>(
      `${environment.adminApi}/api/v1/UserClaim/UpdateUserClaim/${userId}/${oldClaimType}`,
      claim,
      { headers }
    );
  }

  removeUserClaims(claims: Claim[], userId: string): Observable<Claim[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<Claim[]>(
      `${environment.adminApi}/api/v1/UserClaim/DeleteUserClaims/${userId}`,
      claims,
      { headers }
    );
  }
}
