import {KeycloakService,
        KeycloakEventType} from 'keycloak-angular';
import {RxStompService} from '@stomp/ng2-stompjs';
import {environment} from '../environments/environment';

export function keycloakServiceInitializer(keycloakService: KeycloakService,
                                           rxStompService: RxStompService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        keycloakService.keycloakEvents$.subscribe(event => {
          //console.log('event.type: ', event.type);

          switch (event.type) {
            case KeycloakEventType.OnAuthSuccess:
              //console.log('OnAuthSuccess: ok');

              keycloakService.getToken().then (
                (token: string) => {
                  environment.injectableRxStompConfig.connectHeaders = {"Authorization": "Bearer " + token};
                  rxStompService.configure(environment.injectableRxStompConfig);
                  rxStompService.activate();
                }
              )
              break;
            default:
              break;
          }
        });
        await keycloakService.init({
          config: environment.keycloakConfig,
          initOptions: {
//            onLoad: 'login-required',
              onLoad: 'check-sso',
              checkLoginIframe: false
          },
          bearerExcludedUrls: ['/assets']
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
