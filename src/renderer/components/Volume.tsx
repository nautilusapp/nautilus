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
import { colorSchemeHash } from '../common';

type Props = {
  volume: string;
  index: number;
};

const Volume: React.FC<Props> = props => {
  //create function to fill color based on name in props.volume fill ={fill}
  //const fill = () => {loop colorsVolObj , if colorsVolObj[x] = props.volume return x }
  //colorScheme[props.index % colorScheme.length]
  return (
    <div className="volume">
      <svg className="volumeBox">
        <rect
          className="volumeSq"
          rx={5}
          ry={5}
          fill={colorSchemeHash(props.volume)}
        />
      </svg>
      {props.volume}
    </div>
  );
};

export default Volume;
