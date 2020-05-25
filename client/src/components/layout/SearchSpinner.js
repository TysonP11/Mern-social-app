import React, { Fragment } from 'react';
import SearchSpinner from './SearchSpinner.svg';

export default () => (
  <Fragment>
    <img
      src={SearchSpinner}
      style={{ width: '20px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);