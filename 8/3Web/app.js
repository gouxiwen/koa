// 优化web结构，改造8/2httpError，主要优化router.js，middleware/index.js,新增mi-rule/index.js，便于扩展
const Koa = require('koa')
const app = new Koa()
app.env = 'prd' // 设置环境，默认development
const router = require('./router')

const middleware = require('./middleware')

middleware(app)

app.use(async (ctx, next) => {
  ctx.log.info('访问记录')
  // ctx.log2.info('访问记录') // 错误将被捕获处理
  await next()
})
router(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
// Koa继承自events模块，因此可以执行监听和触发操作，这里在程序最外层监听error事件，即可捕获异常，防止程序崩溃
app.on("error", (err, ctx) => {
  if (ctx && !ctx.headerSent && ctx.status < 500) {
    ctx.status = 500;
  };
  if (ctx && ctx.log && ctx.log.error) {
    if (!ctx.state.logged) {
      // 输出到日志
      ctx.log.error(err.stack);
    };
  };
});