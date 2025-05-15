import { code } from '@alloy-js/core';
import { getDoc, type Type } from '@typespec/compiler';
import { useTsp } from '@typespec/emitter-framework';

export interface TypescriptCommentProps {
  pragma?: string;
  lineType?: 'block' | 'line' | 'auto';
  type?: Type;
  literal?: string;
}

const generateCommentCode = (content: string, config?: TypescriptCommentProps) => {
  const commentType = config?.lineType ?? 'auto';
  const lines = content.split('\n');

  switch (commentType) {
    case 'block':
      return getBlockComment(lines);
    case 'line':
      return getLineComment(lines);
    case 'auto':
      return lines.length > 1 ? getBlockComment(lines) : getLineComment(lines);
  }

  return '';
};

const getBlockComment = (lines: string[]) => {
  return `/**\n * ${lines.join('\n * ')}\n */\n`;
};

const getLineComment = (lines: string[]) => {
  return `${lines.map((l) => `// ${l}`).join('\n')}\n`;
};

export default function TypescriptComment(props: TypescriptCommentProps) {
  const tsp = useTsp();

  let content: string = props.literal || '';
  if (props.type) {
    content = getDoc(tsp.program, props.type) || '';
    if (props.pragma) {
      content = `@${props.pragma} ${content}`;
    }
  }
  const commentCode = generateCommentCode(content, props);

  return code`${commentCode}`;
}
