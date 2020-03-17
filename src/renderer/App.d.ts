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
  view: string;
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

//d3 force graph - Node ,Link, Graph
interface iNode extends SimulationNodeDatum {
  name: string;
}

interface Link extends SimulationLinkDatum<iNode> {
  source: string;
  target: string;
}

type Graph = {
  nodes: iNode[];
  links: Link[];
};

export type Service = {
  build?: string;
  command?: string;
  environment?: ReadOnlyObj;
  image?: string;
  depends_on: string[];
  ports: string[];
  volumes: string[];
  working_dir?: string;
  security_opt?: string[];
  stop_grace_Period?: string;
  stop_signal?: string;
  tmpfs?: string[];
  restart?: string;
  pid?: string;
};

export type Services = {
  [service: string]: Service;
};

export type FileUpload = {
  (file: File): void;
};

export type UpdateOption = {
  (option: string): void;
};
export type UpdateView = {
  (view: string): void;
};
