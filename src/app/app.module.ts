import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { MaterialModule } from './material-module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TopNavComponent } from './navigation/top-nav/top-nav.component';
import { MenuListItemComponent } from './navigation/menu-list-item/menu-list-item.component';
import { NavigationMenuComponent } from './navigation/navigation-menu/navigation-menu.component';
import { NavService } from './navigation/nav.service';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { ClientManagementModule } from './client-management/client-management.module';
import { ApiResourceManagementModule } from './api-resource-management/api-resource-management.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
    TopNavComponent,
    MenuListItemComponent,
    SideNavComponent,
    NavigationMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ClientManagementModule,
    ApiResourceManagementModule,
    RouterModule
  ],
  providers: [AuthGuardService, AuthService, NavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
