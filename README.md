### Introduction

In the following gist we will create an application with React-XP working on Android, on the web and Windows.
For doing so, I will assume that you are working on a Windows 10 machine. We will go across three steps: setup of the environment, code, testing your application.

### Environment
- Windows 10 Home Version 10.0.14393 Build 14393
- [Windows 10 sdk build 10586](https://developer.microsoft.com/en-US/windows/downloads/windows-10-sdk)
- NPM (3+)
- NodeJS (6+)
​
### Setup environment

#### Android

Download the [Android SDK](https://dl.google.com/android/repository/tools_r24.4.1-windows.zip) for Windows.
Extract the zip file to the directory `C:\<installation location>\android`. I suggest to qvoid the version 25 because it has quite a lot of issues.

Open a terminal and set the following environment variables:
​
```powershell
Set-Item -path Env:ANDROID_HOME -value "C:\<installation location>\android"
Set-Item -path Env:PATH -value ($env:PATH + ";" + $env:ANDROID_HOME + "\tools;" + $env:ANDROID_HOME + "\platform-tools")
```

Open a new terminal with a fresh environment. 
Run the following command for checking that everything went well: `echo %ANDROID_HOME%`.
You should see the path to your Android SDK directory.

Run the next commands for installing the SDK for Android 6 and the related system images:

```bash
android update sdk --no-ui --all --filter platform-tools,android-23,sys-img-armeabi-v7a-android-23,build-tools-24.0.3
android update adb
```

Now let's create an AVD: 

```bash
android create avd --force --target android-23 --name myavd --abi default/armeabi-v7a --device 6 --skin WVGA800
```

An AVD is an Android emulator. Here we are creating a Nexus 10 with an ARM processor emulation.

I invite you to visit this [page](https://source.android.com/source/build-numbers) for more informations about the API versions and this one for understanding why it works this [way](https://developer.android.com/guide/practices/compatibility.html).

#### Typescript

Easy and straight forward. 1 command:

```powershell
npm install -g typescript, typings
```

Install Typescript and Typings (kind of deps manager for Typescript) globally

#### React-native

Easy as well:

```powershell
npm install -g yarn, react-native-cli
```

Install yarn and react-native-cli globally.

### Setup your project

To create the project run the command:

```batch
react-native init myProject
```

Go to the directory 'myProject'. We will now install react-native-windows:

```powershell
rm .\yarn.lock
rm .\node_modules
```

remove the yarn.lock for re-downloading the npm modules

For now just copy paste in your 'package.json' file the following list of dependencies:

```json
  "dependencies": {
    "react": "~15.4.1",
    "react-addons-perf": "15.4.1",
    "react-dom": "~15.4.1",
    "react-native": "0.42.3",
		"react-native-windows": "^0.33.0",
    "reactxp": "^0.42.0-rc.1"
  },
  "devDependencies": {
    "@types/node": "^7.0.14",
    "@types/webpack": "^2.2.15",
    "awesome-typescript-loader": "3.1.2",
    "babel-jest": "19.0.0",
    "babel-preset-react-native": "1.9.1",
    "jest": "19.0.2",
    "react-addons-test-utils": "15.4.1",
    "react-test-renderer": "~15.4.1",
    "rnpm-plugin-windows": "^0.2.4",
    "source-map-loader": "^0.1.6",
    "ts-node": "^3.0.2",
    "tslint": "^5.1.0",
    "tslint-react": "^3.0.0",
    "typescript": "",
    "webpack": "^2.4.1",
    "webpack-dev-server": "^2.4.5"
  },
```

Here we are installing some great tools:

- react-native-windows: build a React-Native Application for your XBox accessing the [UWP](https://docs.microsoft.com/en-us/windows/uwp/get-started/whats-a-uwp)
- tslint: such as Eslint but for Typescript
- webpack, webpack-dev-server: transpile the Typescript to Javascript, provide a dev-server for testing 
  the web-application

Simply run `yarn install` for recreating the yarn.lock file.

Now let's create the 'tsconfig.json' file for Typescript. This file which provides the configuration to `tsc` for transpiling the Typescript sources:

```json
{
  "exclude": [
    "node_modules"
  ],
  "compilerOptions": {
    "declaration": false,
    "noResolve": false,
    "jsx": "react",
    "reactNamespace": "RX",
    "module": "commonjs",
    "target": "es5",
    "experimentalDecorators": true,
    "sourceMap": true,
    "noImplicitAny": false,
    "noImplicitReturns": true,
    "outDir": "./dist/",
    "types": [
      "node"
    ]
  },
  "include": [ 
    "./src/**/*"
  ]
}
```

For more details about the properties we are using check this [link](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

Now let's set the 'tslint.json' file:

```json
{
  "extends": ["tslint:latest", "tslint-react"],
  "rules": {
    "jsx-wrap-multiline": false,
    "quotemark": [
      "jsx-single",
      "single"
    ],
    "interface-name": [
      "never-prefix"
    ]
  }
}
```

The webpack configuration:

```javascript
import { join } from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    devServer: {
        compress: true,
        contentBase: join(__dirname, "."),
        port: 9000,
    },
    devtool: "source-map",
    entry: "./src/index.tsx",
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        ],
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
    },
    // Enable sourcemaps for debugging webpack's output.
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
};

export default config;
```

Our project is now ready. Let's code.

### The code

First you will have to remove the default js files coming with the default template for React-Native.
Create a file named 'App.tsx':

```javascript
import RX = require('reactxp');

const styles = {
  container: RX.Styles.createViewStyle({
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'center',
  }),
  helloWorld: RX.Styles.createTextStyle({
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 28,
  }),
};

class App extends RX.Component<null, null> {
    public render(): JSX.Element | null {
        return (
            <RX.View style={styles.container}>
                <RX.Text style={styles.welcome}>Hello world !</RX.Text>
            </RX.View>
        );
    }
}

export default App;
```

Here is your view: it displays a beautiful 'hello world !'.

Create a new file 'index.tsx':

```javascript
import RX = require('reactxp');
import App from './App';

// start in debug mode
RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
```

Such as you would run `ReactDOM.render(<App />, document.getElementById('app'))`, here we are loading the component in the UI.

We are done. 

### Testing your application 

#### Web

For running the web version create an 'index.html' file:

```html
<!doctype html>
<html>
<head>
    <title></title>
    <style>
        html, body, .app-container {
            width: 100%;
            height: 100%;
            padding: 0;
            border: none;
            margin: 0;
            font-family: proxima-nova, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif
        }
        
        *:focus {
            outline: 0;
        }
    </style>
</head>

<body>
    <div class="app-container"></div>
    <script src="dist/bundle.js"></script>
</body>

</html>
```

Then run the following command for starting the web-version:

```
.\node_modules\.bin\webpack-dev-server
```

It will start the server. The application is available: http://localhost:9000/

#### Android

**Do not forget to run `webpack` before for bundling your sources**

First, Start your emulator:

```batch
emulator @myavd
```

Then edit the file 'index.android.js':

```javascript
require('./dist/bundle');
```

We require the bundle containing our source in the entrypoint.

Now that the emulator has started (you might have to wait up to 10 minutes) let's start the React-Native application:

```batch
react-native run-android
```

The react-native CLI will bundle your APK and deploy it to your emulator.

#### Windows

**Do not forget to run `webpack` before for bundling your sources**

For enabling the Windows platform run the command `react-native windows`.

It will create a 'windows' directory in which there is a Visual Studio project.

Edit the file 'index.windows.js':

```javascript
require('./dist/bundle');
```

After it, run: 

```powershell
react-native run-windows
```

*Tips & tricks*

If you are not able to restore using Nuget run the following command:

```powershell
Set-Item -path Env:PLATFORM -value "x86"
```

And restart the steps for launching Windows.

*Enjoy !*