declare function parseReminderFN(reminder: string): ReminderResult;
declare interface ReminderResult {
  who: string;
  what: string;
  when: Date;
}
