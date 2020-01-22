import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentityResourceManagementRoutingModule } from './identity-resource-management-routing.module';
import { IdentityResourceListComponent } from './identity-resource-list/identity-resource-list.component';
import { CommonControlsModuleModule } from '../common-controls-module/common-controls-module.module';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { IdentityResourceComponent } from './identity-resource/identity-resource.component';
import { IdentityResourceEditComponent } from './identity-resource-edit/identity-resource-edit.component';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { ClaimsListComponent } from './claim-list/claim-list.component';
import { ClaimsListAddComponent } from './claims-list-add/claims-list-add.component';


@NgModule({
  declarations: [IdentityResourceListComponent, IdentityResourceComponent , IdentityResourceEditComponent, ClaimsListComponent, ClaimsListAddComponent],
  imports: [
    CommonModule,
    IdentityResourceManagementRoutingModule,
    CommonControlsModuleModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class IdentityResourceManagementModule { }
