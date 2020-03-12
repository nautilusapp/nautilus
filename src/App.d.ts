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
};

type Clicked = {
  readonly [propName: string]: string;
};

type ReadOnlyObj = {
  readonly [prop: string]: ReadOnlyObj | Array<string>;
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

export type FileUpload = {
  (formData: FormData): void;
};
