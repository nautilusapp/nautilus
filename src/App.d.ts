export type State = {
  selectedContainer: string;
  fileUploaded: boolean;
  services: ReadOnlyObj;
  dependsOn: ReadOnlyObj;
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
  readonly [prop: string]: any;
};

type Options = {
  ports: boolean;
  volumes: boolean;
  dependsOn: boolean;
};
