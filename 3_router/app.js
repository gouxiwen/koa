const koa = require('koa')
const Router = require('koa-router')
const bodyparser = require('koa-bodyparser') // 用于解析post请求参数
const { sign} = require('jsonwebtoken')
const secret = 'demo'
const jwt = require('koa-jwt')({secret})
const admin = require('./admin')()

const app = new koa()
const router = new Router()

router
        .post('/api/login', async(ctx, next) => {
            const user = ctx.request.body
            console.log(user)
            if (user && user.username) {
                let { username } = user
                const token = sign({username}, secret, {expiresIn: '1h'})
                ctx.body = {
                    message: 'Get Token Success',
                    code: 200,
                    token
                }
            } else {
                ctx.body = {
                    message: 'Param Error',
                    code: 401
                }
            }
        })
        .get('/api/userInfo', jwt, async ctx => {
            ctx.body = { username: ctx.state.user.username}
        })
        .get('/api/adminInfo', jwt, admin, async ctx => {
            ctx.body = { username: ctx.state.user.username}
        })
app.use(bodyparser())
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
    console.log('服务已启动……')
})