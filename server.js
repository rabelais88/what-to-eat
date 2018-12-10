const Koa = require('koa');
// const Router = require('koa-router');
const mount = require('koa-mount');
const serve = require('koa-static');
const fs = require('fs');
// const router = new Router();
const myPort = process.eventNames.PORT || 3000;

const app = new Koa();
const page2 = new Koa();
page2.use(async function (ctx, next) {
  await next();
  ctx.body = 'testpage';
})

app.use(mount('/test', page2));
app.use(mount('/', serve('build')));

app.listen(myPort);
console.log(`listening on port ${myPort}`);