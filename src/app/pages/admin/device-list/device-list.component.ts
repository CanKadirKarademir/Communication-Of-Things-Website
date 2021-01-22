import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Device } from 'src/app/models';
import { DeviceService, SocketService } from '../../../utils/services';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  constructor(
    private _deviceService: DeviceService,
    private _socketService: SocketService
  ) { }

  _socket = this._socketService.connection;
  devices: Array<Device>;
  searchText: string;
  paginationConfig = {
    id: 'userList',
    itemsPerPage: 20,
    currentPage: 1,
  };
  useDefault: boolean;

  async ngOnInit() {
    try {
      this.devices = <Array<Device>>await this._deviceService.listAsync();
    } catch (error) {
      this._deviceService.errorNotification(error);
    }
  }

  toggle(deviceSecret) {
    this._socket.emit('setToggleDeviceState', deviceSecret);
  }
}
