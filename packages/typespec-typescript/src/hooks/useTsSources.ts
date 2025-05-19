import { useTsp } from '@typespec/emitter-framework';
import { collectDeclarationTypes, isBuiltInType } from '@typespec-frontend/compiler-helper';
import { createTsSourceMeta, TsSource } from '~/core/TsSource';
import { createTsModel } from '~/core/TsModel';
import { addTsImport } from '~/core/TsImport';

export function useTsSources(): TsSource[] {
  const tsp = useTsp();
  const types = collectDeclarationTypes(tsp.program);
  const tsSourceMap: Map<string, TsSource> = new Map();

  for (const type of types) {
    switch (type.kind) {
      case 'Model': {
        const tsModel = createTsModel(type);
        const meta = createTsSourceMeta(type);

        if (tsSourceMap.has(meta.path)) {
          tsSourceMap.get(meta.path)!.targets.push(tsModel);
        } else {
          tsSourceMap.set(meta.path, {
            ...meta,
            targets: [tsModel],
            imports: new Map(),
          });
        }

        const tsSource = tsSourceMap.get(meta.path)!;
        for (const [propertyName, property] of type.properties) {
          if (!isBuiltInType(tsp.program, property)) {
            addTsImport(tsSource, property.type);
          }
        }

        break;
      }
    }
  }

  return Array.from(tsSourceMap.values());
}
