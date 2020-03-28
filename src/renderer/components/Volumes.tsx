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
  volumes: Array<ReadOnlyObj>;
  getColor: any;
};

const Volumes: React.FC<Props> = ({ volumes, getColor }) => {
  const volumeNames = Object.keys(volumes).map((volume, i) => {
    return <Volume key={'vol' + i} volume={volume} color={getColor(volume)} />;
  });

  return <div className="volumes">{volumeNames}</div>;
};

export default Volumes;
