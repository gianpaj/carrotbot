import { MenuTemplate } from 'grammy-inline-menu';

import { backButtons } from '../general';
import { MyContext } from '../../my-context';

export const menu = new MenuTemplate<MyContext>((context) =>
  context.i18n.t('pizza.body', { count: context.session.pizzaCount })
);

menu.interact('reset', 'Reset', {
  do: (ctx, key) => {
    ctx.session.pizzaCount = 0;
    return ctx.answerCallbackQuery({ text: 'reset back to 0' });
  },
});

menu.manualRow(backButtons);
