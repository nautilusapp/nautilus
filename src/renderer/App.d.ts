import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export type State = {
  uploadErrors: string[];
  selectedContainer: string;
  fileUploaded: boolean;
  services: Services;
  dependsOn: DependsOn;
  networks: ReadOnlyObj;
  selectedNetwork: string;
  volumes: Array<ReadOnlyObj>;
  volumesClicked: Clicked;
  bindMounts: Array<string>;
  bindMountsClicked: Clicked;
  view: ViewT;
  options: Options;
  version: string;
};

interface SNode extends SimulationNodeDatum {
  id: number;
  name: string;
  ports: string[];
  volumes: string[];
  networks?: string[];
  row: number;
  column: number;
  rowLength: number;
  children: NodeChild;
}

interface Link extends SimulationLinkDatum<SNode> {
  source: string;
  target: string;
}

type SGraph = {
  nodes: SNode[];
  links: Link[];
};

type ViewT = 'networks' | 'depends_on';

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

export type Options = {
  [key: string]: boolean;
};

export type NodeChild = {
  [service: string]: SNode;
};

export type Service = {
  build?: string;
  image?: string;
  command?: string;
  environment?: ReadOnlyObj;
  envfile?: string[];
  ports?: string[] | string | Port[];
  volumes?: string[] | Volume[];
  depends_on?: string[];
  networks?: string[];
};

export type Port = {
  mode: string;
  protocol: string;
  published: number;
  target: number;
};

export type Volume = {
  type: string;
  source: string;
  target: string;
};

export type Services = {
  [service: string]: Service;
};

export type FileUpload = {
  (file: File): void;
};

export type UpdateOption = {
  (e: React.MouseEvent<Element, MouseEvent>): void;
};

export type UpdateView = {
  (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<Element, MouseEvent>,
  ): void;
};

export type SelectNetwork = {
  (e: React.ChangeEvent<HTMLSelectElement>): void;
};

export type SetSelectedContainer = {
  (containerName: string): void;
};

export type NodesObject = {
  [service: string]: SNode;
};

export type TreeMap = {
  [row: string]: string[];
};

export type Networks = {
  [network: string]: any;
};

export type Simulation = d3.Simulation<SNode, undefined>;

export type ValidationResults = {
  error?: Error;
  out: string;
  filePath: string;
};
