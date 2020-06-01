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

type Props = {
  openFiles: Array<string>;
}
const TabBar: React.FC<Props> = ({ openFiles }) => {
  console.log(openFiles)
  const tabs = openFiles.map(filePath => <Tab key={`${filePath}`} filePath={`${filePath}`} />)
  return (
    <div className="tab-bar">
      {tabs}
    </div>
  );
};
export default TabBar;