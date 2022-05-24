// copy env
import { exec, runTask } from './util';

const main = async () => {
  await exec('nx', ['build', 'admin', '--production']);
};

runTask('Prepare api project', main);
