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
//import Volume from './Volume';

type Props = {
  volumes: Array<ReadOnlyObj>;
};

const DockerEngine: React.FC<Props> = ({ volumes }) => {
  const volumeData = ['./vote:/app', './result:/app'];
  let volumeBoxes: ReactElement[] = [];

  for (let x of volumeData) {
    volumeBoxes.push(<Volume volume={x} />);
  }
  return (
    <div className="docker-engine">
      <div>{volumeBoxes}</div>
    </div>
  );
};

export default DockerEngine;
