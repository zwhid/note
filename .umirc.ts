import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'zwh',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  mode: 'site',
  outputPath: 'dist',
  base: '/note/',
  publicPath: '/note/',
  navs: [
    { title: 'MongoDB', path: '/mongo-db' },
    { title: 'HTTP', path: '/http' },
  ]
});
