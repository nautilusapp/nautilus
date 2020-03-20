/**
 * ************************************
 *
 * @module  Volume.tsx
 * @author
 * @date 3/11/20
 * @description Show individual volumes or bind mounts
 *
 * ************************************
 */
import React from 'react';

type Props = {
  volume: string;
};

const Volume: React.FC<Props> = props => {
  return (
    <div className="volume">
      <svg className="volumeBox"></svg>
      <div>{props.volume}</div>
    </div>
  );
};

export default Volume;
