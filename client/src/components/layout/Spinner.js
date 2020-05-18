import React, { Fragment } from 'react';
import Spinner from './Spinner.svg';

export default () => (
  <Fragment>
    <img
      src={Spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
