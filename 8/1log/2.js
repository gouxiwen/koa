// 日志的分类
const log4js = require('log4js'); // 引入log4js组件 
log4js.configure({
    appenders: {
        cheese: {           // 指定要记录到日志分类名为cheese
            type: 'file',   // 指定日志展示方式为文件类型file
            filename: 'cheese.log' // 指定日志输入文件名
        }
    },
    categories: {
        default: {                  // 日志默认配置项
            appenders: ['cheese'], // 如果log4js.gerLogger中没有指定采用哪种分类日志，则默认采用cheese日志到配置项
            level: 'error'          // 日志记录到信息级别为error及以上级别
        }
    }
});
const logger = log4js.getLogger('cheese'); // 获取日志记录器，默认输出到console中
// logger.level = 'debug';            // 设置日志输出级别
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Good.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.")