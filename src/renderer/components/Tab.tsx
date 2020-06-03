import React from 'react'
import { SwitchTab } from '../App.d'

type Props = {
  filePath: string;
  switchToTab: SwitchTab;
  closeTab: SwitchTab;
}

const Tab: React.FC<Props> = ({ filePath, switchToTab, closeTab }) => {
  let fileSplit
  if (process.platform === 'win32') fileSplit = filePath.split('\\');
  else fileSplit = filePath.split('/');
  const fileName = fileSplit[fileSplit.length - 1];
  const splitName = fileName.split('-')
  return (
    <div className='tab active-tab' id={filePath} >
      <div className='tab-text' onClick={() => switchToTab(filePath)} >
        {splitName[0]}&#8209;{splitName[1]}
      </div>
      <button className='close-btn' onClick={() => closeTab(filePath)} >{' '}X</button>
    </div>
  );
};

export default Tab;
