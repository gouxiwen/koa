const request = require('supertest'); // 引入SuperTest测试库，执行mock test.js
const Koa = require('koa');
const cors = require('./cors.js');

describe('test.corsj.s', () => {
    it('should always set `Access-Control-Allow-Origin` to *', done => {
        const app = new Koa();
        app.use(cors);
        app.use(ctx => {
            ctx.body = { foo: 'bar'};
        });
        request(app.listen()) // 使用SuperTest进行HTTP请求测试
        .get('/')
        .expect('Access-Control-Allow-Origin', '*')
        .expect({foo: 'bar'})
        .expect(200, done);
    })
})