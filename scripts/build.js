import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { join } from 'path';

const PLUGINS_DIR = join(import.meta.dirname, '..', 'plugins');
const REGISTRY_FILE = join(import.meta.dirname, '..', 'registry.json');

const getPluginData = (folder) => {
  const folderPath = join(PLUGINS_DIR, folder);
  if (!statSync(folderPath).isDirectory()) return null;

  const pkgPath = join(PLUGINS_DIR, folder, 'package.json');
  if (!existsSync(pkgPath)) return null;

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

  if (pkg.id !== folder) {
    console.warn(
      `"${folder}" skipped: plugin ID in package.json ("${pkg.id}") doesn't match the folder name\n`,
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
};

try {
  const folders = readdirSync(PLUGINS_DIR);
  const registry = folders
    .map(getPluginData)
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title));

  writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));
  console.log(`Registry updated: ${registry.length} plugins.`);
} catch (e) {
  console.error('Error:', e.message);
}
