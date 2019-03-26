import {BrowserModule} from '@angular/platform-browser';
import {NgModule,
        APP_INITIALIZER} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule} from '@angular/material';
import {HttpClientModule,
        HttpClient} from '@angular/common/http';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TranslateModule,
        TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader } from '@ngx-translate/http-loader';
import {KeycloakService,
        KeycloakAngularModule} from 'keycloak-angular';
import {InjectableRxStompConfig,
        RxStompService,
        rxStompServiceFactory} from '@stomp/ng2-stompjs';

import {keycloakServiceInitializer} from './app-initilizer';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppAuthGuard} from './app.authguard';
import {AppComponent} from './app.component';
import {ThlonMenuModule} from 'thlon-menu';
import {KnwlGroupListComponent} from './knwl-group/components/knwl-group-list/knwl-group-list.component';
import {ThlonLogoutComponent} from './thlon-logout/thlon-logout.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ScrollingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ThlonMenuModule
  ],
  declarations: [
    AppComponent,
    KnwlGroupListComponent,
    ThlonLogoutComponent,
  ],
  providers: [
    RxStompService,
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakServiceInitializer,
      multi: true,
      deps: [KeycloakService,
             RxStompService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
