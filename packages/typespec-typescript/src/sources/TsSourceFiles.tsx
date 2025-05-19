import { SourceDirectory } from '@alloy-js/core';
import { SourceFile } from '@alloy-js/typescript';
import TsModelDeclaration from '~/components/TsModelDeclaration';
import TsNewLine from '~/components/TsNewLine';
import TypespecGenerationComment from '~/components/TypespecGenerationComment';
import { useTsSources } from '~/hooks/useTsSources';

export interface TsSourceFilesProps {
  root: string;
}

export default function TsSourceFiles(props: TsSourceFilesProps) {
  const sources = useTsSources();

  return (
    <SourceDirectory path={props.root}>
      {sources.map((source) => (
        <SourceDirectory path={source.dirPath}>
          <SourceFile path={source.name}>
            <TypespecGenerationComment />
            <TsNewLine />
            {source.targets.map((target) => (
              <TsModelDeclaration {...target} export />
            ))}
          </SourceFile>
        </SourceDirectory>
      ))}
    </SourceDirectory>
  );
}
