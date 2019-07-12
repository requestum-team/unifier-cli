import { Answer } from '@src/main';
import { join } from 'path';
import { EmailSpecifier } from '@specifier/email.specifier';
import { command } from 'execa';
import * as Listr from 'listr';

export const emailProject = ({ title }: Answer = { title: '' } as Answer): Listr => {
  return new Listr([
    {
      title: 'Install Email project',
      task: () =>
        command(`git clone git@gitlab.requestum.com:front-end-tools/email-template-compiler.git ${join(title)}`)
    },
    {
      title: 'Specify it...',
      task: () => new EmailSpecifier(title).specify()
    }
  ]);
};
