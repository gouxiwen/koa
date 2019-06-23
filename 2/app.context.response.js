const koa = require('koa')
const app = new koa()
app.use(async (ctx, netx) => {
    ctx.response.status = 200
    if (ctx.request.accepts('json')) {
        ctx.response.type = 'json'
        ctx.response.body = {
            data: 'hello world'
        }
    } else if (ctx.request.accepts('html')) {
        ctx.response.type = 'html'
        ctx.response.body = '<h1>hello world'
    } else {
        ctx.response.body = 'hello world'
    }
})
app.listen(3000, () => {
    console.log('server is running at http://loclhost:3000')
})