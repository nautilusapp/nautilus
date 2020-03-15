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
  view: View;
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
  readonly ports: boolean;
  readonly volumes: boolean;
  readonly dependsOn: boolean;
};

export type FileUpload = {
  (formData: FormData): void;
};

export type View = 'networks' | 'default' | 'depends_on';

export type UpdateOption = {
  (option: string): void;
};
export type UpdateView = {
  (view: string): void;
};

