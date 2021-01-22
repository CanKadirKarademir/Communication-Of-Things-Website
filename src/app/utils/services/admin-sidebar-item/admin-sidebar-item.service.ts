import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../models/';

@Injectable({
  providedIn: 'root',
})
export class AdminSidebarItemService {
  constructor(private _router: Router) { }

  _url = this._router.routerState.snapshot.url;
  menu: Array<object> = [
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      link: '',
    },
    {
      title: 'User Transactions',
      icon: 'fa fa-user',
      linkActive: ['/users', '/user/add'],
      submenuShowHide: this.getChildUrlActiveState(['user', 'users']),
      submenu: [
        {
          title: 'User List',
          icon: 'fa fa-address-book',
          link: '/users',
        },
        {
          title: 'User Add',
          icon: 'fa fa-user-plus',
          link: '/user/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator],
    },
    {
      title: 'Device Transactions',
      icon: 'fa fa-bolt',
      linkActive: ['/devices', '/device/add'],
      submenuShowHide: this.getChildUrlActiveState(['device', 'devices']),
      submenu: [
        {
          title: 'Device List',
          icon: 'fa fa-bolt',
          link: '/devices',
        },
        {
          title: 'Device Add',
          icon: 'fa fa-bolt',
          link: '/device/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator],
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
