import { useTsp } from '@typespec/emitter-framework';
import { TSModelDefinition } from '../types/model-type.ts';

export function useTSModelDefinitions(): TSModelDefinition[] {
  const tsp = useTsp();
  const types = collectDeclarationTypes(tsp.program);
}
