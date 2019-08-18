//  将应用构建成docker镜像(未完成)
// 1.在根目录下新建Dockerfile文件，写入该应用到配置信息
// 2.执行 docker build -t  '镜像名称' DockerfilePath 命令进行构建镜像
// 3.构建完成后执行 docker images 查看镜像列表，检查是否构建成功
// 4.构建成功以后，执行 docker run -d -p 4123:3000 '镜像名称' 运行该镜像生成的容器 
//            --cpus 4 最大使用cpu核数为4
//            -m 512M 最大内存上限，超过上限，进程会被kill
// 5.保存镜像：
//   1.save
//   2.push
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
// 暂停应用时，如果有资源需要释放或者事务需要结束（如数据库连接），可以监听并拦截SIGINT信号，清理完毕后手动关闭应用
// process.on('SIGINT', () => {
//   db.stop(err => {
//     process.exit(err ? 1 :0)
//   })
// })