/**
 * ************************************
 *
 * @module  VolumesWrapper.tsx
 * @author
 * @date 3/17/20
 * @description Display area for the volumes and bindmounts
 * ************************************
 */
import React from 'react';
// import HostOS from './HostOS';
// import DockerEngine from './DockerEngine';

type Props = {};

const VolumesWrapper: React.FC<Props> = props => {
  return (
    <div className="volumes-wrapper">
      <div className="container">
        <div className="half">
          <h2>Bind Mounts</h2>
          <hr />
        </div>
        <div className="half">
          <h2>Volumes</h2>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default VolumesWrapper;
