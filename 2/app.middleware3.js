const koa = require('koa')
const app = new koa()
const bodyparser = require('koa-bodyparser') // 用于解析post请求参数
const views = require('koa-views')
const static = require('koa-static')
const path = require('path')
const Router = require('koa-router')
const router = new Router() // 初始化koa-router中间件
app.use(views(__dirname + '/views', { // 加载模板引擎
    map: { html: 'ejs'}
}))
app.use(static(path.join(__dirname, '/static'))) // 加载静态资源

router.get('/', async (ctx, next) => {
  await ctx.render('index.html') // 渲染模板
})
router.post('/',(ctx, next) => {
    // 当post请求时，koa-bodyparser解析post表单里的数据
    let postData = ctx.request.body
    ctx.body = postData
})

app
    .use(bodyparser()) // 加载bodyparser中间件
    .use(router.routes()) // 加载koa-router中间件
    .use(router.allowedMethods()) // 对异常状态码的处理
app.listen(3000, () => {
    console.log('server is running at http://loclhost:3000')
})