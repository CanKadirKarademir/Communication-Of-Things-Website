import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSearchFilterModule } from 'ng-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatModule } from '../../utils';
import {
  AdminSidebarComponent,
  AdminControlSidebarComponent,
  AdminHeaderComponent,
  AdminFooterComponent,
  AdminLayoutComponent,
  DialogWindowComponent,
  PasswordChangeComponent,
  PaginationComponent,
  PasswordControlWindowComponent,
} from '../../components';
import {
  DashboardComponent,
  UserListComponent,
  LoginComponent,
  AddUserComponent,
  DeviceListComponent,
  AddDeviceComponent
} from './';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    PasswordChangeComponent,
    PasswordControlWindowComponent,
    DialogWindowComponent,
    AdminControlSidebarComponent,
    AdminSidebarComponent,
    LoginComponent,
    PaginationComponent,
    UserListComponent,
    AddUserComponent,
    DeviceListComponent,
    AddDeviceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatModule,
    NgSearchFilterModule,
    NgxPaginationModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
})
export class AdminLayoutModule { }
