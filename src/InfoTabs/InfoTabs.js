// @flow
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';

const style = {
  tabs: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignContent: 'flex-start',
  },
};

const InfoTabs = () => (
  <Tabs style={style.tabs}>
    <Tab label="Howto">
      <div>
        <ul>
          <li>Open this app on both devices</li>
          <li>Enter the device ID from the other device and press connect</li>
          <li>Type or paste the text you want to send</li>
          <li>See the text immediately appear on the other device after pressing 'send'</li>
        </ul>
      </div>
    </Tab>
    <Tab label="Security & Privacy" >
      <div>
        <ul>
          <li>The website is running on HTTPS which means the connection to and from the server is <strong>encrypted</strong>.</li>
          <li>Data send and received via the website is <strong>never stored or visible on the server</strong>.</li>
          <li>You need to be connected to the sender at the moment data is send, <strong>it's not possible to retrieve the data afterwards.</strong></li>
        </ul>
      </div>
    </Tab>
  </Tabs>
);

export default InfoTabs;
