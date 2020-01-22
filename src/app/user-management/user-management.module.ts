import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonControlsModuleModule } from '../common-controls-module/common-controls-module.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGroupListComponent } from './user-group-list/user-group-list.component';
import { UserPermissionListComponent } from './user-permission-list/user-permission-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { UserEditResolveService } from './resolvers/user-edit-resolve.service';
import { UserGroupListAddComponent } from './user-group-list-add/user-group-list-add.component';
import { UserPermissionEditComponent } from './user-permission-edit/user-permission-edit.component';
import { UserPermissionEditResolveService } from './resolvers/user-permission-edit-resolve.service';

@NgModule({
  declarations: [
    UserListComponent,
    UserComponent,
    UserEditComponent,
    UserGroupListComponent,
    UserPermissionListComponent,
    ChangePasswordComponent,
    UserGroupListAddComponent,
    UserPermissionEditComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CommonControlsModuleModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ],
    providers: [
      UserEditResolveService,
      UserPermissionEditResolveService
    ]
})
export class UserManagementModule { }
