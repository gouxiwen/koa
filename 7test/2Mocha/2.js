// mocha是一个js测试框架，是一个任务运行器，需要配合类似于chai的断言库来编写，执行mock 2.js
const should = require('chai').should();
const beverage = { tea: ['chai', 'matcha', 'oolong']}
describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            beverage.tea.indexOf('puer').should.equal(-1)
        })
    })
})