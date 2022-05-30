// copy env
import { exec, cmd, runTask } from './util';

const main = async () => {
  await exec('nx', ['build', 'admin', '--production']);
  await cmd(
    'cd dist/apps/admin && docker build -f ../../../docker/Dockerfile.wellfront -t leobar37/wellfront:latest .',
    []
  );
  await cmd('dokku git:from-image wellfront leobar37/wellfront:latest', []);
  await cmd('dokku ps:rebuild wellfront', []);
};

runTask('Prepare admin project', main);
