/**
 * ************************************
 *
 * @module  TempService.tsx
 * @author
 * @date 3/13/20
 * @description display a temporary single service container
 *
 * ************************************
 */
import React, { useState } from 'react';

import { State } from '../app.d';

type Props = {
  serviceInfo: State;
};

const TempService: React.FC<Props> = ({ serviceInfo }) => {
  const onServiceClick = () => {};

  return (
    <div className="service" onClick={onServiceClick}>
      {Object.keys(serviceInfo.services)[0]}
    </div>
  );
};

export default TempService;
