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
  getColor: any;
};

const HostOS: React.FC<Props> = ({ bindMounts, getColor }) => {
  const bindMountNames: ReactElement[] = [];
  //generate bindmount names using volume component
  bindMounts.map((el, i) => {
    const color: string = getColor(el);
    const volumeProps = {
      volume: el,
      color: color,
    };
    bindMountNames.push(<Volume key={'bd' + i} {...volumeProps} />);
  });

  return <div className="host-os">{bindMountNames}</div>;
};

export default HostOS;
