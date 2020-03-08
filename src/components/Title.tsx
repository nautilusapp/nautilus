import * as React from 'react';

type Props = {
  projectName: string;
}

const Title: React.FC<Props> = props => (
  <>
    <h1>Hello {props.projectName}!</h1>
  </>
)

export default Title;