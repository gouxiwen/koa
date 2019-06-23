const koa = require('koa')
const app = new koa()
const compose = require('koa-compose') // 用于将多个中间件组合成一个
async function  middleware1(ctx, netx) {
    // do something
    netx()
}
async function middleware2(ctx, netx) {
    // do something
    netx()
}
async function middleware3(ctx, netx) {
    // do something
    netx()
}
const all = compose({middleware1, middleware2, middleware3})
app.use(all)
app.listen(3000, () => {
    console.log('server is running at http://loclhost:3000')
})