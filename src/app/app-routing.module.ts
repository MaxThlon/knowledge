import {NgModule} from '@angular/core';
import {Routes,
        RouterModule} from '@angular/router';

import {AppAuthGuard} from 'thlon-keycloak';
import {ThlonLogoutComponent} from 'thlon-keycloak';
//import {ThlonGroupComponent} from 'thlon-group';

const routes: Routes = [
  //  {
  //    path: '',
  //    redirectTo: '/home',
  //    pathMatch: 'full'
  //  },
  {
    path: 'grouplist',
    //component: ThlonGroupComponent,
    loadChildren: './lazy/lazy.module#LazyModule',
    canActivate: [AppAuthGuard]
  },
  {
    path: 'logout',
    component: ThlonLogoutComponent,
    canActivate: [AppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
