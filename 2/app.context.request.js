const koa = require('koa')
const app = new koa()
app.use(async (ctx, netx) => {
    await netx()
    // get请求
    // ctx.response.type = 'text/html'
    ctx.response.body = {
        url: ctx.request.url,
        query: ctx.request.query,
        querystring: ctx.request.querystring
    }
    // post请求
    let postData = ''
    ctx.req.on('data', (data) => { // 使用node原生req对象
        postData += data
    })
    ctx.req.on('end', () => {
        console.log(postData)
    })
})
app.listen(3000, () => {
    console.log('server is running at http://loclhost:3000')
})