// mocha是一个js测试框架，是一个任务运行器，需要配合类似于chai的断言库来编写
const should = require('chai').should();
const foo = 'bar';
const tdd = 1;
// Hook
describe('hook', () => {
    it('foo should be a string', () => {
        foo.should.be.a('string')
    })
    it('tdd should be a number', () => {
        tdd.should.be.a('number')
    })
    before(() => {
        console.log('before')
    });
    after(() => {
        console.log('after')
    });
    beforeEach(() => {
        console.log('beforEach')
    });
    afterEach(() => {
        console.log('afterEach')
    });
})