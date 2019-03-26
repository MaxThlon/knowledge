import {Component,
        OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-thlon-logout',
  template: ''
})
export class ThlonLogoutComponent implements OnInit {

  constructor(private keycloakService: KeycloakService,
              public router: Router) { }

  ngOnInit() {
    this.keycloakService.logout();
    this.router.navigate(['']);
  }
}
