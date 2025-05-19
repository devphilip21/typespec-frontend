import { Model, Type } from '@typespec/compiler';
import { createTsSourceMeta, TsSource } from './TsSource';
import { getRelativePath } from '~/utils/getRelativePath';

export interface TsImportTarget {
  name: string;
  filePath: string;
  path: string;
}

const addTsImportDirectly = (source: TsSource, model: Model) => {
  const target = createTsSourceMeta(model);
  const importPath = getRelativePath(target.path, source.path, true);
  const importedModelName = target.name;

  if (source.imports.has(importPath)) {
    source.imports.get(importPath)!.add(importedModelName);
  } else {
    source.imports.set(importPath, new Set([importedModelName]));
  }
};

export const addTsImport = (source: TsSource, typespecType: Type) => {
  if (typespecType.kind !== 'Model') {
    return;
  }

  if (typespecType.indexer) {
    addTsImport(source, typespecType.indexer.key);
    addTsImport(source, typespecType.indexer.value);
  }

  addTsImportDirectly(source, typespecType);
};
