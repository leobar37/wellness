import * as fs from 'fs';
import * as cp from 'child_process';
import * as glob from 'glob';
import * as fsExtra from 'fs-extra';
import * as path from 'path';
import * as rimraf from 'rimraf';

export const routeApp = (app: string, dist?: boolean) => {
  if (dist) {
    return path.resolve('.', 'dist', 'apps', app);
  } else {
    return path.resolve('.', 'apps', app);
  }
};

export type BaseFn = (command: string) => string;

export function copy(target: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fsExtra.copy(target, path.resolve(destination), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function remove(target: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fsExtra.remove(target, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function writeFile(target: string, contents: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(target, contents, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export function getListOfFiles(
  globPath: string,
  exclude?: string | string[]
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const options = exclude ? { ignore: exclude } : {};
    glob(globPath, options, (error, matches) => {
      if (error) {
        return reject(error);
      }
      resolve(matches);
    });
  });
}

export function removeRecursively(glob: string): Promise<void> {
  return new Promise((resolve, reject) => {
    rimraf(glob, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function exec(
  command: string,
  args: string[],
  base: BaseFn = fromNpm
): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log('executing command', command + ' ' + args.join(' '));

    cp.exec(base(command) + ' ' + args.join(' '), (err, stdout) => {
      if (err) {
        return reject(err);
      }
      console.log(stdout);
      resolve(stdout.toString());
    });
  });
}

export function cmd(command: string, args: string[]): Promise<string> {
  return exec(command, args, (command: string) => command);
}

export function git(args: string[]): Promise<string> {
  return cmd('git', args);
}

export function ignoreErrors<T>(promise: Promise<T>): Promise<T | null> {
  return promise.catch(() => null);
}

export function fromNpm(command: string) {
  return baseDir(`./node_modules/.bin/${command}`);
}

export function getPackageFilePath(pkg: string, filename: string) {
  return baseDir(`./modules/${pkg}/${filename}`);
}

const ora = require('ora');

export async function runTask(name: string, taskFn: () => Promise<any>) {
  const spinner = ora(name);
  try {
    spinner.start();
    await taskFn();
    spinner.succeed();
  } catch (e) {
    spinner.fail();

    throw e;
  }
}

export function flatMap<K, J>(list: K[], mapFn: (item: K) => J[]): J[] {
  return list.reduce(function (newList, nextItem) {
    return [...newList, ...mapFn(nextItem)];
  }, [] as J[]);
}

export function baseDir(...dirs: string[]): string {
  return `"${path.resolve(__dirname, '../', ...dirs)}"`;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getPrNumber(prNumber: string, circlePR: string): string {
  const PR_NUMBER = prNumber;

  if (!PR_NUMBER && circlePR) {
    return circlePR;
  }

  return PR_NUMBER;
}
