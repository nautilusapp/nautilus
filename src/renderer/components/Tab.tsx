import React from 'react'

interface Props {
  filePath: string
}

const Tab: React.FC<Props> = ({ filePath }) => {
  const fileSplit = filePath.split('\\');
  const fileName = fileSplit[fileSplit.length - 1];
  return (
    <div className='tab' id={filePath}>
      {fileName}hello
    </div>
  )
}

export default Tab
