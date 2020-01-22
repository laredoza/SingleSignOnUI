export class NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
  displayInMenu: boolean;
  componentName: string;

  constructor()
  {
    this.children = new Array<NavItem>();
  }
}