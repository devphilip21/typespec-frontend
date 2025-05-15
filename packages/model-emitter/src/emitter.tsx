import { writeOutput, Output } from '@typespec/emitter-framework';
import { EmitContext } from '@typespec/compiler';
import TsModelSourceFiles from './sources/TsModelSourceFiles';

export async function $onEmit(context: EmitContext) {
  await writeOutput(
    context.program,
    <Output program={context.program}>
      <TsModelSourceFiles root="ts" />
    </Output>,
    context.emitterOutputDir,
  );
}
