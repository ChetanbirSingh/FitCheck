export function formatCodeToString(codeObj: Record<string, { code: string }>) {
  return Object.entries(codeObj)
    .map(([filename, { code }]) => {
      const trimmedCode = code
        .split('\n')
        .map((line) => line.trimStart())
        .join('\n');
      return `${filename}\n\`\`\`\n${trimmedCode}\n\`\`\``;
    })
    .join('\n\n');
}
