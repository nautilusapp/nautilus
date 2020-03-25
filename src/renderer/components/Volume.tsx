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
  color: string;
};

const Volume: React.FC<Props> = props => {
  //create function to fill color based on name in props.volume fill ={fill}
  //const fill = () => {loop colorsVolObj , if colorsVolObj[x] = props.volume return x }
  //colorScheme[props.index % colorScheme.length]
  return (
    <div className="volumeLegend">
      <div className="volumeColorName">
        <svg className="volumeSvgBox">
          <rect className="volumeSquare" rx={5} ry={5} fill={props.color} />
        </svg>
      </div>
      <div>
        <p>{props.volume}</p>
      </div>
    </div>
  );
};

export default Volume;
