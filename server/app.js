import Koa from 'koa'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const koaStatic = require('koa-static');
// const proxy= require('http-proxy-middleware');

const router = new Router();
const app = new Koa();
const compile = webpack(webpackConfig);

let isPro=process.env.NODE_ENV==='production';
import dataRouter from './routers/controllers/projectData'




// let redis=require('redis'),
//     RDS_PORT = 6379,        //端口号
//     RDS_HOST = '127.0.0.1',    //服务器IP
//     RDS_PWD = 'check',
//     RDS_OPTS = {},            //设置项
//     client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
//
// client.auth(RDS_PWD,function(){
//     console.log('通过认证');
// });
//
// client.on('connect',function(){
//     client.set('author', 'lina',redis.print);
//     client.get('author', redis.print);
//     console.log('connect');
// });
//
// client.on('ready',function (err) {
//     console.log('ready-redis', err)
//
//
// })


//错误处理
const handler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        };
    }
};

app.use(koaStatic(path.join(__dirname,'../dist')));
app.use(koaStatic(path.join(__dirname,'../src/assets')));

app.use(bodyParser());

app.use(handler);

app.use(dataRouter.routes()).use(router.allowedMethods())

if(!isPro){
    app.use(devMiddleware(compile, {
        noInfo: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: false
        },
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
    }))

	//webpack热更新
    app.use(hotMiddleware(compile, {
        // log: console.log,
        // path: '/__webpack_hmr',
        // heartbeat: 10 * 1000
    }))

    //渲染页面
    router.get('*', async (ctx, next) => {
        ctx.type = 'html'
        ctx.body = `<!DOCTYPE html>
				<html lang="en">
				<head>
				<meta charset="UTF-8">
				<title>mobx-demo</title>
				<style>
					*{
					margin: 0;
					padding: 0;
					}
					html,
					body {
					-webkit-tap-highlight-color: transparent;
					height: 100%;
					touch-action: none;
					}
				</style>
				</head>
				<body>
				<div id="root" style="height: 100%;"></div>
				<script src="/dist/bundle.js"></script>
				</body>
				</html>`
    })

}else{
    //渲染页面
    router.get('*', async (ctx, next) => {
        ctx.type = 'html'

        const resbody= await fs.readFile(path.join(__dirname,'../dist/index.html'), 'utf8',(err,data)=>{
            if(err){
                console.log('Error', err);
            }else{
                return data
            }
        });
        ctx.body = resbody
    })
}

app.use(router.routes()).use(router.allowedMethods())


module.exports = app;