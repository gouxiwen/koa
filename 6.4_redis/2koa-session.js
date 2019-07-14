// koa-session中间件基本用法
const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
app.keys = ['some sectet hurr']; // 设置签名的cookie秘钥
const CONFIG = { // session配置
    key: 'myAppSesskey', // cookie中的key，默认是koa:sess
    maxAge: 864000000, // 失效时间，单位ms
    overwrite: true, // 是否被覆盖
    httpOnly: true, // 是否禁止客户端修改Cookie，默认为true
    signed: true // 签名是否开启，与app.keys对应，默认为true
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