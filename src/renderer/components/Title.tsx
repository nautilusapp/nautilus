import * as React from 'react';
import { getStatic } from '../../common/static';

type Props = {
  // projectName: string;
};

const Title: React.FC<Props> = props => (
  <div className="title">
    <img className="logo" src={getStatic('shell.png')} />
    <h1>Nautilus</h1>
  </div>
);

export default Title;
