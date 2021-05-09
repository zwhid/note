import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'zwh',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: '/note/logo.png',
  outputPath: 'dist',
  base: '/note/',
  publicPath: '/note/',
  navs: [
    { title: '造轮子学源码', path: '/wheel' },
    { title: 'Node.js', path: '/node.js' },
    { title: 'JavaScript', path: '/java-script' },
    { title: 'Vue', path: '/vue' },
    { title: 'Webpack', path: '/webpack' },
    { title: '工程化', path: '/engineering' },
    { title: 'HTTP', path: '/http' },
    {
      title: '更多',
      path: '/monitor',
      children: [
        { title: 'TypeScript', path: '/type-script' },
        { title: 'Linux', path: '/linux' },
        { title: 'MySQL', path: '/my-sql' },
        { title: 'MongoDB', path: '/mongo-db' },
        { title: 'Nginx', path: '/nginx' },
        { title: 'Docker', path: '/docker' },
        { title: 'Python', path: '/python' },
        { title: '爬虫', path: '/crawl' },
        { title: '前端监控', path: '/monitor' },
        { title: 'React', path: '/react' },
        { title: '其他', path: '/other' },
      ]
    },
  ]
});
