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
import DockerEngine from './DockerEngine';
import { ReadOnlyObj } from '../App.d';
// import HostOS from './HostOS';

type Props = {
  volumes: Array<ReadOnlyObj>;
};

const VolumesWrapper: React.FC<Props> = ({ volumes }) => {
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
          <DockerEngine volumes={volumes} />
        </div>
      </div>
    </div>
  );
};

export default VolumesWrapper;
