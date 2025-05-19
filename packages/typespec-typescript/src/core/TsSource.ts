import { snakeCase } from 'change-case';
import { join } from 'path';
import { Model } from '@typespec/compiler';
import { collectNamespaces } from '@typespec-frontend/compiler-helper';
import { TsModel } from './TsModel';

export interface TsSourceMeta {
  dirPath: string; // directory path (relative)
  name: string; // file name (no model name)
  path: string; // full path (relative)
}

export interface TsSource extends TsSourceMeta {
  imports: Map<string, Set<string>>;
  targets: TsModel[];
}

export function createTsSourceMeta(model: Model): TsSourceMeta {
  const namespaces = collectNamespaces(model.namespace, [], (name) => snakeCase(name));
  const dirPath = join(...namespaces);
  const name = `${snakeCase(model.name)}.ts`;
  const path = join(dirPath, name);

  return {
    dirPath,
    name,
    path,
  };
}
