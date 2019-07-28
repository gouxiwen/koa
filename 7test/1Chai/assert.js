// Chai库下的TDD风格的断言库assert
const { assert } = require('chai');
const foo = 'bar';
const beverages = {
    tea: ['chai', 'matcha', 'colong']
};
assert.typeOf(foo, 'string');                                   // 判断foo的类型是否为string
assert.typeOf(foo, 'string', 'foo is string');                  // 判断foo的类型是否为string并添加说明
assert.equal(foo, 'bar', 'foo equal "bar"');
assert.lengthOf(foo, 3, "foo's value has a length of 3");       // 判断foo是否等于bar
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea')