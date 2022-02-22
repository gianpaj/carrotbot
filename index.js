const { Telegraf } = require('telegraf');
const path = require('path');
// load env variables
require('dotenv').config({ path: path.join(__dirname, '.env') });

const bot = new Telegraf(process.env.BOTTOKEN);

bot.start((ctx) => ctx.reply('Welcome 👩‍🌾'));

bot.use(async (ctx, next) => {
  console.log(ctx.message?.text);

  const text = ctx.message?.text;
  //   if (text === 'bye') {
  //     await ctx.reply('Goodbye!', { reply_markup: keyBoard });
  //   }
  if (text === 'help') {
    await ctx.reply('Available commands: hi, bye, help');
  }
  if (text === '/uptime') {
    await ctx.reply('Uptime: ' + process.uptime());
  }
  // ctx.reply(ctx.message?.text ?? `OOPS, I don't understant.`)
  return next;
});

bot.launch();
