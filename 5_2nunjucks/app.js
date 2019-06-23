const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const path = require('path')

const app = new Koa()
const router = require('./router')

app.use(nunjucks({
  ext: 'html', // 指定视图文件默认后缀
  path: path.join(__dirname, 'views'), // 指定试图目录
  nunjucksConfig: {
    trimBlocks: true // // 开启转义 防Xss
  }
}))
app.use(bodyParser())

router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})