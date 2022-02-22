import { MenuTemplate } from 'grammy-inline-menu';

import { MyContext } from '../my-context';

import { menu as pizzaMenu } from './pizza';
import { menu as settingsMenu } from './settings';

export const menu = new MenuTemplate<MyContext>((context) => context.i18n.t('welcome'));

// menu.url('Telegram API Documentation', 'https://core.telegram.org/bots/api');
// menu.url('grammY Documentation', 'https://grammy.dev/');
// menu.url('Inline Menu Documentation', 'https://github.com/EdJoPaTo/grammy-inline-menu');

menu.submenu((context) => '⚙️' + context.i18n.t('menu.settings'), 'settings', settingsMenu);
menu.submenu(() => '🍕', 'pizza', pizzaMenu);
