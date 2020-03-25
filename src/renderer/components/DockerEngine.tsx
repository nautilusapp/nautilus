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
  getColor: any;
};

const DockerEngine: React.FC<Props> = ({ volumes, getColor }) => {
  let volumeNames: ReactElement[] = [];

  Object.keys(volumes).map((el, i) => {
    const color: string = getColor(el);
    const volumeProps = {
      volume: el,
      color: color,
    };
    volumeNames.push(<Volume key={'vol' + i} {...volumeProps} />);
  });

  return <div className="docker-engine">{volumeNames}</div>;
};

export default DockerEngine;
