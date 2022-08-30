import main, { args } from '@src/main';
import * as fs from 'fs-extra';
import { ProjectType, plainProject, angularProject } from '@src/project-types';
import { join } from 'path';
import { isDirectoryExistsAndNotEmpty } from '@utils/helpers/verifications/is-directory-exists-and-no-empty.helper';

jest.mock('@src/project-types/angular.project');
jest.mock('@src/project-types/plain.project');
jest.mock('fs-extra');
jest.mock('@utils/helpers/verifications/is-directory-exists-and-no-empty.helper');

describe('User answers', () => {
  describe('can select correct project type', () => {
    const title = 'test-test';

    test('should throw error with invalid project type', async () => {
      args.title = title;
      args.type = 'test' as ProjectType;

      await expect(main()).rejects.toThrow(Error);
    });

    test('Plain JS', async () => {
      args.title = title;
      args.type = ProjectType.PLAIN;

      await main();

      expect(plainProject).toHaveBeenCalled();
    });

    test('Angular', async () => {
      args.title = title;
      args.type = ProjectType.ANGULAR;
      args.version = 'latest';

      await main();

      expect(angularProject).toHaveBeenCalled();
    });

    test('if selected directory is already exists and not empty it should clean it', async () => {
      args.title = 'same';
      args.type = ProjectType.PLAIN;

      await main();

      expect(isDirectoryExistsAndNotEmpty).toBeCalled();
      expect(isDirectoryExistsAndNotEmpty(args.title)).toBeTruthy();
      expect(fs.remove).toBeCalledWith(join(args.title));
    });
  });
});
