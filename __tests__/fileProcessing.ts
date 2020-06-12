import runDockerComposeValidation from '../src/common/runShellTasks';
import convertYamlToState from '../src/renderer/helpers/yamlParser';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

describe('Process Yaml File', () => {
  test('should run docker file validation and populate result object with errors', () => {
    try {
      expect(
        runDockerComposeValidation(
          path.resolve(__dirname, '../samples/docker-composeBAD.yml'), false
        ),
      ).resolves.toMatchObject({
        out: '',
        filePath: path.resolve(__dirname, '../samples/docker-composeBAD.yml'),
      });
    } catch (e) {
      expect(e.cmd).toBe(
        `docker-compose -f ${path.resolve(
          __dirname,
          '../samples/docker-composeBAD.yml',
        )} config`,
      );
      expect(e.code).toBe(1);
      expect(e.killed).toBe(false);
      expect(e.signal).toBe(null);
    }
  });
  test('should convert yaml file into state', () => {
    const yamlText = fs.readFileSync(
      path.resolve(__dirname, '../samples/docker-compose.bpc.yml'),
    );
    const yamlJS = yaml.safeLoad(yamlText.toString());
    const correctYamlState = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, './yamlState.json')).toString(),
    );
    const yamlState = convertYamlToState({}, yamlJS);
    expect(yamlState).toEqual(correctYamlState);
  });
});
