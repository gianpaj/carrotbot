import { Context as BaseContext } from 'grammy';
const parseReminder = require('parse-reminder');

export class Reminder<Context extends BaseContext> {
  /**
   * handle Reminder command
   * @param context Context where the root menu should be replied to
   */
  //  replyToContext(context: Context): Promise<import("@grammyjs/types").Message.DocumentMessage | import("@grammyjs/types").Message.AudioMessage | import("@grammyjs/types").Message.PhotoMessage | import("@grammyjs/types").Message.VideoMessage | import("@grammyjs/types").Message.LocationMessage | import("@grammyjs/types").Message.InvoiceMessage | import("@grammyjs/types").Message.TextMessage>;
  handle = (context: Context) => {
    if (!context.message?.text) {
      return context.reply('Please enter a reminder');
    }
    return parseCommand(context.message.text);
  };
}

export function parseCommand(text: string): ReminderResult {
  text = text.replace('/remind', 'remind me').trim();
  const reminder = (parseReminder as typeof parseReminderFN)(text);
  return reminder;
}
