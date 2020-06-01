import React from 'react'
import { SwitchTab } from '../App.d'

type Props = {
  filePath: string;
  switchToTab?: SwitchTab;
}

const Tab: React.FC<Props> = ({ filePath, switchToTab }) => {
  // const fileSplit = filePath.split('\\');
  // const fileName = fileSplit[fileSplit.length - 1];
  return (
    <div className='tab' id={filePath}>
      {filePath}
    </div>
  )
}

export default Tab
