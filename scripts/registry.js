import fs from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { styleText } from 'node:util';

const REGISTRY = styleText('green', '[Registry]');
const ERROR = styleText('red', '[Error]');

const PLUGINS_DIR = join(import.meta.dirname, '..', 'src', 'plugins');
const REGISTRY_FILE = join(import.meta.dirname, '..', 'registry.json');

try {
  const manifests = await Array.fromAsync(fs.glob('*/package.json', { cwd: PLUGINS_DIR }));

  const registry = (
    await Promise.all(
      manifests.map(async (relativePkgPath) => {
        const folder = dirname(relativePkgPath);

        try {
          const pkg = JSON.parse(await fs.readFile(join(PLUGINS_DIR, relativePkgPath), 'utf-8'));

          if (pkg.id !== folder) {
            console.warn(
              `${REGISTRY} Skipped "${folder}": ID mismatch (folder name is "${folder}", but package.json id is "${pkg.id}").`,
            );
            return null;
          }

          return {
            id: pkg.id,
            title: pkg.title || pkg.id,
            description: pkg.description || 'No description provided for this plugin.',
            version: pkg.version || '1.0.0',
            author: pkg.author || 'Community',
          };
        } catch {
          return null;
        }
      }),
    )
  )
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));

  await fs.writeFile(REGISTRY_FILE, JSON.stringify(registry, null, 2));

  console.log(`${REGISTRY} Registry updated: ${registry.length} plugins.`);
} catch (error) {
  console.error(`${ERROR} Registry build failed:`, error.message || error);
  process.exit(1);
}
