# Clipboard.ninja

Quick and secure way to share text between devices.

See the website [https://clipboard.ninja](https://clipboard.ninja).
Or download the [Android App in the Play Store](https://play.google.com/store/apps/details?id=nl.trafex.apps.clipboardninja)

## Features

 * It's realtime; you'll see the text immediately appear on the receiving device.
 * It's secure; the connection to the server is encrypted with SSL.
 * It's private; you first need to connect to the other device before you can send something, this way the data never has to be (temporarily) stored on the server. 
 * You can connect with multiple devices, simultaneously receiving the text.
 * No registration is needed, a 6 digit number is enough to connect the devices.

## Usage

You can run a local version with Docker:

    docker-compose up

Go to [http://localhost:3000]()

### Todo

This is a rebuild of the [orginal clipboard.ninja app](https://github.com/trafex/clipboard), build with React.

- [X] Webpack2
- [X] Server side rendering / generate static html
- [X] Continuous Integration
- [X] Continuous Deployment
- [X] Docker containers
- [X] Cleanup used packages and configs
- [ ] React Native Android app
- [ ] Cache busting via webpack for files defined in index.html with react-helmet
- [ ] Better tests: http://facebook.github.io/jest/docs/en/tutorial-react-native.html#snapshot-test
- [ ] Send on ctrl + enter
- [ ] Seperate the backend server with his own node modules
- [X] Show number of connected devices
- [X] Add Google Analytics
- [ ] Set correct Cache-Control headers on static files
