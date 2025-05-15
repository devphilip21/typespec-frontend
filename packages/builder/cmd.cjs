#!/usr/bin/env node
/* eslint-disable */

const esbuild = require('esbuild');
const { dtsPlugin } = require("esbuild-plugin-d.ts");
const aliasPlugin = require('esbuild-plugin-alias');
const path = require('path');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    command: null,
    entry: null,
    output: null
  };

  if (args.length > 0) {
    options.command = args[0];
  }

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--entry' && i + 1 < args.length) {
      options.entry = args[i + 1];
      i++;
    } else if (args[i] === '--output' && i + 1 < args.length) {
      options.output = args[i + 1];
      i++;
    }
  }

  return options;
}

async function buildTs(entryPoint, outputFile) {
  if (!entryPoint || !outputFile) {
    console.error('Build failed: --entry and --output arguments are required.');
    console.error('Usage: builder build:ts --entry app.jsx --output out.js');
    process.exit(1);
  }

  try {
    console.log(`Build started: ${entryPoint} -> ${outputFile}`);
    const entryPointPath = path.join(process.cwd(), entryPoint);
    const outputFilePath = path.join(process.cwd(), outputFile);

    await esbuild.build({
      entryPoints: [entryPointPath],
      bundle: true,
      outfile: outputFilePath,
      format: 'esm',
      platform: 'node',
      // @ts-ignore
      plugins: [dtsPlugin(), aliasPlugin({
        '@typespec-frontend/compiler-helper': path.resolve(__dirname, '../compiler-helper/dist/index.esm.js'),
      })],
      external: [
        '@alloy-js/core',
        '@alloy-js/typescript',
        '@typespec/compiler',
        '@typespec/compiler/typekit',
        '@typespec/emitter-framework',
        'change-case',
      ],
    });
    
    console.log('Build completed!');
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

async function executeCommand(command, entry, output) {
  switch (command) {
    case 'build:ts':
      await buildTs(entry, output);
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Available commands: build:ts');
      process.exit(1);
  }
}

async function main() {
  const { command, entry, output } = parseArgs();
  
  if (!command) {
    console.error('Command is required.');
    console.error('Available commands: build:ts');
    process.exit(1);
  }
  
  await executeCommand(command, entry, output);
}

main();
