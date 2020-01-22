import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientManagementRoutingModule } from './client-management-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonControlsModuleModule } from '../common-controls-module/common-controls-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientComponent } from './client/client.component';
import { ScopeListComponent } from './scope-list/scope-list.component';
import { MatPaginatorModule, MatSortModule } from '@angular/material';
import { ScopeListAddComponent } from './scope-list-add/scope-list-add.component';
import { RedirectUrlListComponent } from './redirect-url-list/redirect-url-list.component';
import { ClientRedirectUrlComponent } from './redirect-url-edit/redirect-url-edit.component';
import { PostLogoutUrlListComponent } from './post-logout-url-list/post-logout-url-list.component';
import { ClientPostLogoutEditUrlComponent } from './post-logout-url-edit/post-logout-url-edit.component';
import { AllowedCorsUriListComponent } from './allowed-cors-url-list/allowed-cors-url-list.component';
import { ClientCorsOriginEditUrlComponent } from './allowed-cors-url-edit/allowed-cors-url-edit.component';
import { SecretListComponent } from './secret-list/secret-list.component';
import { ClientSecretEditComponent } from './secret-edit/secret-edit.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientEditComponent,
    ClientComponent,
    ScopeListComponent,
    ScopeListAddComponent,
    RedirectUrlListComponent,
    ClientRedirectUrlComponent,
    PostLogoutUrlListComponent,
    ClientPostLogoutEditUrlComponent,
    AllowedCorsUriListComponent,
    ClientCorsOriginEditUrlComponent,
    SecretListComponent,
    ClientSecretEditComponent
  ],
  imports: [
    CommonModule,
    ClientManagementRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    CommonControlsModuleModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ClientManagementModule { }
