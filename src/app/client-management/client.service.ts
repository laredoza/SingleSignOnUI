import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Observable, from } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Client } from "./models/client";
import { ClientFilter } from "./models/client-filter";
import { MatSortable } from "@angular/material";
import { DataSourceRequest } from "../Modules/dataSource-request";
import { DataSourceResponse } from "../Modules/dataSource-response";
import { ClientScope } from "./models/client-scope";
import { ToAddDto } from '../Modules/to-add-dto';
import { ClientRedirectUri } from './models/client-redirect-uri';
import { ClientPostLogoutUri } from './models/client-post-logout-uri';
import { ClientCorsUri } from './models/client-cors-uri';
import { ClientSecret } from './models/client-secret';

@Injectable({
  providedIn: "root"
})
export class ClientService {
  filter: ClientFilter;
  sort: MatSortable;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.filter = { search: "" };
    this.sort = { id: "description", start: "asc" } as MatSortable;
  }

  returnClients(
    request: DataSourceRequest
  ): Observable<DataSourceResponse<Client[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<Client[]>>(
      `${environment.adminApi}/api/v1/Client/ReturnClients`,
      request,
      { headers }
    );
  }

  returnClient(id: number): Observable<Client> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .get<Client>(
        `${environment.adminApi}/api/v1/Client/ReturnClientAsync/${id}`,
        { headers }
      )
      .pipe(map(identityResource => identityResource));
  }

  addClient(client: Client): Observable<Client> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<Client>(
      `${environment.adminApi}/api/v1/Client/AddClientAsync`,
      client,
      { headers }
    );
  }

  updateClient(client: Client): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/Client/UpdateClientAsync`,
      client,
      { headers }
    );
  }

  returnClientScopes(
    request: DataSourceRequest,
    clientId: number
  ): Observable<DataSourceResponse<ClientScope[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<ClientScope[]>>(
      `${environment.adminApi}/api/v1/ClientScope/ReturnClientScopesAsync/${clientId}`,
      request,
      { headers }
    );
  }

  returnScopesToAddForClient(request: DataSourceRequest, clientId: number): Observable<DataSourceResponse<ToAddDto[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http
      .post<DataSourceResponse<ToAddDto[]>>(
        `${environment.adminApi}/api/v1/ClientScope/ReturnScopesForClientAsync/${clientId}`,request,{ headers }
      )
      .pipe(
        map(role => role) // or any other operator
      );
  }

  addScopesToClient(clientId: number, scopes: string[]): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<boolean>(
      `${environment.adminApi}/api/v1/ClientScope/AddScopesToClient/${clientId}`,
      scopes,
      { headers }
    );
  }

  removeScopesFromClient(scopes: ClientScope[]): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<number[]>(
      `${environment.adminApi}/api/v1/ClientScope/RemoveScopeFromClaims`,
      scopes,
      { headers }
    );
  }

  returnClientRedirectUris(
    request: DataSourceRequest,
    clientId: number
  ): Observable<DataSourceResponse<ClientRedirectUri[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<ClientRedirectUri[]>>(
      `${environment.adminApi}/api/v1/ClientRedirect/ReturnClientRedirectUrisAsync/${clientId}`,
      request,
      { headers }
    );
  }

  addRedirectUriToClient(clientId: number, redirectUrl: ClientRedirectUri): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<boolean>(
      `${environment.adminApi}/api/v1/ClientRedirect/AddRedirectUriToClient/${clientId}`,
      redirectUrl,
      { headers }
    );
  }

  removeRedirectUrisFromClient(redirectUris: ClientRedirectUri[]): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<number[]>(
      `${environment.adminApi}/api/v1/ClientRedirect/RemoveRedirectUrisFromClaims`,
      redirectUris,
      { headers }
    );
  }

  returnClientRedirectUri(
    clientId: number,
    redirectId: number
  ): Observable<ClientRedirectUri> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.get<ClientRedirectUri>(
      `${environment.adminApi}/api/v1/ClientRedirect/ReturnClientRedirectUriAsync/${clientId}/${redirectId}`, { headers }
    );
  }

  updateClientRedirectUri(redirectUrl: ClientRedirectUri): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/ClientRedirect/UpdateClientRedirectUriAsync`,
      redirectUrl,
      { headers }
    );
  }

  returnClientPostLogoutUris(
    request: DataSourceRequest,
    clientId: number
  ): Observable<DataSourceResponse<ClientPostLogoutUri[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<ClientPostLogoutUri[]>>(
      `${environment.adminApi}/api/v1/ClientPostLogout/ReturnClientPostLogoutUrisAsync/${clientId}`,
      request,
      { headers }
    );
  }

  returnClientPostLogoutUri(
    clientId: number,
    postLogoutId: number
  ): Observable<ClientPostLogoutUri> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.get<ClientPostLogoutUri>(
      `${environment.adminApi}/api/v1/ClientPostLogout/ReturnClientPostLogoutUriAsync/${clientId}/${postLogoutId}`, { headers }
    );
  }

  addPostLogoutUriToClient(clientId: number, postLogoutRedirectUri: ClientPostLogoutUri): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<boolean>(
      `${environment.adminApi}/api/v1/ClientPostLogout/AddPostLogoutUriToClient/${clientId}`,
      postLogoutRedirectUri,
      { headers }
    );
  }

  removePostLogoutUrisFromClient(redirectUris: ClientPostLogoutUri[]): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<number[]>(
      `${environment.adminApi}/api/v1/ClientPostLogout/RemovePostLogoutsFromClaims`,
      redirectUris,
      { headers }
    );
  }

  updateClienPostLogoutUri(postLogoutRedirectUri: ClientPostLogoutUri): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/ClientPostLogout/UpdateClientPostLogoutUriAsync`,
      postLogoutRedirectUri,
      { headers }
    );
  }

  returnCorsUris(
    request: DataSourceRequest,
    clientId: number
  ): Observable<DataSourceResponse<ClientCorsUri[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<ClientCorsUri[]>>(
      `${environment.adminApi}/api/v1/ClientCors/ReturnClientCorsUrisAsync/${clientId}`,
      request,
      { headers }
    );
  }

  returnCorsUri(
    clientId: number,
    corsOriginId: number
  ): Observable<ClientCorsUri> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.get<ClientCorsUri>(
      `${environment.adminApi}/api/v1/ClientCors/ReturnClientCorsUrisAsync/${clientId}/${corsOriginId}`, { headers }
    );
  }

  addCorsOriginToClient(clientId: number, corsOriginUri: ClientCorsUri): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<boolean>(
      `${environment.adminApi}/api/v1/ClientCors/AddCorsOriginToClient/${clientId}`,
      corsOriginUri,
      { headers }
    );
  }

  removeCorsOriginUrisFromClient(redirectUris: ClientCorsUri[]): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<number[]>(
      `${environment.adminApi}/api/v1/ClientCors/RemoveCorsOriginFromClaims`,
      redirectUris,
      { headers }
    );
  }

  updateClientCorsOriginUri(corsUri: ClientCorsUri): Observable<number> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.put<number>(
      `${environment.adminApi}/api/v1/ClientCors/UpdateClientCorsOriginAsync`,
      corsUri,
      { headers }
    );
  }
  
  returnClientSecrets(
    request: DataSourceRequest,
    clientId: number
  ): Observable<DataSourceResponse<ClientSecret[]>> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<DataSourceResponse<ClientSecret[]>>(
      `${environment.adminApi}/api/v1/ClientSecret/ReturnClientSecretsAsync/${clientId}`,
      request,
      { headers }
    );
  }

  addClientSecretToClient(clientId: number, clientSecret: ClientSecret): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });
    return this.http.post<boolean>(
      `${environment.adminApi}/api/v1/ClientSecret/AddSecretToClient/${clientId}`,
      clientSecret,
      { headers }
    );
  }

  removeSecretFromClient(redirectUris: ClientSecret[]): Observable<number[]> {
    const headers = new HttpHeaders({
      Authorization: this.authService.getAuthorizationHeaderValue()
    });

    return this.http.post<number[]>(
      `${environment.adminApi}/api/v1/ClientSecret/RemoveSecretsFromClaims`,
      redirectUris,
      { headers }
    );
  }
}