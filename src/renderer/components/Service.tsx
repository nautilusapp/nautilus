/**
 * ************************************
 *
 * @module  Service.tsx
 * @author
 * @date 3/11/20
 * @description display a single service container
 *
 * ************************************
 */
import React from 'react';

import { Service } from '../App.d';

type Props = {
  name: string;
  service: Service;
};

const Service: React.FC<Props> = ({ service }) => {
  return <>hello</>;
};

export default Service;
