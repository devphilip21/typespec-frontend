import {
  Program,
  Type,
  Namespace,
  Model,
  Union,
  Scalar,
  Enum,
  Operation,
  Interface,
  Decorator,
  DecoratorApplication,
} from '@typespec/compiler';
import { isBuiltInType } from './type-checker.ts';

describe('isBuiltInType', () => {
  let program: Program;

  beforeEach(() => {
    program = createMockProgram();
  });

  const createMockType = (namespace?: Namespace, name?: string): Type => {
    return {
      kind: 'Model',
      name: name || 'TestType',
      namespace: namespace,
      node: undefined,
      properties: new Map(),
    } as Model;
  };

  it('should return false if type has no namespace', () => {
    const typeWithNoNamespace = createMockType(undefined);
    expect(isBuiltInType(program, typeWithNoNamespace)).toBe(false);
  });

  it('should return false if type is in global namespace', () => {
    const globalNs = program.getGlobalNamespaceType();
    const typeInGlobalNs = createMockType(globalNs);
    expect(isBuiltInType(program, typeInGlobalNs)).toBe(false);
  });

  it('should return true if type is directly in TypeSpec namespace', () => {
    const typeSpecNs = program.getGlobalNamespaceType().namespaces.get('TypeSpec')!;
    const typeInTypeSpecNs = createMockType(typeSpecNs);
    expect(isBuiltInType(program, typeInTypeSpecNs)).toBe(true);
  });

  it('should return true if type is in a sub-namespace of TypeSpec', () => {
    const typeSpecNs = program.getGlobalNamespaceType().namespaces.get('TypeSpec')!;
    const subNs: Namespace = {
      kind: 'Namespace',
      name: 'Sub',
      namespace: typeSpecNs,
      models: new Map<string, Model>(),
      operations: new Map<string, Operation>(),
      interfaces: new Map<string, Interface>(),
      enums: new Map<string, Enum>(),
      unions: new Map<string, Union>(),
      scalars: new Map<string, Scalar>(),
      decoratorDeclarations: new Map<string, Decorator>(),
      decorators: [] as DecoratorApplication[],
      namespaces: new Map<string, Namespace>(),
      node: undefined,
      entityKind: 'Type',
      isFinished: true,
    };
    typeSpecNs.namespaces.set('Sub', subNs);
    const typeInSubNs = createMockType(subNs);
    expect(isBuiltInType(program, typeInSubNs)).toBe(true);
  });

  it('should return false if type is in a different namespace', () => {
    const globalNs = program.getGlobalNamespaceType();
    const otherNs: Namespace = {
      kind: 'Namespace',
      name: 'Other',
      namespace: globalNs,
      models: new Map<string, Model>(),
      operations: new Map<string, Operation>(),
      interfaces: new Map<string, Interface>(),
      enums: new Map<string, Enum>(),
      unions: new Map<string, Union>(),
      scalars: new Map<string, Scalar>(),
      decoratorDeclarations: new Map<string, Decorator>(),
      decorators: [] as DecoratorApplication[],
      namespaces: new Map<string, Namespace>(),
      node: undefined,
      entityKind: 'Type',
      isFinished: true,
    };
    globalNs.namespaces.set('Other', otherNs);
    const typeInOtherNs = createMockType(otherNs);
    expect(isBuiltInType(program, typeInOtherNs)).toBe(false);
  });
});

function createMockProgram(): Program {
  const globalNs: Namespace = {
    kind: 'Namespace',
    name: '',
    namespace: undefined,
    models: new Map<string, Model>(),
    operations: new Map<string, Operation>(),
    interfaces: new Map<string, Interface>(),
    enums: new Map<string, Enum>(),
    unions: new Map<string, Union>(),
    scalars: new Map<string, Scalar>(),
    decoratorDeclarations: new Map<string, Decorator>(),
    decorators: [] as DecoratorApplication[],
    namespaces: new Map<string, Namespace>(),
    node: undefined,
    entityKind: 'Type',
    isFinished: true,
  };

  const typeSpecNs: Namespace = {
    kind: 'Namespace',
    name: 'TypeSpec',
    namespace: globalNs,
    models: new Map<string, Model>(),
    operations: new Map<string, Operation>(),
    interfaces: new Map<string, Interface>(),
    enums: new Map<string, Enum>(),
    unions: new Map<string, Union>(),
    scalars: new Map<string, Scalar>(),
    decoratorDeclarations: new Map<string, Decorator>(),
    decorators: [] as DecoratorApplication[],
    namespaces: new Map<string, Namespace>(),
    node: undefined,
    entityKind: 'Type',
    isFinished: true,
  };
  globalNs.namespaces.set('TypeSpec', typeSpecNs);

  const mockProgram = {
    getGlobalNamespaceType: () => globalNs,
    checker: {},
  } as unknown as Program;

  return mockProgram;
}
