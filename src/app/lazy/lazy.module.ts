import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ThlonGroupModule,
        ThlonGroupComponent} from 'thlon-group';

@NgModule({
  imports: [
    ThlonGroupModule,
    RouterModule.forChild([
      {
        path: '',
        component: ThlonGroupComponent,
        pathMatch: 'full'
      }
    ])
  ]
})
export class LazyModule {}
