import React from 'react';
import ReactGA from 'react-ga';


const withTracker = (WrappedComponent) => {
  ReactGA.initialize(process.env.REACT_APP_GA_CODE, {
    gaOptions: {
      siteSpeedSampleRate: 10
    }
  });

  const trackPage = (page) => {
    ReactGA.set({ page });
    ReactGA.pageview(page);
  };

  return (props) => {
    const page = props.location.pathname;
    trackPage(page);

    return (
      <WrappedComponent {...props} />
    );
  };
};

export default withTracker;
