/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import path from 'path';
import { Bot, session } from 'grammy';
import { I18n } from '@grammyjs/i18n';
import { generateUpdateMiddleware } from 'telegraf-middleware-console-time';
import { MenuMiddleware } from 'grammy-inline-menu';
import { FileAdapter } from '@satont/grammy-file-storage';

import { MyContext } from './my-context';
import { Reminder } from './reminder';

const reminder = new Reminder();

// load env variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

import { menu } from './menu';

const token = process.env['BOTTOKEN'];
if (token === undefined) {
  throw new Error('BOTTOKEN must be provided!');
}

const bot = new Bot<MyContext>(token);

bot.use(
  session({
    initial: () => ({ pizzaCount: 0 }),
    storage: new FileAdapter({
      dirName: 'sessions',
    }),
  })
);

const i18n = new I18n({
  directory: 'locales',
  defaultLanguage: 'en',
  defaultLanguageOnMissing: true,
  useSession: true,
});

bot.use(i18n.middleware());

// if (process.env['NODE_ENV'] !== 'production') {
// Show what telegram updates (messages, button clicks, ...) are happening (only in development)
bot.use(generateUpdateMiddleware());
// }

const menuMiddleware = new MenuMiddleware('/', menu);
bot.command('start', async (context) => menuMiddleware.replyToContext(context));
bot.command('settings', async (context) => menuMiddleware.replyToContext(context, '/settings/'));
bot.use(menuMiddleware.middleware());

bot.command('help', async (context) => context.reply(context.i18n.t('help')));
bot.hears('test', async (ctx) => {
  const count = ctx.session.pizzaCount;
  return ctx.reply(`Your hunger level is ${count}!`);
  // context.reply('*Hi\\!* _Welcome_ to [grammY](https://grammy.dev)\\.', { parse_mode: 'MarkdownV2' })
});

bot.hears(/.*🍕.*/, (ctx) => {
  const count = ++ctx.session.pizzaCount;
  return ctx.reply(`Your hunger level is ${count}!`);
});
bot.hears(/reset/, (ctx) => {
  ctx.session.pizzaCount = 0;
  return ctx.reply(`Your hunger level is ${0}!`);
});
bot.hears(/\/remind/, (ctx) => reminder.handle(ctx));

bot.catch((error) => {
  console.error('ERROR on handling update occured', error);
});

async function start(): Promise<void> {
  // The commands you set here will be shown as /commands like /start or /magic in your telegram client.
  await bot.api.setMyCommands([
    { command: 'start', description: 'open the menu' },
    // { command: 'magic', description: 'do magic' },
    { command: 'help', description: 'show the help' },
    { command: 'settings', description: 'open the settings' },
  ]);

  await bot.start({
    onStart: (botInfo) => {
      console.log(new Date(), 'Bot starts as', botInfo.username);
    },
  });
}

start();

const keyBoard = {
  inline_keyboard: [
    [
      {
        text: 'Uptime',
        callback_data: 'uptime',
      },
    ],
    [
      {
        text: 'Total',
        callback_data: 'total',
      },
    ],
  ],
};

// bot.on('callback_query', ({ data }) => {
//   switch (data) {
//     case 'uptime':
//       // bot.telegram.sendMessage(
//       break;

//     default:
//       break;
//     // bot.telegram.sendMessage(data.message.chat.id, 'uptime');
//   }
// });

// bot.use(async (ctx, next) => {
//   console.log(ctx.message?.text);

//   const text = ctx.message?.text;
//   //   if (text === 'bye') {
//   //     await ctx.reply('Goodbye!', { reply_markup: keyBoard });
//   //   }
//   if (text === 'help') {
//     await ctx.reply('Available commands: hi, bye, help');
//   }
//   if (text === '/uptime') {
//     await ctx.reply('Uptime: ' + process.uptime());
//   }
//   // ctx.reply(ctx.message?.text ?? `OOPS, I don't understant.`)
//   return next;
// });

// bot.launch();
