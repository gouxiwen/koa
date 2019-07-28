// mocha是一个js测试框架，是一个任务运行器，需要配合类似于chai的断言库来编写，mocha需要全局安装，执行mock 1.js
const should = require('chai').should();
const foo = 'bar';
describe('String', () => {
    it('foo should be a string', () => {
        foo.should.be.a('string')
    })
})