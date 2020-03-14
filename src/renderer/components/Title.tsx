import * as React from 'react';
import Image from 'react-bootstrap/Image';

type Props = {
  // projectName: string;
};

const Title: React.FC<Props> = props => (
  <div className="title">
    <Image src="./static/shell.png" fluid />
    <h1>Nautilus</h1>
  </div>
);

export default Title;
