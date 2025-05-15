import { Namespace } from '@typespec/compiler';

export function collectNamespaces(
  namespace: Namespace | undefined,
  names: Array<string> = [],
  mapper: (name: string) => string = (name) => name,
): string[] {
  if (!namespace) {
    return names;
  }

  const newNames = namespace.name.length > 0 ? [mapper(namespace.name), ...names] : names;
  return collectNamespaces(namespace.namespace, newNames, mapper);
}
