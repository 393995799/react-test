/**
 * Created by lina on 2018/4/21.
 */

const fs=require('fs');
const path=require('path');
const axios= require('axios');
const qs= require('qs');

// let baseUrl= 'http://192.168.20.204:8080/pineapple';
let baseUrl= 'http://192.168.25.55:9005/pineapple';

exports.get= function (ctx,url) {
    // console.log('getCtx-get',url)
    return axios({
        method: 'GET',
        url: baseUrl + url,
        params: ctx.body || null
    })
}

exports.put= function (ctx,url) {
    // console.log('putCtx-put',url)
    return axios({
        method: 'PUT',
        url: baseUrl + url,
        params: ctx.body || null
    })
}


exports.post= function (ctx,url) {
    // console.log('params-post',ctx.request.body)
    return axios({
        method: 'POST',
        url: baseUrl + url,
        params: ctx.request.body
    })

}


exports.delete= function (ctx,url) {
    // console.log('params-delete',ctx.request.body)
    return axios({
        method: 'DELETE',
        url: baseUrl + url,
        params: ctx.request.body || null
    })

}



