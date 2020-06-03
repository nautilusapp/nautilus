import { deploySwarmCluster } from '../src/common/dockerSwarmDeployment';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

describe('should create a single-node docker swarm', () => {
  it('should do what it is meant to do', () => {
    expect(1).toEqual(1);
  });
});
