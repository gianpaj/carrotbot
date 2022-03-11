import * as chrono from 'chrono-node';
// @ts-ignore
import Sherlock from 'sherlockjs';

const matcher = /^remind @?([^\s]+)(?: to )?([\s\S]*)$/;

const parser = new chrono.Chrono();
parser.refiners.push(require('./refiners/start-of-day'));

const options = {
  forwardDate: false,
  startOfDay: 9,
  // timezone: 'UTC',
};

const parseReminder = (input: string, from?: Date | chrono.ParsingReference): ReminderResult | null => {
  const match = input.match(matcher);
  if (!match) {
    // This doesn't look like a reminder, so bail early
    return null;
  }

  // Pull out the initial matches
  let [, who, what] = match;

  // Use chrono to extract the `when` from the `what`
  const when = parser.parse(what, from, options);
  // const date = parser.parseDate(from, options);
  var sherlocked = Sherlock.parse(what);

  if (when.length < 1) {
    // What kind of reminder doesn't have a date?
    return null;
  }

  // Remove any time expressions from the `what`
  when.forEach((w) => {
    what = what.replace(w.text, '');
  });

  // Clean up whitespace and common connecting words
  what = what.trim();
  what = what
    .replace(/^(to|that) /, '')
    .replace(/ on$/, '')
    .replace(/ on the$/, '');

  return { who, what, when: when[0].start.date() };
};

export default parseReminder;
