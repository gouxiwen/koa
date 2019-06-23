module.exports = () => {
    return async (ctx, next) => {
        if (ctx.state.user.username === 'admin') {
            next()
        } else {
            ctx.body = {
                code: 403,
                message: '没有管理员权限'
            }
        }
    }
}