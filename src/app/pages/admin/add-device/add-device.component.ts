import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Device } from 'src/app/models';
import { DeviceService, LanguageService } from 'src/app/utils';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _deviceService: DeviceService,
    private _activatedRoute: ActivatedRoute,
    private _languageService: LanguageService,
    private _dialog: MatDialog,
    public _router: Router,
  ) { }

  _passwordShowHide: boolean = false;
  _model: Device = new Device();
  _action: Function;

  async ngOnInit() {
    const Id = this._activatedRoute.snapshot.paramMap.get('Id');
    if (Id != null) {
      try {
        this._model = <any>await this._deviceService.findAsync(Id);
      } catch (error) {
        this._deviceService.errorNotification(error);
        this._router.navigateByUrl('admin');
      }
      this._action = this.updateDeviceActionAsync;
    } else {
      this._action = this.insertDeviceActionAsync;
    }
  }
  async onSave(deviceForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };

    if (deviceForm.valid) {
      this._translateService
        .get('Device registration is complete')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(deviceForm))) return;
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }

    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }

  async insertDeviceActionAsync(deviceForm: NgForm) {
    try {
      await this._deviceService.insertAsync(deviceForm.value);
      deviceForm.resetForm();
      return true;
    } catch (error) {
      this._deviceService.errorNotification(error);
      return false;
    }
  }

  async updateDeviceActionAsync(deviceForm: NgForm) {
    try {
      console.log('update veri name', deviceForm.value);
      console.log('update Id name', parseInt(
        this._activatedRoute.snapshot.paramMap.get('Id')
      ));
      await this._deviceService.updateAsync(
        Object.assign(deviceForm.value, {
          Id: parseInt(
            this._activatedRoute.snapshot.paramMap.get('Id')
          ),
        })
      );
      return true;
    } catch (error) {
      this._deviceService.errorNotification(error);
      return false;
    }
  }
}
