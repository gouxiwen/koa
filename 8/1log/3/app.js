// 日志分割，改造5_3项目
const Koa = require('koa')
const app = new Koa()
app.env = 'prd' // 设置环境，默认development
const router = require('./router')

const middleware = require('./middleware')

middleware(app)

router(app)
app.use(ctx => {
  ctx.log.info('访问记录')
})
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})