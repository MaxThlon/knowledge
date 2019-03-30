// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import {KeycloakConfig} from 'keycloak-angular';
import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'https://macmax:8443/auth',
  realm: 'Thlon',
  clientId: 'ThlonAngular'
  /*credentials: {
    secret: '07e62a1d-6d68-4c53-a43d-b46fd35b15d7'
  }*/
};

const injectableRxStompConfig: InjectableRxStompConfig = {
  brokerURL: 'wss://macmax:8443/stomp/websocket',
  //connectHeaders: {"Authorization": "Bearer Meu"},

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 200000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 200,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }
};

export const environment = {
  production: false,
  baseURL: 'https://macmax:8443/api',
  springrestURL: 'https://macmax:8443/springrest/api/',
  keycloakConfig: keycloakConfig,
  injectableRxStompConfig: injectableRxStompConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
