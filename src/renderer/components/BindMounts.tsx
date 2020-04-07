/**
 * ************************************
 *
 * @module  BindMounts.tsx
 * @author
 * @date 3/11/20
 * @description Display for the BindMounts view
 *
 * ************************************
 */
import React from 'react';
// IMPORT COMPONENTS
import Volume from './Volume';

type Props = {
  bindMounts: Array<string>;
  getColor: (str: string | undefined) => string;
};

const BindMounts: React.FC<Props> = ({ bindMounts, getColor }) => {
  // interate through bindMounts array
  // creating an array of jsx Volume components for each bind mount
  const bindMountNames = bindMounts.map((volume, i) => {
    // assign unique color by invoking the getColor closure function
    return <Volume key={'bd' + i} volume={volume} color={getColor(volume)} />;
  });

  return <div className="bind-mounts">{bindMountNames}</div>;
};

export default BindMounts;
