import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

/**
 * **********************
 * REACT STATE TYPES
 * **********************
 */
export type State = {
  bindMounts: Array<string>;
  bindMountsClicked: Clicked;
  dependsOn: DependsOn;
  fileUploaded: boolean;
  networks: ReadOnlyObj;
  options: Options;
  selectedContainer: string;
  selectedNetwork: string;
  services: Services;
  uploadErrors: string[];
  version: string;
  view: ViewT;
  volumes: Array<ReadOnlyObj>;
  volumesClicked: Clicked;
};

type ReadOnlyObj = {
  readonly [prop: string]: ReadOnlyObj | Array<string> | string;
};

type Clicked = {
  readonly [propName: string]: string;
};

type DependsOn = {
  readonly name: string;
  readonly children?: Array<DependsOn>;
};

export type Services = {
  [service: string]: Service;
};

export type Service = {
  build?: string;
  image?: string;
  command?: string;
  environment?: ReadOnlyObj;
  env_file?: string[];
  ports?: string[] | string | Port[];
  volumes?: string[] | Volume[];
  depends_on?: string[];
  networks?: string[];
};

type ViewT = 'networks' | 'depends_on';

export type Options = {
  [key: string]: boolean;
};

/**
 * **********************
 * APP METHOD FUNCTION TYPES
 * **********************
 */
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

/**
 * **********************
 * D3 SIMULATION TYPES
 * **********************
 */
type D3State = {
  simulation: Simulation;
  treeDepth: number;
  serviceGraph: SGraph;
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

export type NodeChild = {
  [service: string]: SNode;
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
