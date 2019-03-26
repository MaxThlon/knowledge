import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppAuthGuard } from './app.authguard';
import { ThlonLogoutComponent } from './thlon-logout/thlon-logout.component';
import { KnwlGroupListComponent } from './knwl-group/components/knwl-group-list/knwl-group-list.component';

const routes: Routes = [
  //  {
  //    path: '',
  //    redirectTo: '/home',
  //    pathMatch: 'full'
  //  },
  {
    path: 'grouplist',
    component: KnwlGroupListComponent,
    canActivate: [AppAuthGuard]
  }, {
    path: 'grouplist2',
    component: KnwlGroupListComponent,
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
