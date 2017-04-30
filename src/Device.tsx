import RX = require('reactxp');

interface DeviceState {
    streaming?: boolean;
    source?: string;
}

export interface DeviceModel {
    deviceId?: number;
    name?: string;
    address?: string;
    status?: string;
}

export interface DeviceProps extends RX.CommonProps, DeviceModel {}

const styles = {
    deviceCard: RX.Styles.createViewStyle({
        backgroundColor: '#ddd',
        borderRadius: 15,
        flexDirection: 'row',
        height: 30,
        marginVertical: 8,
        width: 80,
    }),
};

class Device extends RX.Component<DeviceProps, DeviceState> {
    constructor(props: DeviceProps) {
        super(props);
    }

    public render(): JSX.Element | null {
        const {
            address,
            name,
            status,
        } = this.props;

        return (
            <RX.View style={styles.deviceCard}>
                <RX.Text>Name: {name}</RX.Text>
                <RX.Text>Address: {address}</RX.Text>
                <RX.Text>Status: {status}</RX.Text>
            </RX.View>
        );
    }
}

export default Device;
