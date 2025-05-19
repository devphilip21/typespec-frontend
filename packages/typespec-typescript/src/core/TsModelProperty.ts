import { Model, ModelProperty, Scalar, Type, Union, UnionVariant } from '@typespec/compiler';

export interface TsModelProperty {
  name: string;
  typeReferenceName: string;
  optional: boolean;
  origin: ModelProperty;
}

export function createTsModelProperty(propertyName: string, property: ModelProperty): TsModelProperty {
  return {
    name: propertyName,
    typeReferenceName: getTsReferenceName(property.type),
    optional: property.optional,
    origin: property,
  };
}

export function getTsReferenceName(type: Type): string {
  switch (type.kind) {
    case 'Decorator':
    case 'Enum':
    case 'EnumMember':
    case 'Interface':
    case 'Intrinsic':
    case 'ModelProperty':
    case 'Namespace':
    case 'Operation':
      return type.name;
    case 'FunctionParameter':
      throw new Error('FunctionParameter is not referenceable');
    case 'Scalar':
      return getTsScalarName(type);
    case 'Number':
      return 'number';
    case 'String':
    case 'StringTemplate':
    case 'StringTemplateSpan':
      return 'string';
    case 'Boolean':
      return 'boolean';
    case 'Union':
      return getTsUnionReferenceName(type);
    case 'UnionVariant':
      return getTsUnionVariantReferenceName(type);
    case 'Model': {
      switch (type.name) {
        case 'Array':
          return getTsArrayReferenceName(type);
        case 'Record':
          return getTsRecordReferenceName(type);
        default:
          return type.name;
      }
    }
    case 'ScalarConstructor':
    case 'TemplateParameter':
    case 'Tuple':
      return '';
  }
}

export function getTsScalarName(scalar: Scalar): string {
  switch (scalar.name) {
    case 'boolean':
      return 'boolean';
    case 'string':
      return 'string';
    case 'decimal':
    case 'decimal128':
    case 'float':
    case 'float32':
    case 'float64':
    case 'integer':
    case 'int8':
    case 'int16':
    case 'int32':
    case 'int64':
    case 'safeint':
    case 'uint8':
    case 'uint16':
    case 'uint32':
    case 'uint64':
      return 'number';
    case 'bytes':
      return 'Uint8Array';
    case 'plainDate':
    case 'utcDateTime':
    case 'offsetDateTime':
      return 'Date';
    case 'duration':
      return 'string';
    case 'url':
      return 'URL';
    default:
      return 'any';
  }
}

export function getTsArrayReferenceName(array: Model): string {
  const indexer = array.indexer?.value;
  const elementReference = indexer ? getTsReferenceName(indexer) : 'unknown';

  return `Array<${elementReference}>`;
}

export function getTsRecordReferenceName(record: Model): string {
  const indexer = record.indexer;
  const keyReference = indexer?.key ? getTsScalarName(indexer.key) : 'unknown';
  const valueReference = indexer?.value ? getTsReferenceName(indexer.value) : 'unknown';

  return `Record<${keyReference}, ${valueReference}>`;
}

export function getTsUnionReferenceName(union: Union): string {
  return [...union.variants.entries()].map(([_, variant]) => getTsUnionVariantReferenceName(variant)).join(' | ');
}

export function getTsUnionVariantReferenceName(variant: UnionVariant): string {
  return getTsReferenceName(variant.type);
}
