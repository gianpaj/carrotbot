declare function parseReminderFN(reminder: string): ReminderResult;
interface ReminderResult {
  who: string;
  what: string;
  when: Date;
}
