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
import React, { ReactElement } from 'react';
import Volume from './Volume';

type Props = {
  bindMounts: Array<string>;
};

const HostOS: React.FC<Props> = ({ bindMounts }) => {
  const bindMountData = [
    './docker/postgres:/docker-entrypoint-initdb.d',
    './jacocoReport/dpc-attribution:/jacoco-report',
  ];
  const bindMountBoxes: ReactElement[] = [];
  //generate bindmount boxes using volume component
  for (let i = 0; i < bindMountData.length; i++) {
    bindMountBoxes.push(<Volume key={'bd' + i} volume={bindMountData[i]} />);
  }
  return (
    <div className="host-os">
      <div>{bindMountBoxes}</div>
    </div>
  );
};

export default HostOS;
