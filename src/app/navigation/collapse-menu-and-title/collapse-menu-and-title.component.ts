import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { NavItem } from '../nav-item';

@Component({
  selector: 'app-collapse-menu-and-title',
  templateUrl: './collapse-menu-and-title.component.html',
  styleUrls: ['./collapse-menu-and-title.component.scss']
})
export class CollapseMenuAndTitleComponent implements OnInit {
   public navItem: NavItem;

  constructor(public navService: NavService) { }

  ngOnInit() {
    this.navItem = new NavItem();
    this.navService.currentSideNavigation.subscribe((value) => {
      this.navItem = value;
    });
  }

}
