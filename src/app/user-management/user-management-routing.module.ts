import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserEditResolveService } from './resolvers/user-edit-resolve.service';
import { UserService } from './user.service';
import { RoleListResolveService } from './resolvers/role-list-resolve.service';
import { UserGroupListAddComponent } from './user-group-list-add/user-group-list-add.component';
import { RoleListAddResolveService } from './resolvers/role-list-add-resolve.service';
import { UserPermissionEditComponent } from './user-permission-edit/user-permission-edit.component';
import { UserPermissionEditResolveService } from './resolvers/user-permission-edit-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [AuthGuardService],
    children: [
        { path: '', component: UserListComponent},
        { path: 'groups/:id', component: UserGroupListComponent, resolve: { roles : RoleListResolveService}},
        { path: 'groups/:id/add', component: UserGroupListAddComponent, resolve: { roles : RoleListAddResolveService}},
        { path: 'permissions/:id', component: UserPermissionListComponent },
        { path: 'permissions/:id/:mode', component: UserPermissionEditComponent },
        { path: 'permissions/:id/:mode/:type', component: UserPermissionEditComponent, resolve: { claim : UserPermissionEditResolveService } },
        { path: 'change-password/:id', component: ChangePasswordComponent, resolve: { user : UserEditResolveService }},
        { path: ':mode', component: UserEditComponent},
        { path: ':mode/:id', component: UserEditComponent, resolve: { user : UserEditResolveService }}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [UserEditResolveService, UserService]
})
export class UserManagementRoutingModule { }
