const mongoose = require('mongoose')
async function connect () {
  await mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    // user: 'username',
    // pass: 'password'
  })
}

async function close () {
  await mongoose.connection.close()
}
module.exports = {
  mongoose,
  connect,
  close
}