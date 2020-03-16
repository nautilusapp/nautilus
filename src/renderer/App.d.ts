export type State = {
  selectedContainer: string;
  fileUploaded: boolean;
  services: ServiceInfo;
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

export type Service = {
  build?: string;
  command?: string;
  environment?: ReadOnlyObj;
  image?: string;
  ports?: string[];
  volumes?: string[];
  working_dir?: string;
  security_opt?: string[];
  stop_grace_Period?: string;
  stop_signal?: string;
  tmpfs?: string[];
  restart: string;
  pid: string;
};

export type ServiceInfo = {
  [service: string]: Service;
};

export type FileUpload = {
  (file: File): void;
};
