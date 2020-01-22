import { EventEmitter, Injectable } from "@angular/core";
import {
  Event,
  NavigationEnd,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Route
} from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { NavItem } from "./nav-item";
import { AuthService } from "../services/auth.service";

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  // todo: Store in local storage
  public opened: boolean;
  public navigationItems: BehaviorSubject<NavItem[]>;
  public header: BehaviorSubject<string>;
  public currentSideNavigation = new BehaviorSubject<NavItem>(undefined);

  constructor(private router: Router, private authService: AuthService) {
    this.navigationItems = new BehaviorSubject<NavItem[]>(new Array<NavItem>());
    this.header = new BehaviorSubject<string>("");
    this.opened = true;
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
        var currentNavItem = this.returnNavItems(
          this.navigationItems.value,
          this.returnRouterConfigPath()
        );
        if (currentNavItem) {
          this.currentSideNavigation.next(currentNavItem);
          this.header.next(currentNavItem.displayName);
        }
      }
    });
  }

  private returnRouterConfigPath(): object {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    if (route && route.snapshot && route.routeConfig) {
      return route.snapshot.routeConfig;
    } else {
      return null;
    }
  }

  private returnNavItems(navItems: NavItem[], routeConfig: Route): NavItem {
    if (routeConfig.path === "") {
      return this.returnNavItemsByName(navItems, routeConfig.component.name);
    } else {
      return this.returnNavItemsByUrl(navItems, routeConfig.path);
    }

    return null;
  }

  private returnNavItemsByUrl(navItems: NavItem[], url: string): NavItem {
    if (url === "") {
      url = "clients";
    }

    if (navItems.length > 0) {
      for (let index = 0; index < navItems.length; index++) {
        const navItem = navItems[index];

        if (navItem.route == url) {
          return navItem;
        } else {
          for (
            let indexChild = 0;
            indexChild < navItem.children.length;
            indexChild++
          ) {
            const child = navItem.children[indexChild];

            if (child.route === url) {
              return child;
            } else {
              const childResult = this.returnNavItemsByUrl(child.children, url);
              if (childResult) {
                return childResult;
              }
            }
          }
        }
      }
    }
    return null;
  }

  private returnNavItemsByName(navItems: NavItem[], name: string): NavItem {
    // if (name === "") {
    //   name = "clients";
    // }

    if (navItems.length > 0) {
      for (let index = 0; index < navItems.length; index++) {
        const navItem = navItems[index];

        if (navItem.componentName == name) {
          return navItem;
        } else {
          for (
            let indexChild = 0;
            indexChild < navItem.children.length;
            indexChild++
          ) {
            const child = navItem.children[indexChild];

            if (child.componentName === name) {
              return child;
            } else {
              const childResult = this.returnNavItemsByName(
                child.children,
                name
              );
              if (childResult) {
                return childResult;
              }
            }
          }
        }
      }
    }
    return null;
  }

  public closeNav() {
    this.appDrawer.close();
    this.opened = false;
  }

  public openNav() {
    this.appDrawer.open();
    this.opened = true;
  }

  public toggle() {
    this.appDrawer.toggle();
    this.opened = !this.opened;
  }

  public async loadNavigation(): Promise<NavItem[]> {
    return new Promise(async (resolve, reject) => {
      const newNavigationItems = new Array<NavItem>();

      await this.authService.returnUserDetails();
      const claims = this.authService.getClaims();

      let level1ChildNavigation = new NavItem();
      let level2ChildNavigation = new NavItem();
      let level3ChildNavigation = new NavItem();

      let navigationItem = new NavItem();

      if (claims.admin_clients) {
        navigationItem = new NavItem();
        navigationItem.displayName = "Client Management";
        navigationItem.iconName = "recent_actors";
        navigationItem.route = "clients";
        navigationItem.displayInMenu = true;
        navigationItem.componentName = "ClientListComponent";

        level1ChildNavigation = new NavItem();
        level1ChildNavigation.displayName = "Add";
        level1ChildNavigation.iconName = "add";
        level1ChildNavigation.route = "clients/no-interactive/add";
        level1ChildNavigation.displayInMenu = true;
        navigationItem.children.push(level1ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Add Service";
        level2ChildNavigation.iconName = "person_add_disabled";
        level2ChildNavigation.route = "clients/add-service";
        level2ChildNavigation.displayInMenu = true;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Resource Owner Password";
        level2ChildNavigation.iconName = "equalizer";
        level2ChildNavigation.route = "clients/add-resource";
        level2ChildNavigation.displayInMenu = true;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Add MVC - Open Id Hybrid";
        level2ChildNavigation.iconName = "web";
        level2ChildNavigation.route = "clients/add-mvc";
        level2ChildNavigation.displayInMenu = true;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Add Javascript";
        level2ChildNavigation.iconName = "language";
        level2ChildNavigation.route = "clients/add-javascript";
        level2ChildNavigation.displayInMenu = true;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Add Angular / React";
        level2ChildNavigation.iconName = "web";
        level2ChildNavigation.route = "clients/add-angular";
        level2ChildNavigation.displayInMenu = true;
        level1ChildNavigation.children.push(level2ChildNavigation);
        level1ChildNavigation = new NavItem();

        level1ChildNavigation.displayName = "Manage Clients";
        level1ChildNavigation.iconName = "business";
        level1ChildNavigation.route = "clients";
        level1ChildNavigation.displayInMenu = true;
        navigationItem.children.push(level1ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Manage Client Scopes";
        level2ChildNavigation.iconName = "web";
        level2ChildNavigation.route = "scope/:id";
        level2ChildNavigation.displayInMenu = false;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level3ChildNavigation = new NavItem();
        level3ChildNavigation.displayName = "Add Client Scopes";
        level3ChildNavigation.iconName = "web";
        level3ChildNavigation.route = "scope/:id/add";
        level3ChildNavigation.displayInMenu = false;
        level2ChildNavigation.children.push(level3ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Manage Redirect Uri's";
        level2ChildNavigation.iconName = "web";
        level2ChildNavigation.route = "redirect-url/:id";
        level2ChildNavigation.displayInMenu = false;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Manage Post Logout Uri's";
        level2ChildNavigation.iconName = "web";
        level2ChildNavigation.route = "post-logout-url/:id";
        level2ChildNavigation.displayInMenu = false;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Manage Cors Origin Uri's";
        level2ChildNavigation.iconName = "web";
        level2ChildNavigation.route = "allowed-cors-url/:id";
        level2ChildNavigation.displayInMenu = false;
        level1ChildNavigation.children.push(level2ChildNavigation);

        level2ChildNavigation = new NavItem();
        level2ChildNavigation.displayName = "Manage Client Secrets";
        level2ChildNavigation.iconName = "web";
        level2ChildNavigation.route = "client-secret/:id";
        level2ChildNavigation.displayInMenu = false;
        level1ChildNavigation.children.push(level2ChildNavigation);

        newNavigationItems.push(navigationItem);
      }

      if (claims.admin_api_resource || claims.admin_identity_resource) {
        navigationItem = new NavItem();
        navigationItem.displayName = "Resources Management";
        navigationItem.iconName = "recent_actors";
        navigationItem.displayInMenu = true;
        newNavigationItems.push(navigationItem);

        if (claims.admin_api_resource) {
          level1ChildNavigation = new NavItem();
          level1ChildNavigation.displayName = "Api Resources";
          level1ChildNavigation.iconName = "swap_horiz";
          level1ChildNavigation.displayInMenu = true;
          level1ChildNavigation.componentName = "ApiResourceListComponent";
          level1ChildNavigation.route = "/api-resources";

          navigationItem.children.push(level1ChildNavigation);

          level2ChildNavigation = new NavItem();
          level2ChildNavigation.displayName = "Manage Api Resource Claims";
          level2ChildNavigation.iconName = "web";
          level2ChildNavigation.route = "claims/:name";
          level2ChildNavigation.displayInMenu = false;
          level2ChildNavigation.componentName = "";
          level1ChildNavigation.children.push(level2ChildNavigation);
        }

        if (claims.admin_identity_resource) {
          level1ChildNavigation = new NavItem();
          level1ChildNavigation.displayName = "Identity Resources";
          level1ChildNavigation.iconName = "recent_actors";
          level1ChildNavigation.route = "identity-resources";
          level1ChildNavigation.displayInMenu = true;
          level1ChildNavigation.componentName = "IdentityResourceListComponent";
          navigationItem.children.push(level1ChildNavigation);
        }
      }

      if (claims.admin_users || claims.admin_roles) {
        navigationItem = new NavItem();
        navigationItem.displayName = "Identity Management";
        navigationItem.iconName = "recent_actors";
        navigationItem.displayInMenu = true;
        newNavigationItems.push(navigationItem);

        if (claims.admin_users) {
          level1ChildNavigation = new NavItem();
          level1ChildNavigation.displayName = "Users";
          level1ChildNavigation.iconName = "person";
          level1ChildNavigation.route = "users";
          level1ChildNavigation.displayInMenu = true;
          level1ChildNavigation.componentName = "UserListComponent";
          navigationItem.children.push(level1ChildNavigation);

          level2ChildNavigation = new NavItem();
          level2ChildNavigation.displayName = "Manage User Roles";
          level2ChildNavigation.iconName = "web";
          level2ChildNavigation.route = "groups/:id";
          level2ChildNavigation.displayInMenu = false;
          level1ChildNavigation.children.push(level2ChildNavigation);

          level3ChildNavigation = new NavItem();
          level3ChildNavigation.displayName = "Add User Roles";
          level3ChildNavigation.iconName = "web";
          level3ChildNavigation.route = "groups/:id/add";
          level3ChildNavigation.displayInMenu = false;
          level2ChildNavigation.children.push(level3ChildNavigation);

          level2ChildNavigation = new NavItem();
          level2ChildNavigation.displayName = "Manage User Claims";
          level2ChildNavigation.iconName = "web";
          level2ChildNavigation.route = "permissions/:id";
          level2ChildNavigation.displayInMenu = false;
          level1ChildNavigation.children.push(level2ChildNavigation);
        }

        if (claims.admin_roles) {
          level1ChildNavigation = new NavItem();
          level1ChildNavigation.displayName = "Roles";
          level1ChildNavigation.iconName = "group";
          level1ChildNavigation.route = "roles";
          level1ChildNavigation.displayInMenu = true;
          level1ChildNavigation.componentName = "RoleListComponent";
          navigationItem.children.push(level1ChildNavigation);
        }
      }

      this.navigationItems.next(newNavigationItems);

      resolve(newNavigationItems);
    });
  }
}
