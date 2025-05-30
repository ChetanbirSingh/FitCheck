export type TechstackTypes = 'html_css' | 'react' | 'next' | 'vue' | 'svelte' | 'solid' | 'angular';

export const supportedFileTypes: Record<TechstackTypes, string[]> = {
  html_css: ['.html', '.css', '.js', '.md'],
  react: ['.jsx', '.js', '.css', '.scss', '.md'],
  next: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.md'],
  vue: ['.vue', '.js', '.css', '.scss', '.md'],
  svelte: ['.svelte', '.js', '.css', '.md'],
  solid: ['.jsx', '.js', '.ts', '.tsx', '.md'],
  angular: ['.ts', '.html', '.css', '.md'],
};

export const ignoredFiles: string[] = [
  'layout',
  '_app',
  '_document',
  '_layout',
  '_middleware',
  'middleware',
  'serviceWorker',
  '.config',
  '.test',
  '.spec',
  'vite.config',
  'tailwind.config',
  'postcss.config',
  'webpack.config',
  'babel.config',
  'jest.config',
];

export const allowedStacks = Object.keys(supportedFileTypes);

export type ModesType = 'mentor' | 'recruiter' | 'senior' | 'designer' | 'peer';

export const allowedPersona: ModesType[] = [
  'mentor',
  'recruiter',
  'senior',
  'designer',
  'peer',
];