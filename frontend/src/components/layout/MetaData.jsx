import React from 'react';
import { Helmet } from 'react-helmet';

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} | MarketHub - Your One-Stop Online Marketplace`}</title>
    </Helmet>
  );
};

export default MetaData;
