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
import { SwitchTab } from '../App.d';

type Props = {
  openFiles: Array<string>;
  switchToTab: SwitchTab;
  closeTab: SwitchTab;
}
const TabBar: React.FC<Props> = ({ openFiles, switchToTab, closeTab }) => {
  // console.log(openFiles)
  const tabs = openFiles.map(filePath => <Tab key={`${filePath}`} filePath={`${filePath}`} switchToTab={switchToTab} closeTab={closeTab} />)
  return (
    <div className="tab-bar">
      {tabs}
    </div>
  );
};
export default TabBar;