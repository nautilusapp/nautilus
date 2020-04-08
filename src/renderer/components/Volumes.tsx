/**
 * ************************************
 *
 * @module  DockerEngine.tsx
 * @author
 * @date 3/11/20
 * @description DockerEngine for bind mounts
 *
 * ************************************
 */
import React from 'react';
import Volume from './Volume';
import { ReadOnlyObj } from '../App.d';

type Props = {
  volumes: ReadOnlyObj;
  getColor: (str: string | undefined) => string;
};

const Volumes: React.FC<Props> = ({ volumes, getColor }) => {
  // interate through volumes object via the keys
  // creating an array of jsx Volume components for each volume
  const volumeNames = Object.keys(volumes).map((volume, i) => {
    // assign unique color by invoking the getColor closure function
    return <Volume key={'vol' + i} volume={volume} color={getColor(volume)} />;
  });

  return <div className="volumes">{volumeNames}</div>;
};

export default Volumes;
