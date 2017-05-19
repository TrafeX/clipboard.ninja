# Clipboard.ninja

Realtime clipboard to easily and secure share text between computers or mobile devices


## Features

 * It's realtime; you'll see the text immediately appear on the receiving device.
 * It's secure; the connection to the server is encrypted with SSL.
 * It's private; you first need to connect to the sender before you can send something, this way the data never has to be (temporarily) stored on the server.
 * You can connect multiple receivers to one sender.
 * No registration is needed, a 6 digit number is enough to connect the devices.

## Usage

    docker-compose up

Go to [http://localhost:3000]()

## Work In Progress

This is a work in progress rebuild of the [orginal clipboard.ninja app](https://github.com/trafex/clipboard), build with React.

### Todo

- [X] Webpack2
- [ ] Server side rendering / generate static html
- [ ] React Native Android app
- [X] Continuous Integration
- [X] Continuous Deployment
- [X] Docker containers
- [X] Cleanup used packages and configs
- [ ] Better tests: http://facebook.github.io/jest/docs/en/tutorial-react-native.html#snapshot-test
- [ ] Send on ctrl + enter
- [ ] Dump/simplify create-react-app bootstrap
- [ ] Seperate the backend server with his own node modules
- [ ] Show number of connected devices
- [ ] Add Google Analytics
