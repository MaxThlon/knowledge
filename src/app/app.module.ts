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
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {KeycloakAngularModule,
        KeycloakService} from 'keycloak-angular';
import {RxStompService} from '@stomp/ng2-stompjs';

import {ThlonKeycloakModule,
        keycloakServiceInitializer} from 'thlon-keycloak';
import {keycloakStompServiceInitializer} from 'thlon-stomp';
import {ThlonMenuModule} from 'thlon-menu';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    KeycloakAngularModule,
    ThlonKeycloakModule,
    ThlonMenuModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    RxStompService,
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloakService: KeycloakService) => keycloakServiceInitializer(environment.keycloakConfig,
                                                                                   keycloakService),
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (keycloakService: KeycloakService,
                   rxStompService: RxStompService) => keycloakStompServiceInitializer(keycloakService,
                                                                                      environment.injectableRxStompConfig,
                                                                                      rxStompService),
      multi: true,
      deps: [KeycloakService,
             RxStompService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
