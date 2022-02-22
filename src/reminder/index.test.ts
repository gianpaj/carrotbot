import { parseCommand } from '.';

describe('Reminder tests', () => {
  it('should parse tomorrow', () => {
    expect(parseCommand('remind me on 1st of Jan to call the doctor')).toEqual({
      what: 'call the doctor',
      when: new Date('2023-01-01T08:00:00.000Z'),
      who: 'me',
    });
  });
});
