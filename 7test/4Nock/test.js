const should = require('chai').should();
const nock = require('nock');
// const request = require('supertest'); // 会报错，有点疑惑 TypeError: request.post is not a function
const request = require('superagent');

const foo = 'bar';
describe('request', () => {
    beforeEach(() => {
        // Nock代码
        nock('http://www.test.com')
            .post('/test1')
            .delay(200)
            .reply(200, { foo: 'bar' });
    });
    it('core', (done) => {
        request.post(`http://www.test.com/test1`).end((err, res) => {
            res.text.should.equal('{"foo":"bar"}');
            res.body.foo.should.equal('bar');
            done(); // 显式调用这个函数,通知 Mocha 测试结束.
        });
    });
});