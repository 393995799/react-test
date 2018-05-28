
## 1. 介绍
### 功能介绍
* 配置中心系统
* 实现组件懒加载功能，提取第三方库，样式的autoprefixer，样式采用less以及css modules

### 安装及启动
#### 1. 安装依赖
  npm install
#### 2. 启动项目(请保证nodejs的版本在7.0以上)
* 开发环境启动`npm run dev:rs`
#### 3. 运行网页
* 浏览器输入 `localhost:8082`
#### 4. 打包项目
* 开发环境 单独打包`npm run 的 dev:build`, 打包+启动 npm run dev:start
* 生产环境 打包npm run build 启动 npm run start
#### 5. 开发环境服务配置nodemon修改src外的文件自动重启
* npm run dev:rs


## 2. 使用技术
* 前端框架：react16 + react-router4
* UI库： antd
* nodejs框架： koa2
* 状态管理工具： mobx3
* 前后端通信： axios
* 打包工具： webpack3
* 测试数据： mockjs
* 自动重启： nodemon
* 代码检测： eslint
* 测试： mocha+chai+supertest


* [react](https://facebook.github.io/react/)
* [react-router4](https://github.com/ReactTraining/react-router)
* [mobx](https://github.com/mobxjs/mobx)
* [mobx-react](https://github.com/mobxjs/mobx-react)
* [antd-design](https://ant.design/docs/react/introduce-cn)
* [axios](https://github.com/mzabriskie/axios)


## 3. nodemon使用参数 配置文件nodemon.json
* restartable-设置重启模式
* ignore-设置忽略文件
* verbose-设置日志输出模式，true 详细模式
* execMap-设置运行服务的后缀名与对应的命令
 `{
 “js”: “node –harmony”
 }`
* 表示使用 nodemon 代替 node
* watch-监听哪些文件的变化，当变化的时候自动重启
* ext-监控指定的后缀文件名

## 4. eslint使用
* 需要安装 eslint eslint-plugin-react babel-eslint
* 需要配置 webpack需要配置eslint-loader
