import {
  autoSubscribe,
  AutoSubscribeStore,
  StoreBase,
} from 'resub';

import { LastMessage } from './BluetoothDevices';
import { DeviceModel } from './Device';
import DevicesService, { SimpleResponse } from './DevicesService';

/**
 * The store for the device list.
 * @class DeviceStore
 * @extends StoreBase
 */
@AutoSubscribeStore
class DevicesStore extends StoreBase {
  // @TODO extract it to the proper component
  private static CODE_ICONS: { [ key: number ]: string } = {
    500: 'icons/error.png',
    200: 'icons/ok.png',
    300: 'icons/warning.png',
  };

  private devices: DeviceModel[] = new Array<DeviceModel>();
  private isloading: boolean = false;
  private lastMessage: LastMessage;

  /**
   * Retrieve a list of devices.
   * @param {string} type The type of device list to retrieve
   */
  public retrieveDevices(type: string = 'bluetooth') {
    this.isloading = true;

    return DevicesService.getDevices(type)
      .then((devices: DeviceModel[]) => {
        this.devices = this.devices.concat(devices);
        this.isloading = false;
        this.trigger(type);
      })
      .catch((err: Error) => {
        this.isloading = false;
        this.devices = [];
        this.lastMessage = {
          icon: DevicesStore.CODE_ICONS[500],
          message: err.message,
        };
        this.trigger();
      });
  }

  public pushToDevices(urlToMedia: string) {
    return DevicesService.streamToAllChromecasts(urlToMedia)
      .then((message: SimpleResponse) => {
        this.lastMessage = {
          icon: DevicesStore.CODE_ICONS[message.statusCode],
          message: message.messages.join(),
        };
        this.trigger();
      });
  }

  @autoSubscribe
  public getDevices() {
    return this.devices;
  }

  @autoSubscribe
  public getLastMessage() {
    return this.lastMessage;
  }

  @autoSubscribe
  public isLoading() {
    return this.isloading;
  }
}

export default new DevicesStore();
