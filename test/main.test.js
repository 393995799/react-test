/**
 * Created by lina on 2018/5/16.
 */
require('babel-core/register');
require('babel-polyfill');

const app = require('../server/app');
const request = require('supertest')

const mocha = require('mocha');
const expect = require('chai').expect;


describe('#test koa app', () => {

    let server = app.listen(9900);

    describe('#test server', () => {

        it('#test GET /', async () => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .end();
        });

        it('#test GET /path?name=addProject', async () => {
            let res = await request(server)
                .get('/path?name=addProject')
                .expect('Content-Type', /text\/html/)
                .end();
        });
    });
});
