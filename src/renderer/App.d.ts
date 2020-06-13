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
  fileOpened: boolean;
  filePath: string;
  networks: ReadOnlyObj;
  options: Options;
  selectedContainer: string;
  selectedNetwork: string;
  services: Services;
  openErrors: Array<string>;
  openFiles: Array<string>;
  version: string;
  view: ViewT;
  volumes: ReadOnlyObj;
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
  environment?: ReadOnlyObj | string[];
  env_file?: string[];
  ports?: Ports;
  volumes?: Volumes;
  depends_on?: string[];
  networks?: string[] | {};
};

export type Ports = string[] | string | Port[];

export type Port = {
  mode: string;
  protocol: string;
  published: number;
  target: number;
};

export type Volumes = VolumeType[];

/** Volumes may have different syntax, depending on the version
 *
 * https://docs.docker.com/compose/compose-file/#long-syntax-3
 */
type LongVolumeSyntax = Partial<{
  type: 'volume' | 'bind' | 'tmpfs' | 'npipe';
  source: string;
  target: string;
  read_only: boolean;
  bind: {
    propogation: string;
  };
  volume: {
    nocopy: boolean;
  };
  tmpft: {
    size: number;
  };
  consistency: 'consistent' | 'cached' | 'delegated';
}>;

type VolumeType = string | LongVolumeSyntax;

type ViewT = 'networks' | 'depends_on';

export type Options = {
  ports: boolean;
  volumes: boolean;
  selectAll: boolean;
};

/**
 * **********************
 * APP METHOD FUNCTION TYPES
 * **********************
 */
export type FileOpen = {
  (file: File): void;
};

export type UpdateOption = {
  (id: 'ports' | 'volumes' | 'selectAll'): void;
};

export type Handler = {
  (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.MouseEvent<Element, MouseEvent>,
  ): void;
};

export type UpdateView = {
  (view: 'networks' | 'depends_on'): void;
};

export type SelectNetwork = {
  (network: string): void;
};

export type SetSelectedContainer = {
  (containerName: string): void;
};

export type SwitchTab = {
  (filePath: string, openFiles?: Array<string>): void;

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
  children: NodesObject;
}

interface Link extends SimulationLinkDatum<SNode> {
  source: string;
  target: string;
}

type SGraph = {
  nodes: SNode[];
  links: Link[];
};

export type NodesObject = {
  [service: string]: SNode;
};

export type TreeMap = {
  [row: string]: string[];
};

export type Simulation = d3.Simulation<SNode, undefined>;

export type shellResults = {
  error?: Error;
  out: string;
  envResolutionRequired: boolean;
};
