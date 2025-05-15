import type { Program, Type } from '@typespec/compiler';
import { $ } from '@typespec/compiler/typekit';

export function isBuiltInType(program: Program, type: Type) {
  if (!('namespace' in type) || type.namespace === undefined) {
    return false;
  }

  const globalNs = program.getGlobalNamespaceType();
  let tln = type.namespace;
  if (tln === globalNs) {
    return false;
  }

  while (tln.namespace !== globalNs) {
    tln = tln.namespace!;
  }

  return tln === globalNs.namespaces.get('TypeSpec');
}

export function isDeclarationType(program: Program, type: Type): boolean {
  switch (type.kind) {
    case 'Namespace':
    case 'Interface':
    case 'Operation':
    case 'EnumMember':
    case 'UnionVariant':
      return false;
    case 'Model':
      if (($(program).array.is(type) || $(program).record.is(type)) && isBuiltInType(program, type)) {
        return false;
      }

      return Boolean(type.name);
    case 'Union':
      return Boolean(type.name);
    case 'Enum':
      return true;
    case 'Scalar':
      return true;
    default:
      return false;
  }
}
