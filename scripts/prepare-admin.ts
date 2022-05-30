// copy env
import { exec, cmd, runTask } from './util';

const main = async () => {
  console.log('prepare build');
  await cmd('yarn', ['nx', 'build', 'admin', '--production']);
  console.log('build success');
  await cmd(
    'cd dist/apps/admin && docker build -f ../../../docker/Dockerfile.wellfront -t leobar37/wellfront:latest .',
    []
  );
  await cmd('dokku git:from-image wellfront leobar37/wellfront:latest', []);
  await cmd('dokku ps:rebuild wellfront', []);
};

runTask('Prepare admin project', main);
