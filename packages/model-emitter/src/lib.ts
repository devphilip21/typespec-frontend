import { createTypeSpecLibrary } from '@typespec/compiler';

export const $lib = createTypeSpecLibrary({
  name: '@typespec-typescript/model-emitter',
  diagnostics: {},
});
