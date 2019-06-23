const koa = require('koa')
const app = new koa()
const bodyparser = require('koa-bodyparser') // 用于解析post请求参数
const Router = require('koa-router')
const router = new Router() // 初始化koa-router中间件
router.get('/', (ctx, next) => {
    ctx.type = 'html'
        let html = `
        <h1>登录</h1>
        <form method="POST" action="/">
        <p>用户名</p>
        <input name="userName"/><br/>
        <p>用户名</p>
        <input name="password" type="password" /><br/>
        <button type="submit">登录</button>
        <form/>`
        ctx.body = html
})
router.post('/', (ctx, next) => {
    // 当post请求时，koa-bodyparser解析post表单里的数据
    let postData = ctx.request.body
    ctx.body = postData
})

app
    .use(bodyparser()) // 加载bodyparser中间件
    .use(router.routes()) // 加载koa-router中间件
    .use(router.allowedMethods()) // 对异常状态码的处理
// app.use(async (ctx, next) => { // 使用koa-router中间件代替手动判断
//     console.log(ctx)
//     if (ctx.url === '/' && ctx.method === 'GET') {
//         ctx.type = 'html'
//         let html = `
//         <h1>登录</h1>
//         <form method="POST" action="/">
//         <p>用户名</p>
//         <input name="userName"/><br/>
//         <p>用户名</p>
//         <input name="password" type="password" /><br/>
//         <button type="submit">登录</button>
//         <form/>`
//         ctx.body = html
//     } else if (ctx.url === '/' && ctx.method === 'POST') {
//         // 当post请求时，koa-bodyparser解析post表单里的数据
//         let postData = ctx.request.body
//         ctx.body = postData
//     }
// })

app.listen(3000, () => {
    console.log('server is running at http://loclhost:3000')
})