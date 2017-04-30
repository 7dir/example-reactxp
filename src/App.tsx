import RX = require('reactxp');

import { BluetoothDevices } from './BluetoothDevices';

const styles = {
    container: RX.Styles.createViewStyle({
        alignItems: 'center',
        backgroundColor: '#f5fcff',
        flex: 1,
        justifyContent: 'center',
    }),
    docLink: RX.Styles.createLinkStyle({
        color: 'blue',
        fontSize: 16,
        marginBottom: 40,
    }),
    helloWorld: RX.Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28,
    }),
    instructions: RX.Styles.createTextStyle({
        color: '#aaa',
        fontSize: 16,
        marginBottom: 40,
    }),
    toggleTitle: RX.Styles.createTextStyle({
        color: 'black',
        fontSize: 16,
    }),
    welcome: RX.Styles.createTextStyle({
        fontSize: 32,
        marginBottom: 12,
    }),
};

class App extends RX.Component<{}, null> {
    public render(): JSX.Element | null {
        return (
            <RX.View style={styles.container}>
                <RX.Text style={styles.welcome}>Helloooooo</RX.Text>
                <RX.Text style={styles.welcome}>Device scanner</RX.Text>
                <BluetoothDevices />
            </RX.View>
        );
    }
}

export default App;
