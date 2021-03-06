const Koa = require('koa')
const Router = require('koa-router')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const path = require('path')
const app = new Koa()
const router = new Router()
const {
  connect,
  close
} = require('./lib/conn')
const {
  getCourseList,
  getCourseById,
  updateCourse,
  removeCourse,
  addCourse
} = require('./lib')
const bodyParser = require('koa-bodyparser')

const JSON_MIME = 'application/json'

router.get('/', async (context) => {
  // 通过模板引擎访问views下的资源，也可以通过http://localhost:4001/index.html直接访问public下的index.html
  context.render('index')
})

router.get('/course', async (context) => {
  context.type = JSON_MIME
  context.body = {
    status: 0,
    data: await getCourseList()
  }
})

router.get('/course/:id', async context => {
  context.type = JSON_MIME
  context.body = {
    status: 0,
    data: await getCourseById(context.params.id)
  }
})

router.post('/course', async context => {
  context.type = JSON_MIME
  await addCourse(context.request.body)
  context.body = {
    status: 0
  }
})

router.put('/course/:id', async context => {
  await updateCourse(context.params.id, context.request.body)
  context.body = {
    status: 0
  }
})

router.delete('/course/:id', async context => {
  await removeCourse(context.params.id)
  context.body = {
    status: 0
  }
})

app.use(staticFiles(path.resolve(__dirname, "public")))
app.use(nunjucks({
  ext: 'html',// 指定视图文件默认后缀
  path: path.join(__dirname, './views'), // 指定视图目录
  nunjucksConfig: {
    trimBlocks: true // 开启转义，防止xss攻击
  }
}));
app.use(bodyParser())


app.use(async (context, next) => {
  try {
    await next()
  } catch (error) {
    context.type = JSON_MIME
    context.body = {
      status: -1,
      message: error.message
    }
  }
})

app.use(async (context, next) => {
  await connect()
  await next()
  await close()
})
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4001)
console.log('Server running in localhost:4001')