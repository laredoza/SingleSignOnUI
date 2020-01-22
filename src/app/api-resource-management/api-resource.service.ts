import { Injectable } from "@angular/core";
import { ApiResourceFilter } from "./models/api-resource-filter";
import { MatSortable } from "@angular/material";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { ApiResource } from "./models/api-resource";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { ApiResourceClaim } from "./models/api-resource.claim";
import { DataSourceRequest } from "../Modules/dataSource-request";
import { DataSourceResponse } from "../Modules/dataSource-response";

@Injectable({ providedIn: "root" })
export class ApiResourceService {
  filter: ApiResourceFilter;
  sort: MatSortable;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.filter = {
      search: ""
    };
    this.sort = { id: "description", start: "asc" } as MatSortable;
  }

  returnApiResources(
    request: DataSourceRequest
  ): Observable<DataSourceResponse<ApiResource[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<ApiResource[]>>(
      `${environment.adminApi}/api/v1/ApplicationResource/ReturnApiResources`,
      request,
      { headers }
    );
  }

  returnApiResource(name: string): Observable<ApiResource> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<ApiResource>(
        `${environment.adminApi}/api/v1/ApplicationResource/ReturnApiResource/${name}`,
        { headers }
      )
      .pipe(
        map(identityResource => identityResource) // or any other operator
      );
  }

  addApiResource(apiResource: ApiResource): Observable<ApiResource> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<ApiResource>(
      `${environment.adminApi}/api/v1/ApplicationResource/AddApiResource`,
      apiResource,
      { headers }
    );
  }

  updateApiResource(apiResource: ApiResource): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/ApplicationResource/UpdateApiResource`,
      apiResource,
      { headers }
    );
  }

  returnApiResourceClaims(
    request: DataSourceRequest,
    name: string
    ): Observable<DataSourceResponse<ApiResourceClaim[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<ApiResourceClaim[]>>(
      `${environment.adminApi}/api/v1/ApplicationResourceClaims/ReturnApiResourceClaims/${name}`,
      request,
      { headers }
    );
  }

  returnApiResourceClaim(
    identityClaimName: string,
    id: number
  ): Observable<ApiResourceClaim> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<ApiResourceClaim>(
        `${environment.adminApi}/api/v1/ApplicationResourceClaims/ReturnApiResourceClaim/${identityClaimName}/${id}`,
        { headers }
      )
      .pipe(map(identityResource => identityResource));
  }

  addApiResourceClaim(claim: ApiResourceClaim): Observable<ApiResourceClaim> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<ApiResourceClaim>(
      `${environment.adminApi}/api/v1/ApplicationResourceClaims/AddApiResourceClaim`,
      claim,
      { headers }
    );
  }

  updateApiResourceClaim(claim: ApiResourceClaim): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/ApplicationResourceClaims/UpdateApiResourceClaim`,
      claim,
      { headers }
    );
  }

  removeClaimsFromApiResource(
    claims: ApiResourceClaim[]
  ): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<number[]>(
      `${environment.adminApi}/api/v1/ApplicationResourceClaims/RemoveClaimsFromApiResource`,
      claims,
      { headers }
    );
  }
}
