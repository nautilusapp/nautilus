/**
 * ************************************
 *
 * @module  HostOS.tsx
 * @author
 * @date 3/11/20
 * @description Display for the hostOS view
 *
 * ************************************
 */
import React from 'react';
// IMPORT COMPONENT
import Volume from './Volume';

type Props = {
  bindMounts: Array<string>;
  getColor: any;
};

const BindMounts: React.FC<Props> = ({ bindMounts, getColor }) => {
  const bindMountNames = bindMounts.map((volume, i) => {
    return <Volume key={'bd' + i} volume={volume} color={getColor(volume)} />;
  });

  return <div className="bind-mounts">{bindMountNames}</div>;
};

export default BindMounts;
