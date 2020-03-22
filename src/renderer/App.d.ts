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
  view: 'networks' | 'depends_on';
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

export type Options = {
  [key: string]: boolean;
};

interface SNode extends SimulationNodeDatum {
  id: number;
  name: string;
  ports: string[];
  volumes: string[];
  networks?: string[];
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
  context?: string;
  dockerfile?: string;
  args?: string[];
  cache_from?: string[];
  labels?: string[];
  shm_size?: string;
  target?: string;
  image?: string;
  command?: string;
  environment?: ReadOnlyObj;
  envfile?: string[];
  ports: string[];
  volumes: string[];
  depends_on: string[];
  networks: string[];
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

export type Roots = {
  [service: string]: boolean | number;
};

export type Networks = {
  [network: string]: any;
};
