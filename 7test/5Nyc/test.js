// nyc用来检测测试覆盖率，nyc需要全局安装，执行nyc mocha test.js
// 执行nyc -report=lcov -report=text-lcov mocha test.js会生成一个coverage目录，里面会生成一个测试结果页面
const should = require('chai').should();
const beverages = {tea: ['chai', 'mocha', 'oolong']};
const getTea = require('./getTea.js');
describe('Array result', () => {
    it('find a kind if tea in beverages', () => {
        getTea(1).should.to.be.oneOf(beverages.tea);
    })
})