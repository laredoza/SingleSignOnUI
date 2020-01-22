import { Injectable } from "@angular/core";
import { RoleFilter } from "./models/role-filter";
import { MatSortable } from "@angular/material";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { Role } from "./models/role";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { DataSourceRequest } from '../Modules/dataSource-request';
import { DataSourceResponse } from '../Modules/dataSource-response';

@Injectable({
  providedIn: "root"
})
export class RoleService {
  filter: RoleFilter;
  sort: MatSortable;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.filter = { search: "" };
    this.sort = { id: "name", start: "asc" } as MatSortable;
  }
  
  returnRoles(
    request: DataSourceRequest
  ): Observable<DataSourceResponse<Role[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<Role[]>>(
      `${environment.adminApi}/api/v1/Role/ReturnRoles`,
      request,
      { headers }
    );
  }

  addRole(role: Role): Observable<Role> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<Role>(
      `${environment.adminApi}/api/v1/Role/AddRole`,
      role,
      { headers }
    );
  }

  updateRole(role: Role): Observable<Role> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<Role>(
      `${environment.adminApi}/api/v1/Role/UpdateRole`,
      role,
      { headers }
    );
  }

  returnRole(name: string): Observable<Role> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<Role>(
        `${environment.adminApi}/api/v1/Role/ReturnRole/${name}`,
        { headers }
      )
      .pipe(
        map(role => role) // or any other operator
      );
  }
}
