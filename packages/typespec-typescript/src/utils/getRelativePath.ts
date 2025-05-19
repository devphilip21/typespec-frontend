/**
 * Calculates the relative path between two file paths.
 * This utility was created because the built-in path module doesn't support direct file-to-file path comparison.
 *
 * @param targetFile - The target file path
 * @param baseFile - The base file path to calculate from
 * @param removeExtension - Whether to remove the file extension
 * @returns The relative path
 */
export const getRelativePath = (targetFile: string, baseFile: string, removeExtension: boolean = false): string => {
  const baseDir = baseFile.substring(0, baseFile.lastIndexOf('/'));
  const baseParts = baseDir.split('/').filter(Boolean);
  const targetParts = targetFile.split('/').filter(Boolean);

  let i = 0;
  while (i < baseParts.length && i < targetParts.length && baseParts[i] === targetParts[i]) {
    i++;
  }

  const upMoves = baseParts.length - i;
  const relativeParts = Array(upMoves).fill('..');
  const remaining = targetParts.slice(i);
  relativeParts.push(...remaining);

  let relativePath = relativeParts.join('/');
  if (!relativePath.startsWith('.') && relativePath !== '') {
    relativePath = './' + relativePath;
  }

  if (removeExtension && relativePath.includes('.')) {
    const lastDotIndex = relativePath.lastIndexOf('.');
    if (lastDotIndex > 0) {
      relativePath = relativePath.substring(0, lastDotIndex);
    }
  }

  return relativePath || '.';
};
