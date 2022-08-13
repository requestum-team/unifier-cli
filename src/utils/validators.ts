import { red } from 'ansi-colors';

export function title(input?: string): boolean | string {
  if (input && /^([A-Za-z\-_\d])+$/.test(input)) {
    if (input !== 'test') {
      return true;
    }
    return red('"test" is incorrect project name');
  } else {
    return red('Project name may only include letters, numbers, underscores and hashes.');
  }
}

export function minLength(min: number) {
  return (items?: string[]): boolean | string => {
    if (items?.length >= min) {
      return true;
    } else {
      return red('Please, select at least one option.');
    }
  };
}
