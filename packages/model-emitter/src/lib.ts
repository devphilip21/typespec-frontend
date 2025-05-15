import { createTypeSpecLibrary } from '@typespec/compiler';

export const $lib = createTypeSpecLibrary({
  name: '@typespec-frontend/model-emitter',
  diagnostics: {},
});
