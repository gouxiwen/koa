// 日志的作用
const log4js = require('log4js'); // 引入log4js组件
const logger = log4js.getLogger(); // 获取日志记录器，默认输出到console中
logger.level = 'debug';            // 设置日志输出级别
logger.debug("Some debug messages"); // 记录debug级别的日志