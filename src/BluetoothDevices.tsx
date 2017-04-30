import RX  = require('reactxp');
import { ComponentBase } from 'resub';

import Device, { DeviceModel } from './Device';
import DevicesStore from './DevicesStore';

export interface LastMessage {
  icon: string;
  message: string;
}

interface BluetoothDevicesState {
  refreshing?: boolean;
  devices?: DeviceModel[];
  lastMessage?: LastMessage;
}

export class BluetoothDevices extends ComponentBase<{}, BluetoothDevicesState> {
  public render(): JSX.Element | null {
    if (!this.state.devices.length) {
      return null;
    }

    const devices = this.state.devices.map((device, index) => (
      <Device
        address={device.address}
        deviceId={index}
        name={device.name}
        status={device.status}
      />
    ));

    return (
      <RX.ScrollView>
        {devices}
      </RX.ScrollView>
    );
  }

  protected _buildState(props: {}, initialBuild: boolean): BluetoothDevicesState {
    return {
      devices: DevicesStore.getDevices(),
      lastMessage: DevicesStore.getLastMessage(),
      refreshing: DevicesStore.isLoading(),
    };
  }

  protected componentWIllMount() {
    DevicesStore.retrieveDevices('bluetooth');
  }
}
