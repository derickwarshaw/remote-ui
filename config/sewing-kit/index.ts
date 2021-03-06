import {
  createComposedProjectPlugin,
  createProjectTestPlugin,
} from '@sewing-kit/plugins';

import {javascript} from '@sewing-kit/plugin-javascript';
import {typescript} from '@sewing-kit/plugin-typescript';
import {jestConfigurationHooks} from '@sewing-kit/plugin-jest';
import {json} from '@sewing-kit/plugin-json';
import {react} from '@sewing-kit/plugin-react';
import {babelConfigurationHooks} from '@sewing-kit/plugin-babel';
import {buildFlexibleOutputs} from '@sewing-kit/plugin-package-flexible-outputs';

const PLUGIN = 'RemoteUi.DefaultProject';

export function defaultProjectPlugin() {
  return createComposedProjectPlugin(PLUGIN, [
    babelConfigurationHooks,
    jestConfigurationHooks,
    json(),
    javascript(),
    typescript(),
    react(),
    buildFlexibleOutputs({
      esmodules: false,
    }),
    createProjectTestPlugin(PLUGIN, ({hooks}) => {
      hooks.configure.hook((configure) => {
        configure.jestEnvironment?.hook(() => 'jsdom');
      });
    }),
  ]);
}
