import { TestBed, inject } from '@angular/core/testing';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, Router } from '@angular/router';

import { NavService } from './nav.service';
import { NavItemType } from './nav-item-type.enum';

const TEST_ROUTES: Routes = [
    {
      path: 'home',
      data: {
        navItem: {
          label: 'Home',
          type: NavItemType.BRAND,
        }
      }
    },
    {
      path: 'about',
      data: {
        navItem: {
          label: 'About',
          type: NavItemType.NAV,
        }
      }
    },
    {
      path: 'about2',
      data: {
        navItem: {
          label: 'More Info',
          type: NavItemType.NAV,
          parent: 'about'
        }
      }
    },
];

const FAKE_ROUTER = {
  config: TEST_ROUTES
};

describe('NavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NavService,
        { provide: Router, useValue: FAKE_ROUTER}]
    });
  });

  it('should load router config', inject([NavService], (service: NavService) => {
    expect(service.brandItem.label).toEqual('Home');
    expect(Object.keys(service.navCollection).length).toEqual(2);
  }));

  it('should add a nav item', inject([NavService], (service: NavService) => {
    const config = {
      label: 'Test',
      path: 'test',
      type: NavItemType.NAV
    };

    service.addItem(config);

    expect(service.navCollection[2]).toEqual(config);
  }));
});
