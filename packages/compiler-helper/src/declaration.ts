import { ListenerFlow, navigateProgram, Program, Type } from '@typespec/compiler';
import { isBuiltInType, isDeclarationType } from './type-checker.ts';
import { $ } from '@typespec/compiler/typekit';

export function collectDeclarationTypes(program: Program): Type[] {
  const types: Type[] = [];

  function collectType(type: Type) {
    if (isDeclarationType(program, type) && !isBuiltInType(program, type)) {
      types.push(type);
    }
  }

  const globalNs = program.getGlobalNamespaceType();

  navigateProgram(
    program,
    {
      namespace(n) {
        if (n !== globalNs && !$(program).type.isUserDefined(n)) {
          return ListenerFlow.NoRecursion;
        }
      },
      model: collectType,
      enum: collectType,
      union: collectType,
      scalar: collectType,
    },
    { includeTemplateDeclaration: false },
  );

  return types;
}
