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
// IMPORT COMPONENTS
import Volumes from './Volumes';
import BindMounts from './BindMounts';

// IMPORT TYPES
import { ReadOnlyObj } from '../App.d';

type Props = {
  volumes: ReadOnlyObj;
  bindMounts: Array<string>;
  getColor: (str: string | undefined) => string;
};

const VolumesWrapper: React.FC<Props> = ({ volumes, bindMounts, getColor }) => {
  return (
    <div className="volumes-wrapper">
      <div className="container">
        <div className="half">
          <h2>Bind Mounts</h2>
          <hr />
          <div className="scroll">
            <BindMounts bindMounts={bindMounts} getColor={getColor} />
          </div>
        </div>
        <div className="half">
          <h2>Volumes</h2>
          <hr />
          <div className="scroll">
            <Volumes volumes={volumes} getColor={getColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumesWrapper;
