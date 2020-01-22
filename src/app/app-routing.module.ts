import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';

const routes: Routes = [
  {
      path: '',
      children: [],
      canActivate: [AuthGuardService]
  },
  {
        path: 'auth-callback',
        component: AuthCallbackComponent
  },
  {
        path: 'api-resources',
        loadChildren: () => import('./api-resource-management/api-resource-management.module').then(m => m.ApiResourceManagementModule),
        data: { preload: true },
        canActivate: [AuthGuardService]
  },
  {
        path: 'clients',
        loadChildren: () => import('./client-management/client-management.module').then(m => m.ClientManagementModule),
        data: { preload: true },
        canActivate: [AuthGuardService]
  },
  {
        path: 'identity-resources',
        loadChildren: () => import('./identity-resource-management/identity-resource-management.module').then(m => m.IdentityResourceManagementModule),
        data: { preload: true },
        canActivate: [AuthGuardService]
  },
  {
        path: 'roles',
        loadChildren: () => import('./role-management/role-management.module').then(m => m.RoleManagementModule),
        data: { preload: true },
        canActivate: [AuthGuardService]
  },
  {
        path: 'users',
        loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule),
        data: { preload: true },
        canActivate: [AuthGuardService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
