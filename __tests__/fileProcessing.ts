import convertYamlToState from '../src/renderer/helpers/yamlParser';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

describe('Process Yaml File', () => {
  test('should convert yaml file into state', () => {
    const yamlText = fs.readFileSync(
      path.resolve(__dirname, '../samples/docker-compose.bpc.yml'),
    );
    const yamlJS = yaml.safeLoad(yamlText.toString());
    const correctYamlState = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, './yamlstate.json')).toString(),
    );
    const yamlState = convertYamlToState(yamlJS);
    expect(yamlState).toEqual(correctYamlState);
  });
});
