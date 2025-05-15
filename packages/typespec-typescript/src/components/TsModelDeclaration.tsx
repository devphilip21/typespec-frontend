import { For } from '@alloy-js/core';
import { InterfaceDeclaration, InterfaceMember } from '@alloy-js/typescript';
import { TsModel } from '~/core/TsModel';

interface TsModelDeclarationProps extends TsModel {
  export?: boolean;
  default?: boolean;
}

export default function TsModelDeclaration(props: TsModelDeclarationProps) {
  return (
    <InterfaceDeclaration name={props.name} export={props.export} default={props.default}>
      <For each={props.properties}>
        {(property) => (
          <InterfaceMember name={property.name} type={property.typeReferenceName} optional={property.optional} />
        )}
      </For>
    </InterfaceDeclaration>
  );
}
