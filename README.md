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

- [ ] Webpack2
- [ ] Server side rendering
- [ ] React Native Android app
- [X] Continuous Integration
- [ ] Continuous Deployment
- [X] Docker containers
- [ ] Cleanup used packages and configs
- [ ] Better tests
