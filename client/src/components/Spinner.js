import React, { Fragment } from 'react';
import spinner from './loading.gif';

const Spinner = () => (
  <div>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading...."
    />
  </div>
);

export default Spinner;