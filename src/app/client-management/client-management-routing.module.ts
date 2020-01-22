import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientComponent } from './client/client.component';
import { ScopeListComponent } from './scope-list/scope-list.component';
import { ClientEditResolveService } from './resolvers/client-edit-resolve.service';
import { ScopeListAddComponent } from './scope-list-add/scope-list-add.component';
import { RedirectUrlListComponent } from './redirect-url-list/redirect-url-list.component';
import { ClientRedirectUrlComponent } from './redirect-url-edit/redirect-url-edit.component';
import { PostLogoutUrlListComponent } from './post-logout-url-list/post-logout-url-list.component';
import { ClientPostLogoutEditUrlComponent } from './post-logout-url-edit/post-logout-url-edit.component';
import { AllowedCorsUriListComponent } from './allowed-cors-url-list/allowed-cors-url-list.component';
import { ClientCorsOriginEditUrlComponent } from './allowed-cors-url-edit/allowed-cors-url-edit.component';
import { SecretListComponent } from './secret-list/secret-list.component';
import { ClientSecretEditComponent } from './secret-edit/secret-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    canActivate: [AuthGuardService],
    children: [
        { path: '', component: ClientListComponent},
        { path: ':mode', component: ClientEditComponent},
        { path: 'scope/:id', component: ScopeListComponent},
        { path: 'scope/:id/add', component: ScopeListAddComponent },
        { path: 'redirect-url/:id', component: RedirectUrlListComponent },
        { path: 'redirect-url/:id/:mode/:redirectUrlId', component: ClientRedirectUrlComponent },
        { path: 'post-logout-url/:id', component: PostLogoutUrlListComponent },
        { path: 'post-logout-url/:id/:mode/:postLogoutUrlId', component: ClientPostLogoutEditUrlComponent },
        { path: 'allowed-cors-url/:id', component: AllowedCorsUriListComponent},
        { path: 'allowed-cors-url/:id/:mode/:allowedCorsUrlId', component: ClientCorsOriginEditUrlComponent},
        { path: 'client-secret/:id', component: SecretListComponent},
        { path: 'client-secret/:id/:mode/:clientSecretId', component: ClientSecretEditComponent},
        { path: ':mode/:id', component: ClientEditComponent, resolve: { client : ClientEditResolveService} } ,
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagementRoutingModule { }
