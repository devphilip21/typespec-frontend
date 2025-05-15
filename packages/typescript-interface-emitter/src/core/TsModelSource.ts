import { snakeCase } from 'change-case';
import { join } from 'path';
import { Model } from '@typespec/compiler';
import { collectNamespaces } from '@typespec-frontend/compiler-helper';
import { TsModel } from './TsModel';

export interface TsModelSourceFileMeta {
  dirPath: string; // directory path (relative)
  name: string; // file name (no model name)
  path: string; // full path (relative)
}

export interface TsModelSourceFile extends TsModelSourceFileMeta {
  targets: TsModel[];
}

export function createTsModelSourceFileMeta(model: Model): TsModelSourceFileMeta {
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
