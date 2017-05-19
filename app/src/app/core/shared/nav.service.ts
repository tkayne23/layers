import { Router, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { NavItemConfig } from './nav-item-config.interface';
import { NavItemType } from './nav-item-type.enum';

interface NavItem extends NavItemConfig {
  path: string;
  children?: NavItem[];
}

@Injectable()
export class NavService {
  brandItem: NavItem;
  actionCollection: NavItem[] = [];
  navCollection: NavItem[] = [];

  constructor(private router: Router) {
    router.config.forEach(route => this.checkRoute(route));
  }

  private checkRoute(route: Route, prefix?: string) {
    if (route.data) {
      const config = route.data['navItem'];


      if (config) {
        this.addItem({
          path: prefix ? `${prefix}/${route.path}` : route.path,
          ...config
        });
      }
    }

    if (route.children) {
      route.children.forEach(child => this.checkRoute(child, route.path));
    }
  }

  public get publicNavCollection() {
    return this.navCollection.filter(item => !item.private);
  }

  public get privateNavCollection() {
    return this.navCollection.filter(item => item.private);
  }

  public get publicActionCollection() {
    return this.actionCollection.filter(item => !item.private);
  }

  public get privateActionCollection() {
    return this.actionCollection.filter(item => item.private);
  }

  public addItem(item: NavItem) {
    switch (item.type) {
      case NavItemType.BRAND: {
        this.brandItem = item;
        break;
      }
      case NavItemType.ACTION: {
        this.actionCollection.push(item);
        break;
      }
      case NavItemType.NAV: {
        this.navCollection.push(item);
        break;
      }
    }
  }
}
