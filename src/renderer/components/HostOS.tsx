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
  const bindMountNames: ReactElement[] = [];
  //generate bindmount names using volume component
  bindMounts.map((el, i) => {
    bindMountNames.push(<Volume key={'bd' + i} volume={el} index={i} />);
  });

  return <div className="host-os">{bindMountNames}</div>;
};

export default HostOS;
