import * as React from 'react';

//import helpers
import { getStatic } from '../helpers/static';

type Props = {
  // projectName: string;
};

const Title: React.FC<Props> = props => (
  <div className="title">
    <img src={getStatic('nautilus_logo.svg')} />
    <h1>Nautilus</h1>
  </div>
);

export default Title;
