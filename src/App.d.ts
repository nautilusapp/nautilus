import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export type State = {
  selectedContainer: string;
  fileUploaded: boolean;
  services: ReadOnlyObj;
  dependsOn: DependsOn;
  networks: ReadOnlyObj;
  volumes: Array<ReadOnlyObj>;
  volumesClicked: Clicked;
  bindMounts: Array<string>;
  bindMountsClicked: Clicked;
  view: 'networks' | 'default' | 'depends_on';
  options: Options;
  version: string;
};

type Clicked = {
  readonly [propName: string]: string;
};

type ReadOnlyObj = {
  readonly [prop: string]: ReadOnlyObj | Array<string> | string;
};

type DependsOn = {
  readonly name: string;
  readonly children?: Array<DependsOn>;
};

type Options = {
  readonly ports: boolean;
  readonly volumes: boolean;
  readonly dependsOn: boolean;
};

//test - Aris depends on
interface Node extends SimulationNodeDatum {
  name: string;
}

interface Link extends SimulationLinkDatum<Node> {
  source: string;
  target: string;
}

type Graph = {
  nodes: Node[];
  links: Link[];
};

export type FileUpload = {
  (formData: FormData): void;
};
