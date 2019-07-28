// Chai库下的BDD风格的断言库expect，更加接近于自然语言，便于非程序员理解掌握
const { expect } = require('chai');
const foo = 'bar';
const beverages = {
    tea: ['chai', 'matcha', 'colong']
};
expect(foo).to.be.a('string');                                  // 判断foo的类型是否为string
expect(foo).to.equal("bar");
expect(foo).to.have.lengthOf(3);       // 判断foo是否等于bar
expect(beverages).to.have.property('tea').with.lengthOf(3);