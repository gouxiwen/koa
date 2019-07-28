// mocha是一个js测试框架，是一个任务运行器，需要配合类似于chai的断言库来编写
const should = require('chai').should();
const foo = 'bar';
// 异步--回调函数实现
describe('Asynchronous', () => {
    it('done should be executed after 200ms', (done) => {
        const fn = () => {
            foo.should.be.a('string');
            done();
        }
        setTimeout(fn, 200);
    })
})