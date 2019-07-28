// mocha是一个js测试框架，是一个任务运行器，需要配合类似于chai的断言库来编写
const should = require('chai').should();
const foo = 'bar';
// 异步--Promise实现
describe('Asynchronous', () => {
    it('promise', () => {
        return new Promise(resolve => {
            foo.should.be.a('string');
            resolve()
        })
    })
})