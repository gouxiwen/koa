const log4js = require('log4js');
const access = require("./access.js"); // 引入访问日志
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];

const baseInfo = { // 提取默认公用参数对象
  appLogLevel: 'debug', // 指定记录到日志级别
  dir: 'logs', // 指定日志存放发目录名
  env: 'dev', // 指定当前环境，默认dev
  projectName: 'koa2-tutorial', // 项目名，记录在日志中到项目信息
  serverIp: '0.0.0.0' // 默认情况下服务器IP地址
}

module.exports = (options) => {
  const contextLogger = {};
  const appenders = {};
  const opts = Object.assign({}, baseInfo, options || {});
  const { env, appLogLevel, dir, serverIp, projectName } = opts;
  const commonInfo = { projectName, serverIp };
	
  appenders.cheese = {
    type: 'dateFile',
    filename: `${dir}/task`,
    pattern: '-yyyy-MM-dd.log', // 文件名后增加后缀，按照日期分割日志
    alwaysIncludePattern: true,  // 是否总是有后缀 
  }
  
  if (env === "dev" || env === "local" || env === "development") { // 开发环境同时在控制台输出日志信息
    appenders.out = {
      type: "console",
    }
  }
  let config = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: appLogLevel
      }
    }
  }
  console.log('env', env);
  console.log('appenders', Object.keys(appenders));
  log4js.configure(config);
  const logger = log4js.getLogger('cheese');
  return async (ctx, next) => {
    const start = Date.now();
    methods.forEach((method, i) => {        // 将所有方法都挂载到ctx上
      contextLogger[method] = (message) => {
        // logger[method](message); // 只记录应用日志
        logger[method](access(ctx, message, commonInfo)) // 记录访问信息
      }
    });
    ctx.log = contextLogger;
    await next();
    const responseTime = Date.now() - start;
    // logger.info(access(`响应时间为${responseTime/1000}s`)); // 只记录应用日志
    logger.info(access(ctx, {
      responseTime: `响应时间为${responseTime/1000}s`
    }, commonInfo)); // 记录访问信息
  }
}