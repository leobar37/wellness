// copy env
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import { exec, runTask } from './util';
import { routeApp } from './util';

export const makeEnv = async (app: string) => {
  const route = path.resolve(routeApp(app), '.env');
  const existEnv = fsExtra.existsSync(route);
  const hadBuilded = fsExtra.existsSync(path.resolve(routeApp(app, true)));
  if (existEnv && hadBuilded) {
    await fsExtra.copy(route, path.resolve(routeApp(app, true), '.env'));
  } else {
    console.log('Env not found or not builded');
  }
};

const main = async () => {
  await exec('nx', ['build', 'api', '--production']);
  await makeEnv('api');
};

runTask('Prepare api project', main);
