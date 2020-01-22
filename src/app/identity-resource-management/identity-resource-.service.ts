import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable, from } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { MatSortable } from "@angular/material";
import { IdentityResource } from "./models/identity-resource";
import { IdentityResourceFilter } from "./models/identity-resource-filter";
import { IdentityResourceClaim } from "./models/identity-resource.claim";
import { DataSourceRequest } from '../Modules/dataSource-request';
import { DataSourceResponse } from '../Modules/dataSource-response';

@Injectable({
  providedIn: "root"
})
export class IdentityResourceService {
  filter: IdentityResourceFilter;
  sort: MatSortable;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.filter = { search: "" };
    this.sort = { id: "description", start: "asc" } as MatSortable;
  }

  returnIdentityResources(
    request: DataSourceRequest
  ): Observable<DataSourceResponse<IdentityResource[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<IdentityResource[]>>(
      `${environment.adminApi}/api/v1/IdentityResource/ReturnIdentityResources`,
      request,
      { headers }
    );
  }
      
  returnIdentityResource(name: string): Observable<IdentityResource> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<IdentityResource>(
        `${environment.adminApi}/api/v1/IdentityResource/ReturnIdentityResource/${name}`,
        { headers }
      )
      .pipe(
        map(identityResource => identityResource) // or any other operator
      );
  }

  addIdentityResource(
    identityResource: IdentityResource
  ): Observable<IdentityResource> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<IdentityResource>(
      `${environment.adminApi}/api/v1/IdentityResource/AddIdentityResource`,
      identityResource,
      { headers }
    );
  }

  updateIdentityResource(
    identityResource: IdentityResource
  ): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/IdentityResource/UpdateIdentityResource`,
      identityResource,
      { headers }
    );
  }

  returnIdentityResourceClaims(
    request: DataSourceRequest,
    name: string
    ): Observable<DataSourceResponse<IdentityResourceClaim[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<IdentityResourceClaim[]>>(
      `${environment.adminApi}/api/v1/IdentityResourceClaims/ReturnIdentityResourceClaims/${name}`,
      request,
      { headers }
    );
  }

  addIdentityResourceClaim(
    claim: IdentityResourceClaim
  ): Observable<IdentityResourceClaim> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<IdentityResourceClaim>(
      `${environment.adminApi}/api/v1/IdentityResourceClaims/AddIdentityResourceClaim`,
      claim,
      { headers }
    );
  }

  updateIdentityResourceClaim(
    claim: IdentityResourceClaim
  ): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/IdentityResourceClaims/UpdateIdentityResourceClaim`,
      claim,
      { headers }
    );
  }

  returnIdentityResourceClaim(
    identityClaimName: string,
    id: number
  ): Observable<IdentityResourceClaim> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<IdentityResourceClaim>(
        `${environment.adminApi}/api/v1/IdentityResourceClaims/ReturnIdentityResourceClaim/${identityClaimName}/${id}`,
        { headers }
      )
      .pipe(map(identityResource => identityResource));
  }

  removeClaimsFromIdentityResource(
    claims: IdentityResourceClaim[]
  ): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<number[]>(
      `${environment.adminApi}/api/v1/IdentityResourceClaims/RemoveClaimsFromIdentityResource`,
      claims,
      { headers }
    );
  }
}
