import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiResourceListComponent } from './api-resource-list/api-resource-list.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ApiResourceComponent } from './api-resource/api-resource.component';
import { ApiResourceEditComponent } from './api-resource-edit/api-resource-edit.component';
import { ApiResourceResolveService } from './resolvers/api-resource-resolve.service';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimListAddComponent } from './claim-list-add/claim-list-add.component';
import { ApiClaimEditResolverService } from './resolvers/api-claim-edit-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ApiResourceComponent,
    canActivate: [AuthGuardService],
    children: [
        { path: '', component: ApiResourceListComponent},
        { path: 'claims/:name/add', component: ClaimListAddComponent},
        { path: 'claims/:name/edit/:id', component: ClaimListAddComponent, resolve: { apiResourceClaim : ApiClaimEditResolverService}},
        { path: 'claims/:name', component: ClaimListComponent },
        { path: ':mode', component: ApiResourceEditComponent},
        { path: ':mode/:name', component: ApiResourceEditComponent, resolve: { apiResource : ApiResourceResolveService }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiResourceManagementRoutingModule { }
