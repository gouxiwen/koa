// Chai库下的BDD风格的断言库should，更加接近于自然语言，便于非程序员理解掌握
const should = require('chai').should();
const foo = 'bar';
const beverages = {
    tea: ['chai', 'matcha', 'colong', '']
};
foo.should.be.a('string');                                  // 判断foo的类型是否为string
foo.should.equal("bar");
foo.should.have.lengthOf(3);       // 判断foo是否等于bar
beverages.should.have.property('tea').with.lengthOf(4);