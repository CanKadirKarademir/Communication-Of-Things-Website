import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Roles } from './models';
import {
  ClientLayoutComponent,
  AdminLayoutComponent,
} from './components/layouts';
import {
  DashboardComponent,
  LoginComponent,
  UserListComponent,
  AddUserComponent,
  DeviceListComponent,
  AddDeviceComponent
} from './pages';
import { AuthGuard, AdminAuthGuard } from './utils/guards';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
    canActivateChild: [AuthGuard, AdminAuthGuard],
    children: [
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'User List',
          icon: 'fa fa-2x fa-address-book',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/add',
        component: AddUserComponent,
        data: {
          title: 'User Add',
          icon: 'fa fa-2x fa-home',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/profile',
        component: AddUserComponent,
        data: {
          title: 'Profile Edit',
          icon: 'fa fa-2x fa-home',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'user/edit/:Id',
        component: AddUserComponent,
        data: {
          title: 'User Edit',
          icon: 'fa fa-2x fa-home',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
          icon: 'fa fa-2x fa-home',
          authorize: [Roles.Root, Roles.Administrator, Roles.User],
        },
      },
      {
        path: 'devices',
        component: DeviceListComponent,
        data: {
          title: 'Device List',
          icon: 'fa fa-2x fa-bolt',
          authorize: [Roles.Root, Roles.Administrator, Roles.User],
        },
      },
      {
        path: 'device/add',
        component: AddDeviceComponent,
        data: {
          title: 'Device Add',
          icon: 'fa fa-2x fa-bolt',
          authorize: [Roles.Root, Roles.Administrator, Roles.User],
        },
      },
      {
        path: 'device/edit/:Id',
        component: AddDeviceComponent,
        data: {
          title: 'Device Edit',
          icon: 'fa fa-2x fa-bolt',
          authorize: [Roles.Root, Roles.Administrator, Roles.User],
        },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [];
