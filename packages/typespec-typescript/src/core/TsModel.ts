import { Model } from '@typespec/compiler';
import { createTsModelProperty, TsModelProperty } from './TsModelProperty';

export interface TsModel {
  name: string;
  properties: TsModelProperty[];
  origin: Model;
}

export function createTsModel(model: Model): TsModel {
  const properties: TsModelProperty[] = [];

  for (const [propertyName, property] of model.properties) {
    properties.push(createTsModelProperty(propertyName, property));
  }

  return {
    name: model.name,
    properties,
    origin: model,
  };
}
