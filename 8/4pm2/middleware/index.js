const path = require('path')
const ip = require('ip');
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const miSend = require('./mi-send')
const miLog = require('./mi-log');

const miHttpError = require('./mi-http-error')

const miRule = require('./mi-rule');
module.exports = (app) => {
  // miRule是个函数不是中间件，只会在程序启动时执行一次
  miRule({
    app,
    rules: [{ //指定controller文件夹下的js文件，挂载在app.controller属性
            folder: path.join(__dirname, '../controller'),
            name: 'controller'
        },
        { // 指定service文件夹下的js文件，挂载在app.service属性
            folder: path.join(__dirname, '../service'),
            name: 'service'
        }
    ]
  });

  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')
  }))
  app.use(miLog({
    env: app.env,
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }));
  app.use(staticFiles(path.resolve(__dirname, "../public")))

  app.use(nunjucks({
    ext: 'html',// 指定视图文件默认后缀
    path: path.join(__dirname, '../views'), // 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义，防止xss攻击
    }
  }));

  app.use(bodyParser())
  app.use(miSend())
}