const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1');
client.on('error', err => {
    console.log('Redis服务出错', err)
})
// // 用set和get方法可以在Redis中存取String类型的数据
// client.set('name', 'ikcamp', redis.print);
// client.get('name', (err, value) => {
//     if (err) throw err;
//     console.log('Name', value);
// })
// // 用hash的数据格式来存取一个对象
// client.hmset('ikcamp', { // 存一个对象
//     'item': 'koaDemo',
//     'chapter': 'redisDemo'
// });
// // 另一种存储写法
// // client.hmset('ikcamp', 'item', 'koaDemo','chapter', 'redisDemo');

// client.hgetall('ikcamp', (err, obj) => { // 取一个对象
//     if (err) throw err;
//     console.log('ikcamp', obj);
// })

// client.hkeys('ikcamp', (err, replies) => {
//     replies.forEach((reply, i) => {
//         console.log(i, ':', reply);
//     });
//     // client.quit(); // 退出连接
// })

// // 用List存取数据，类似于js数组
// // 存
// client.lpush('ikcamp1', 'koa', redis.print);
// client.lpush('ikcamp1', 'redisDemo', redis.print);
// // 取start和end范围的列表元素
// client.lrange('ikcamp1', 0, -1, (err, items) => {
//     if (err) throw err;
//     items.forEach((item, i) => {
//         console.log(i, item)
//     })
// })

// 用集合存取数据
client.sadd('address', '上海', redis.print);
client.sadd('address', '北京', redis.print);
client.sadd('address', '北京', redis.print);
client.smembers('address', (err, member) => {
    if (err) throw err;
    console.log(member);
})
