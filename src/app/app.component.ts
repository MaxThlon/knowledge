import {Component,
        OnInit,
        ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {KeycloakProfile} from 'keycloak-js';
import {KeycloakService} from 'keycloak-angular';
import {EThlonMenuItemType,
        ThlonMenuItemList} from 'thlon-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'knowledge';
  userDetails: KeycloakProfile;

  menuItemList: ThlonMenuItemList = [
    {
      menuItemType: EThlonMenuItemType.Branch,
      translation: "Group",
      iconName: "group",
      children: [
        {
          menuItemType: EThlonMenuItemType.Route,
          translation: "GroupList",
          iconName: "group",
          route: "grouplist"
        },
        {
          menuItemType: EThlonMenuItemType.Route,
          translation: "GroupList",
          iconName: "group2",
          route: "grouplist2"
        }
      ]
    },
    {
      menuItemType: EThlonMenuItemType.Route,
      translation: "Logout",
      iconName: "logout",
      route: "logout"
    }];

  constructor(private translate: TranslateService,
              private keycloakService: KeycloakService) {
    translate.setDefaultLang('fr');
  }

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
    }
  }

  async doLogout() {
    await this.keycloakService.logout();
  }
}
