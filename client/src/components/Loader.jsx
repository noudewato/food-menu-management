import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
  return (
      <Spinner
          animate='border'
      style={{ margin: "auto", width: "100px", height: "100px", display:'block' }}
      >
          <span className='sr-only'>
          </span>
    </Spinner>
  );
}

export default Loader
