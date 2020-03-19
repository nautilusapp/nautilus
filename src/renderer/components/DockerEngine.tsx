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
  const volumeData = ['export-volume:/app/data', './result:/app'];
  let volumeBoxes: ReactElement[] = [];

  for (let x = 0; x < volumeData.length; x++) {
    volumeBoxes.push(<Volume key={'vol' + x} volume={volumeData[x]} />);
  }
  return (
    <div className="docker-engine">
      <div>{volumeBoxes}</div>
    </div>
  );
};

export default DockerEngine;
