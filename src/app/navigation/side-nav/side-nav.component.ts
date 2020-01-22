import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavItem } from '../nav-item';
import { NavService } from '../nav.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('appDrawer', { static: true }) appDrawer: ElementRef;
  navItems: NavItem[] = [];
  watcher: Subscription;
  activeMediaQuery = '';
  constructor(
    public navService: NavService,
    private mediaObserver: MediaObserver) {
      this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
                this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
                if ( change.mqAlias == 'xs') {
                  navService.closeNav();
                } else {
                  navService.openNav();
                }
            });
    }

  async ngOnInit() {
    this.navService.navigationItems.subscribe((value) => {
      this.navItems = value;
    });
  }

  ngOnDestroy() {
        this.watcher.unsubscribe();
    }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}
