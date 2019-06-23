const koa = require('koa')
const app = new koa()
app.use(async (ctx, netx) => {
    ctx.response.status = 200
        ctx.cookies.set('login', 'abc', {domain: 'localhost', path: '/'})
        ctx.response.body = {
            data: 'hello world'
        }
})
app.listen(3000, () => {
    console.log('server is running at http://loclhost:3000')
})