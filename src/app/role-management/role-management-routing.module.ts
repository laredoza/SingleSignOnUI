import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleListComponent } from './role-list/role-list.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { RoleComponent } from './role/role.component';
import { RoleManagementResolveService } from './role-management-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
    canActivate: [AuthGuardService],
    children: [
        { path: '', component: RoleListComponent},
        { path: ':mode', component: RoleEditComponent},
        { path: ':mode/:id', component: RoleEditComponent, resolve: { role : RoleManagementResolveService }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
