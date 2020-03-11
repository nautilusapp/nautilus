/**
 * ************************************
 *
 * @module  D3Wrapper.tsx
 * @author
 * @date 3/11/20
 * @description Container to hold all the d3 visualation components
 *
 * ************************************
 */
import React from 'react';

import ServicesWrapper from './ServicesWrapper';
import DockerEngine from './DockerEngine';
import HostOS from './HostOS';

type Props = {};

const D3Wrapper: React.FC<Props> = props => {
  return (
    <div className="d3-wrapper">
      <ServicesWrapper />
      <DockerEngine />
      <HostOS />
    </div>
  );
};

export default D3Wrapper;
