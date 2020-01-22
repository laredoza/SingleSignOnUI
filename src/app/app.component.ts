import { Component, ChangeDetectorRef, OnInit, OnDestroy, ViewChild, ElementRef, VERSION } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router, Event } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from './navigation/nav-item';
import { NavService } from './navigation/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  isIframe: boolean;
  routeIsLoading = false;

  private _mobileQueryListener: () => void;
  private subscription: Subscription;

  
  version = VERSION;
  

  constructor(
      //https://stackblitz.com/edit/dynamic-nested-sidenav-menu?file=app%2Fapp.component.scss
      //https://angular.io/guide/lazy-loading-ngmodules
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      // private broadcastService: BroadcastService,
      // private authService: AuthService,
      private router: Router,
      // public printService: PrintService,
      private navService: NavService
  ) {
      // This is to avoid reload during acquireTokenSilent() because of hidden iframe
      this.isIframe = window !== window.parent && !window.opener;

      this.mobileQuery = media.matchMedia('(max-width: 960px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

      this.router.events.subscribe( (event: Event) => {
          switch (true) {
              case event instanceof NavigationStart: {
                  this.routeIsLoading = true;
                  break;
              }
              case event instanceof NavigationCancel:
              case event instanceof NavigationError: {
                  this.routeIsLoading = false;
                  break;
              }
              case event instanceof NavigationEnd: {
                this.routeIsLoading = false;
                //  this.currentUrl.next(event.urlAfterRedirects);

                // var currentNav = this.navService.navigationItems.value.reduce(item => {
                // if (item.route == (event as NavigationEnd).url)
                //     {
                //         return item;
                //     }
                //     else
                //     {
                //         if (item.children && item.children.length > 0)
                //         {
                //             item.children.forEach(child => {
                //                 if (child.route == (event as NavigationEnd).url)
                //                 {
                //                     return child;
                //                 }
                //                 else
                //                 {
                //                 var a = "";
                //                 }
                //             });
                //         }
                //         else
                //         {
                //             var c = "";

                //         }
                //     }
                // });

                break;
              }
              default:
                  break;
          }
      });
  }

  ngOnInit(): void {
      // this.broadcastService.subscribe('msal:loginFailure', payload => {
      //     this.authService.logout();
      // });

      // this.broadcastService.subscribe('msal:loginSuccess', payload => {
      //     // console.log('login success ' + JSON.stringify(payload));
      // });
  }

  ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);

      // this.broadcastService.getMSALSubject().next(1);
      // if (this.subscription) {
      //     this.subscription.unsubscribe();
      // }
  }

  
}
