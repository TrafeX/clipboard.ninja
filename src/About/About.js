// @flow
import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui';
import {blueGrey400} from 'material-ui/styles/colors';

const style = {
  cardLeft: {
    flex: '1 1 400px',
    margin: 10,
  },
  cardRight: {
    flex: '1 1 400px',
    margin: 10,
  },
  a: {
    color: blueGrey400,
  }
};

const About = () => {
  return (
    <div className="container">
      <Card style={style.cardLeft}>
        <CardTitle
          title="How to use"
        />
        <CardText style={{paddingTop: 0}}>
          <ul>
            <li>Open the <a href="https://play.google.com/store/apps/details?id=nl.trafex.apps.clipboardninja" style={style.a}>app</a> or <a href="https://clipboard.ninja" style={style.a}>website</a> on both devices</li>
            <li>Enter the device ID from the other device and press connect</li>
            <li>Type or paste the text you want to send</li>
            <li>See the text immediately appear on the other device after pressing 'send'</li>
          </ul>
        </CardText>
      </Card>
      <Card style={style.cardRight}>
        <CardTitle
          title="Security & Privacy"
        />
        <CardText style={{paddingTop: 0}}>
          <ul>
            <li>The website is running on HTTPS which means the connection to and from the server is <strong>encrypted</strong>.</li>
            <li>Data send and received via the website is <strong>never stored or visible on the server</strong>.</li>
            <li>You need to be connected to the sender at the moment data is send, <strong>it's not possible to retrieve the data afterwards.</strong></li>
          </ul>
        </CardText>
      </Card>
    </div>
  );
};

export default About;
