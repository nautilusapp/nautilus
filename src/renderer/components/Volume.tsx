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

const Volume: React.FC<Props> = ({ volume, color }) => {
  return (
    <div className="volumeLegend">
      <div className="volumeColorName">
        <svg className="volumeSvgBox">
          <rect className="volumeSquare" rx={5} ry={5} fill={color} />
        </svg>
      </div>
      <div>
        <p>{volume}</p>
      </div>
    </div>
  );
};

export default Volume;
