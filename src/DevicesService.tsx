import { GenericRestClient } from 'simplerestclients';
import * as SyncTasks from 'synctasks';

import { DeviceModel } from './Device';

/**
 * Simple response interface
 *
 * Generic message model from the API
 *
 * @example
 * {
 *   message: {
 *      log: 'some logs',
 *      error: 'some errors',
 *      warning: 'some wrnings',
 *   },
 *   statusCode: 0,
 * }
 */
export interface SimpleResponse {
  messages: string[];
  statusCode: number;
}

/**
 * Service for calling the devices API.
 * Allows to retrieve the list of Bluetooth devices and Chromecasts
 * Allows to stream to one or all Chromecasts around
 *
 * @class DevicesService
 * @extends SyncTasks.GenericRestClient
 */
export class DevicesService extends GenericRestClient {
  /**
   * @constructor
   * @param {string} api The url to use for fetching the data. Default value: 127.0.0.1:8080/devices
   */
  constructor(api: string = '127.0.0.1:8080/devices') {
    super(api);
  }

  /**
   * Retrieve a list of devices from the server
   *
   * @param {string} type The type of device to retrieve. Default 'bluetooth'. Can be 'chromecast'
   * @return {SyncTasks.Promise<DeviceModel[]>} Return a promise which resolves a list of devices
   */
  public getDevices(type: string = 'bluetooth'): SyncTasks.Promise<DeviceModel[]> {
    // perform a GET http request to 127.0.0.1:8080/devices/list
    return this.performApiGet<DeviceModel[]>('/list', type);
  }

  /**
   * Stream some content to all the Chromecasts available
   *
   * @param {string} mediaUrl The url of the media to stream
   * @return {SyncTasks.Promise<SimpleResponse>} Promise which resolve a SimpleResponse object
   */
  public streamToAllChromecasts(mediaUrl: string): SyncTasks.Promise<SimpleResponse> {
    // perform a POST http request to 127.0.0.1:8080/devices/streamToDevices
    return this.performApiPost<SimpleResponse>('streamToDevices', { mediaUrl });
  }

  /**
   * Stream some content to one Chromecast
   * @param {string} mediaUrl The url of the media to stream
   * @param {string} deviceAddress The address of the device to use
   * @return {SyncTasks.Promise<SimpleResponse>} Promise which resolve a SimpleResponse object
   */
  public streamToOneChromecast(mediaUrl: string, deviceAddress: number): SyncTasks.Promise<SimpleResponse> {
    // perform a POST http request to 127.0.0.1:8080/devices/streamToOneDevice
    return this.performApiPost<SimpleResponse>('streamToOneDevice', {
      deviceAddress,
      mediaUrl,
    });
  }
}

export default new DevicesService();
