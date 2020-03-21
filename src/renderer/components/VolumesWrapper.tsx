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
import HostOS from './HostOS';

type Props = {
  volumes: Array<ReadOnlyObj>;
  bindMounts: Array<string>;
};

const VolumesWrapper: React.FC<Props> = ({ volumes, bindMounts }) => {
  return (
    <div className="volumes-wrapper">
      <div className="container">
        <div className="half">
          <h2>Bind Mounts</h2>
          <hr />
          <div className="scroll">
            <HostOS bindMounts={bindMounts} />
          </div>
        </div>
        <div className="half">
          <h2>Volumes</h2>
          <hr />
          <div className="scroll">
            <DockerEngine volumes={volumes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumesWrapper;
