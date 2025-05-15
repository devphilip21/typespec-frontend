import { useTsp } from '@typespec/emitter-framework';
import { collectDeclarationTypes } from '@typespec-frontend/compiler-helper';
import { createTsModelSourceFileMeta, TsModelSourceFile } from '~/core/TsModelSource';
import { createTsModel } from '~/core/TsModel';

export function useTsModelSourceFiles(): TsModelSourceFile[] {
  const tsp = useTsp();
  const types = collectDeclarationTypes(tsp.program);
  const tsModelSourceMap: Map<string, TsModelSourceFile> = new Map();

  for (const type of types) {
    switch (type.kind) {
      case 'Model': {
        const tsModel = createTsModel(type);
        const meta = createTsModelSourceFileMeta(type);

        if (tsModelSourceMap.has(meta.path)) {
          tsModelSourceMap.get(meta.path)!.targets.push(tsModel);
        } else {
          tsModelSourceMap.set(meta.path, {
            ...meta,
            targets: [tsModel],
          });
        }

        break;
      }
    }
  }

  return Array.from(tsModelSourceMap.values());
}
