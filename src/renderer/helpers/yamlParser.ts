import { ReadOnlyObj, DependsOn, Services } from '../App.d';

type YamlState = {
  fileUploaded: boolean;
  services: Services;
  dependsOn?: DependsOn;
  networks?: ReadOnlyObj;
  volumes?: Array<ReadOnlyObj>;
  bindMounts?: Array<string>;
  multipleNetworks?: boolean;
};

const convertYamlToState = (file: any) => {
  const services = file.services;
  const volumes = file.volumes ? file.volumes : {};
  const networks = file.networks ? file.networks : {};
  const state: YamlState = Object.assign(
    {},
    { fileUploaded: true, services, volumes, networks },
  );
  const bindMounts: string[] = [];
  // iterate through each service
  Object.keys(services).forEach((name): void => {
    // IF SERVICE HAS VOLUMES PROPERTY
    if (services[name].volumes) {
      // iterate from all the volumes
      services[name].volumes.forEach((volume: string): void => {
        // if its a bind mount, capture it
        const v = volume.split(':')[0];
        if (!volumes.hasOwnProperty(v)) {
          bindMounts.push(v);
        }
      });
    }
    //check for multiple networks
    if (services[name].networks) {
      if (services[name].networks.length > 1 && !state.multipleNetworks) {
        state.multipleNetworks = true;
      }
    }
  });
  state.bindMounts = bindMounts;
  return state;
};

export default convertYamlToState;
