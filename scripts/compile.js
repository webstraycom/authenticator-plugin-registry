import * as esbuild from 'esbuild';
import fs from 'node:fs/promises';
import { relative, dirname, join } from 'node:path';
import { styleText } from 'node:util';

const COMPILER = styleText('yellow', '[Compiler]');
const ERROR = styleText('red', '[Error]');

try {
  const TARGETS = ['plugins', 'templates'];

  const entryPoints = (
    await Promise.all(
      TARGETS.map((t) => Array.fromAsync(fs.glob(`src/${t}/**/index.{js,jsx,ts,tsx}`))),
    )
  ).flat();

  if (!entryPoints.length) {
    console.log(`${COMPILER} No source files found in src/.`);
    process.exit(0);
  }

  console.log(`${COMPILER} Found ${entryPoints.length} files to compile.`);
  console.log(`${COMPILER} Compiling source files...`);

  await Promise.all(
    TARGETS.map((t) => fs.rm(t, { recursive: true, force: true }).then(() => fs.mkdir(t))),
  );

  await Promise.all(
    entryPoints.map(async (file) => {
      const outPath = relative('src', file).replace(/\.(js|jsx|ts|tsx)$/, '.js');
      const outDir = dirname(outPath);

      await fs.mkdir(outDir, { recursive: true });

      await Promise.all([
        esbuild.build({
          entryPoints: [file],
          outfile: outPath,
          bundle: true,
          format: 'esm',
          target: 'es2022',
          jsx: 'transform',
          ignoreAnnotations: true,
        }),
        fs.copyFile(join(dirname(file), 'package.json'), join(outDir, 'package.json')),
      ]);
    }),
  );

  console.log(`${COMPILER} Plugins and templates compiled successfully.`);
} catch (error) {
  console.error(`${ERROR} Compilation failed:`, error.message || error);
  process.exit(1);
}
