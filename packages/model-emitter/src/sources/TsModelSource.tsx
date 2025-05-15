import { SourceDirectory } from '@alloy-js/core';
import { SourceFile } from '@alloy-js/typescript';
import TsModelDeclaration from '~/components/TsModelDeclaration';
import TsNewLine from '~/components/TsNewLine';
import TypespecGenerationComment from '~/components/TypespecGenerationComment';
import { TsModelSourceFile } from '~/core/TsModelSource';

export interface TsModelSourceProps {
  root: string;
  file: TsModelSourceFile;
}

export default function TsModelSource(props: TsModelSourceProps) {
  return (
    <SourceDirectory path={props.root}>
      <SourceDirectory path={props.file.dirPath}>
        <SourceFile path={props.file.name}>
          <TypespecGenerationComment />
          <TsNewLine />
          {props.file.targets.map((target) => (
            <TsModelDeclaration {...target} export />
          ))}
        </SourceFile>
      </SourceDirectory>
    </SourceDirectory>
  );
}
