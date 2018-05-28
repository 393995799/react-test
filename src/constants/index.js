// console.log('front_NODE_ENV',process.env.NODE_ENV)
//开发和生产环境配置不同的baseurl
export const API_PATH = process.env.NODE_ENV === 'development' ? '' : '';

