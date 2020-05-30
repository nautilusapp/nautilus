/**
 * ************************************
 *
 * @module  TabBar.tsx

 * @author David Soerensen and Linda Everswick
 * @date 5/30/20
 * @description Used to display tabs of all open docker-compose files
 *
 * ************************************
 */

import React from 'react';
import Tab from './Tab'

const TabBar = ({ }) => {

  return (
    <div className="tab-bar">
      <Tab />
    </div>
  );
};
export default TabBar;