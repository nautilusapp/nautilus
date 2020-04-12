import fs from 'fs';

type EnvObject = {
  [variableName: string]: string;
};

//this function replaces all env variables within the docker compose yaml string with their values in the env file
const resolveEnvVariables = (yamlText: string, filePath: string) => {
  const envFileArray = filePath.split('/');
  const envFilePath =
    envFileArray.slice(0, envFileArray.length - 1).join('/') + '/.env';
  //read envfile
  let envString: string;
  try {
    envString = fs.readFileSync(envFilePath).toString();
  } catch (err) {
    return yamlText;
  }
  let yamlTextCopy = yamlText;
  console.log(envString);
  //split by line
  const envArray = envString.split('\n');
  //remove empty last element
  envArray.splice(-1, 1);
  //create Object that stores the variable notation to be replace with its value
  const envObject: EnvObject = envArray.reduce((acc: EnvObject, el: string) => {
    const [variableName, value] = el.split('=');
    const variableKey: string = '\\${' + variableName + '}';
    acc[variableKey] = value;
    return acc;
  }, {});
  //replace the variables
  Object.keys(envObject).forEach((variableKey: string) => {
    yamlTextCopy = yamlTextCopy.replace(
      new RegExp(variableKey, 'g'),
      envObject[variableKey],
    );
  });
  return yamlTextCopy;
};

export default resolveEnvVariables;
