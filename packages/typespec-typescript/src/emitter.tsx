import { writeOutput, Output } from '@typespec/emitter-framework';
import { EmitContext } from '@typespec/compiler';
import TsSourceFiles from './sources/TsSourceFiles';

export async function $onEmit(context: EmitContext) {
  await writeOutput(
    context.program,
    <Output program={context.program}>
      <TsSourceFiles root="tsp" />
    </Output>,
    context.emitterOutputDir,
  );
}
