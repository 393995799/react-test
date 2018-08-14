/**
 * Created by lina on 2018/4/19.
 */

const Router =require('koa-router');
const dataRouter = new Router();
const axios= require('axios');
const httpRequest= require('../common/httpRequest');
const qs= require('qs')

//模拟登录接口
dataRouter.post('/login', async (ctx, next) => {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000)
    })
    // console.log(ctx.request.body)
    ctx.body = {
        errorcode: 0,
        errormsg: '登录成功'
    }
});



// /************************************ 获取首页数据 ************************************/

// dataRouter.get('/api/home',async(ctx, next)=>{
//     let res = await httpRequest.get(ctx,'/home');
//     // console.log('addparams',qs.parse(res.data))
//     ctx.body= qs.parse(res.data)
// });
//
//
// /************************************ 项目配置增删改查模块 ************************************/
//
//
// dataRouter.get('/api/projects/:projectId/configs',async (ctx,next)=>{
//     let id=ctx.params.projectId;
//     let res= await httpRequest.get(ctx,'/projects/'+ id + '/configs')
//
//     ctx.body = qs.parse(res.data)
//
// });
//
// dataRouter.post('/api/projects/:projectId/configs',async (ctx,next)=>{
//     let id=ctx.params.projectId;
//     let res= await httpRequest.post(ctx,'/projects/'+ id + '/configs')
//     // console.log('config-post',qs.parse(res.data))
//     ctx.body = qs.parse(res.data)
//
// });
//
// dataRouter.put('/api/projects/:projectId/configs/:configKey',async (ctx,next)=>{
//     let id=ctx.params.projectId;
//     let key=ctx.params.configKey;
//
//     let res= await httpRequest.put(ctx,'/projects/'+ id + '/configs/'+key)
//
//     // console.log('config-put',ctx.request.body)
//     ctx.body = qs.parse(res.data)
//
// });
//
// dataRouter.get('/api/projects/:projectId/releases/preview',async (ctx,next)=>{
//     let id=ctx.params.projectId;
//     let res= await httpRequest.get(ctx,'/projects/'+ id + '/releases/preview')
//
//     ctx.body = qs.parse(res.data)
//
// });
//
// dataRouter.delete('/api/projects/:projectId/configs/:configKey',async (ctx,next)=>{
//     let id=ctx.params.projectId;
//     let key=ctx.params.configKey;
//
//     let res= await httpRequest.delete(ctx,'/projects/'+ id + '/configs/'+ key)
//
//     ctx.body = qs.parse(res.data)
//
// });
//
//
//
// /************************************ 增加、编辑 项目模块 ************************************/
//
// dataRouter.post('/api/addProject',async (ctx, next)=> {
//     let res= await httpRequest.post(ctx,'/projects');
//     // console.log('add-post-params',qs.parse(res.data))
//     ctx.body = qs.parse(res.data)
// })
//
// dataRouter.get('/api/editProject/:projectId',async (ctx, next)=> {
//     let id=ctx.params.projectId;
//     let res= await httpRequest.get(ctx,'/projects/'+ id);
//
//     // console.log('editparams',id)
//     ctx.body = qs.parse(res.data)
// })
//
// dataRouter.put('/api/editProject/:projectId',async (ctx, next)=> {
//     let id=ctx.params.projectId;
//     let res= await httpRequest.put(ctx,'/projects/'+ id);
//     // console.log('editparams',qs.parse(res.data))
//     ctx.body = qs.parse(res.data)
// })
//
//
// /************************************ 发布模块 ************************************/
//
// dataRouter.post('/api/projects/:projectId/releases',async (ctx, next)=> {
//     let id=ctx.params.projectId;
//     let res= await httpRequest.post(ctx,'/projects/'+ id + '/releases');
//     // console.log('add-post-params',qs.parse(res.data))
//     ctx.body = qs.parse(res.data)
// })


export default dataRouter
