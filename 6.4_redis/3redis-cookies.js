// Redis实战，持久化用户session状态,，改造koa-session.js
const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');

const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1');
const {promisify} = require('util');
// 用promisify改造client.hgetall
const hgetallAsync = promisify(client.hgetall).bind(client)

app.keys = ['some sectet hurr']; // 设置签名的cookie秘钥
const store = { // 配置session如何存取Session
    get: async(key, maxAge) => {
        return await hgetallAsync(key);
    },
    set: (key, sess, maxAge) => {
        client.hmset(key, sess)
    },
    destroy: key => {
        client.hdel(key) // 销毁Redis中的Session
    }
}
const CONFIG = { // session配置
    key: 'koa:sess', // cookie中的key，默认是koa:sess
    maxAge: 864000000, // 失效时间，单位ms
    overwrite: true, // 是否被覆盖
    httpOnly: true, // 是否禁止客户端修改Cookie，默认为true
    signed: true, // 签名是否开启，与app.keys对应，默认为true
    store
}
app.use(session(CONFIG, app));
app.use(ctx => {
    console.log(ctx.session);
    if (ctx.path === '/favicon.ico') return; // 忽略favicon.ico图标的访问请求
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + 'views'
})
app.listen(3000);
console.log('Server running in localhost:3000')

// 重启Redis服务器验证持久化

// Windows下关闭服务器：
// 查看所有进程：
// netstat -ano
// 查看特定端口进程，如：6379
// netstat -ano |findstr 6379
// 根据进程PID杀掉进程
// taskkill /f /t /im PID

// Mac下查看特定端口进程
// sudo lsof -i :6379
// 根据进程PID杀掉进程
// sudo kill -9 PID

// 重启Redis服务
// redis-server