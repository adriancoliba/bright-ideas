import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import { css } from '@emotion/core';

const override = css`
    position: absolute;
    top: 40%;
    left: 50%;
`;

function BounceLoaderComponent ({ loading }){
  return (
    <div style={{height: '100vh'}}>
      <BounceLoader size={60} color={'#FBC601'} loading={loading} css={override}/>
    </div>
  )
}

export default BounceLoaderComponent;