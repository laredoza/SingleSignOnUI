import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { NavItem } from "../nav-item";
import { Router, ActivatedRoute } from "@angular/router";
import { NavService } from "../nav.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

@Component({
  selector: "app-menu-list-item",
  templateUrl: "./menu-list-item.component.html",
  styleUrls: ["./menu-list-item.component.scss"],
  animations: [
    trigger("indicatorRotate", [
      state("collapsed", style({ transform: "rotate(0deg)" })),
      state("expanded", style({ transform: "rotate(180deg)" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4,0.0,0.2,1)")
      )
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean;
  @HostBinding("attr.aria-expanded") ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;

  constructor(
    public navService: NavService,
    public router: Router,
    route: ActivatedRoute
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    // this.navService.currentSideNavigation.subscribe((navItem: NavItem) => {
        // this.navService.header.next(this.item.displayName);
    //   if (this.item.route && url) {
    //     this.expanded = url.indexOf(`/${this.item.route}`) === 0;
    //     this.ariaExpanded = this.expanded;
    //     if (this.expanded) {
    //       this.navService.currentSideNavigation.next(this.item);
    //     }
    //   }
    // });
  }

  onItemSelected(item: NavItem) {
    let hasChildren = this.hasChildren(item.children);

    if (!hasChildren) {
      this.navService.currentSideNavigation.next(this.item);
      this.router.navigate([item.route]);
    } else {
      this.expanded = !this.expanded;
    }
  }

  hasChildren(children: NavItem[]): boolean {
    var result = this.returnValidChildren(children);
    return result.length > 0;
  }

  returnValidChildren(children: NavItem[]): NavItem[] {
    let result = new Array<NavItem>();

    children.forEach(navItem => {
      if (navItem.displayInMenu && navItem.displayInMenu === true) {
        result.push(navItem);
      }
    });

    return result;
  }
}
