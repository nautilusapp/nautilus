import * as React from 'react';
import Image from 'react-bootstrap/Image';

type Props = {
  projectName: string;
}

const Title: React.FC<Props> = props => (
  <div className="title">

    <Image src="./src/styles/shell.png" fluid />
    <h1>{props.projectName}</h1>
  </div>
)

export default Title;