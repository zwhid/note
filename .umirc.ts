import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'zwh',
  // favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  favicon: '/note/favicon.ico',
  logo: '/note/logo.png',
  outputPath: 'dist',
  base: '/note/',
  publicPath: '/note/',
  navs: [
    {
      title: 'Spring',
      path: '/spring',
      children: [
        { title: 'Spring', path: '/spring' },
        { title: 'SpringMVC', path: '/spring-mvc' },
        { title: 'SpringBoot', path: '/spring-boot' },
        { title: 'Servlet', path: '/servlet' },
      ],
    },

    { title: 'Java', path: '/java-se' },

    {
      title: '数据库',
      path: '/my-sql',
      children: [
        { title: 'MySQL', path: '/my-sql' },
        { title: 'Redis', path: '/redis' },
        { title: 'ElasticSearch', path: '/elastic-search' },
        { title: 'MongoDB', path: '/fe_mongo-db' },
      ],
    },

    {
      title: '架构',
      path: '/spring-cloud',
      children: [
        { title: 'SpringCloud', path: '/spring-cloud' },
        { title: '商品秒杀', path: '/architect' },
        { title: 'MQ', path: '/mq' },
      ],
    },

    {
      title: '前端开发',
      path: '/fe_wheel',
      children: [
        { title: '前端轮子', path: '/fe_wheel' },
        { title: 'NodeJS', path: '/fe_node-js' },
        { title: 'HTTP', path: '/fe_http' },
        { title: 'JavaScript', path: '/fe_java-script' },
        { title: 'Vue', path: '/fe_vue2' },
        { title: 'React', path: '/fe_react' },
        { title: 'CSS', path: '/fe_css' },
        { title: 'Dom', path: '/fe_browser' },
        { title: 'TypeScript', path: '/fe_type-script' },
      ],
    },

    {
      title: '运维部署',
      path: '/nginx',
      children: [
        { title: 'Linux', path: '/linux' },
        { title: 'Nginx', path: '/nginx' },
        { title: 'Docker', path: '/docker' },
        { title: 'Webpack', path: '/fe_webpack' },
        { title: '前端自动化构建部署', path: '/fe_cicd' },
        { title: '前端监控', path: '/fe_monitor' },
      ],
    },

    {
      title: '通用技术',
      path: '/crawl',
      children: [
        { title: '爬虫', path: '/crawl' },
        { title: '算法', path: '/algorithm' },
        { title: '数据结构', path: '/data-structure' },
        { title: 'Python', path: '/python' },
        { title: '工具', path: '/tools' },
      ],
    },
  ],
});
