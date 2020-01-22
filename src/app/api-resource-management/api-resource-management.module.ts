import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiResourceManagementRoutingModule } from './api-resource-management-routing.module';
import { ApiResourceListComponent } from './api-resource-list/api-resource-list.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonControlsModuleModule } from '../common-controls-module/common-controls-module.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ApiResourceComponent } from './api-resource/api-resource.component';
import { ApiResourceEditComponent } from './api-resource-edit/api-resource-edit.component';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimListAddComponent } from './claim-list-add/claim-list-add.component';

@NgModule({
  declarations: [
    ApiResourceListComponent,
    ApiResourceComponent,
    ApiResourceEditComponent,
    ClaimListComponent,
    ClaimListAddComponent,
    // CollapseMenuAndTitleComponent
  ],
  imports: [
    CommonModule,
    ApiResourceManagementRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CommonControlsModuleModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ApiResourceManagementModule { }
