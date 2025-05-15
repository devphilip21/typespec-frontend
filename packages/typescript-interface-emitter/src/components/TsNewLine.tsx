import { code } from '@alloy-js/core';

interface TsNewLineProps {
  lineCount?: number;
}

export default function TsNewLine(props: TsNewLineProps) {
  const newLines = '\n'.repeat(props.lineCount || 1);

  return code`${newLines}`;
}
