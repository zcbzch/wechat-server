const Koa = require('koa')
const Router = require('koa-router')
// const http = require('http')
const app = new Koa()
const router = new Router()
// const cors = require('koa2-cors');

const views = require('koa-views')
const co = require('co')
const convert = require('koa-convert')
const json = require('koa-json')
const onerror = require('koa-onerror')
// koa-bodyparser 无法解析multipart/form-data;
// koa-multer 可代替
// 不可同时使用
// koa-body 功能齐全
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const cors = require('koa2-cors');
const logger = require('koa-logger')
const debug = require('debug')('koa2:server')
const path = require('path')
const server = require('http').createServer(app.callback())

const io = require('socket.io')(server, 
  {
    path: '/socket',
    serveClient: false,
    // origins: '*',
    pingInterval: 120000,
    pingTimeout: 20000,
    cookie: false,
  }
)

const config = require('./config')
const routers = require('./routers/index');

const port = process.env.PORT || config.port

// error handler
onerror(app)

routers.prefix('/api');
// middlewares
app.use(async (ctx, next) => {
  const whiteList = [
    'http://localhost:8080',
  ];
  // let exist = whiteList.includes(ctx.request.header.origin);
  let exist = true;
  if (ctx.request.header.origin !== ctx.origin && exist) {
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
    ctx.set('Access-Control-Allow-Credentials', true);
  }
  // console.log(io);
  await next();
})

app.use(async (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    ctx.body = '';
  }
  await next();
});

app.use(async (ctx, next) => {
  // console.log('io')
  await next();
});

// io.on('connection', () => {
//   console.log('connect')
// })
// app.use(cors({
//   origin: function (ctx) {
//     // if (ctx.url === '') 
//     return 'http://localhost:8080';
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))
app.use(koaBody())
.use(json())
.use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'njk': 'nunjucks'},
    extension: 'njk'
  }))
  .use(routers.routes())
  .use(routers.allowedMethods())


io.of('/join').on('connection', function (socket) {
  console.log('join');
  socket.on("common", (data) => {
    console.log(data)
    // console.log(socket)
    // socket.id
  })
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

app.on('error', function(err, ctx) {
  console.log(err)
  logger.error('server error', err, ctx)
})

module.exports = server.listen(config.port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
