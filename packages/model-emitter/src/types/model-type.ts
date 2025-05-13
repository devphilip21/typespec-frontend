export interface TSModelFieldDefinition {
  name: string;
  type: string;
}

export interface TSModelDefinition {
  name: string;
  fields: TSModelFieldDefinition[];
}
