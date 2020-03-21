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
import React, { ReactElement } from 'react';
import Volume from './Volume';
import { ReadOnlyObj } from '../App.d';

type Props = {
  volumes: Array<ReadOnlyObj>;
};

const DockerEngine: React.FC<Props> = ({ volumes }) => {
  let volumeNames: ReactElement[] = [];

  Object.keys(volumes).map((el, i) => {
    volumeNames.push(<Volume key={'vol' + i} volume={el} />);
  });

  return <div className="docker-engine">{volumeNames}</div>;
};

export default DockerEngine;
