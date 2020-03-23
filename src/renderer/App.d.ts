import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export type State = {
  selectedContainer: string;
  fileUploaded: boolean;
  services: Services;
  dependsOn: DependsOn;
  networks: ReadOnlyObj;
  volumes: Array<ReadOnlyObj>;
  volumesClicked: Clicked;
  bindMounts: Array<string>;
  bindMountsClicked: Clicked;
  view: ViewT;
  options: Options;
  version: string;
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

interface SNode extends SimulationNodeDatum {
  id: number;
  name: string;
  ports: string[];
  volumes: string[];
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

export type Service = {
  build?: string;
  image?: string;
  command?: string;
  environment?: ReadOnlyObj;
  envfile?: string[];
  ports: string[];
  volumes: string[];
  depends_on: string[];
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
  (e: React.MouseEvent<Element, MouseEvent>): void;
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
