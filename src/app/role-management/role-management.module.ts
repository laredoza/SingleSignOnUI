import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleManagementRoutingModule } from './role-management-routing.module';
import { RoleListComponent } from './role-list/role-list.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonControlsModuleModule } from '../common-controls-module/common-controls-module.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './role/role.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { MatPaginatorModule, MatSortModule } from '@angular/material';

@NgModule({
  declarations: [RoleListComponent, RoleComponent, RoleEditComponent],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CommonControlsModuleModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class RoleManagementModule { }
