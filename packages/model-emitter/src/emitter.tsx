import { writeOutput, Output } from "@typespec/emitter-framework";
import { EmitContext } from "@typespec/compiler";

export async function $onEmit(context: EmitContext) {
  await writeOutput(
    context.program,
    <Output program={context.program} />,
    context.emitterOutputDir,
  );
}
