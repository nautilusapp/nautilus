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

export type Options = {
  ports: boolean;
  volumes: boolean;
  dependsOn: boolean;
};

export type FileUpload = {
  (formData: FormData): void;
};

export type UpdateOption = {
  (option: string): void;
};
