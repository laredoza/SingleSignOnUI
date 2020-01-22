import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { IdentityResourceListComponent } from './identity-resource-list/identity-resource-list.component';
import { IdentityResourceComponent } from './identity-resource/identity-resource.component';
import { IdentityResourceEditComponent } from './identity-resource-edit/identity-resource-edit.component';
import { IdentityResourceResolveService } from './resolvers/identity-resource-resolve.service';
import { ClaimsListComponent } from './claim-list/claim-list.component';
import { ClaimsListAddComponent } from './claims-list-add/claims-list-add.component';
import { IdentityResourcePermissionEditResolveService } from './resolvers/identity-resource-permission-edit-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: IdentityResourceComponent,
    canActivate: [AuthGuardService],
    children: [
        { path: '', component: IdentityResourceListComponent},
        { path: 'claims/:name/add', component: ClaimsListAddComponent},
        { path: 'claims/:name/:mode/:id', component: ClaimsListAddComponent, resolve: { identityResourceClaim : IdentityResourcePermissionEditResolveService}},
        { path: 'claims/:name', component: ClaimsListComponent },
        { path: ':mode', component: IdentityResourceEditComponent},
        { path: ':mode/:name', component: IdentityResourceEditComponent, resolve: { identityResource : IdentityResourceResolveService }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityResourceManagementRoutingModule { }
