import { parseCommand } from '.';

const REFERENCE_DATE = new Date(2021, 6, 5, 4, 3, 2, 0);

describe('Reminder tests', () => {
  it('should parse 1st of Jan', () => {
    expect(parseCommand('remind me on 1st of Jan to call the doctor', REFERENCE_DATE)).toEqual({
      what: 'call the doctor',
      when: new Date('2022-01-01T10:00:00.000Z'),
      who: 'me',
    });
    expect(parseCommand('remind me to call the doctor on the 1st of Jan', REFERENCE_DATE)).toEqual({
      what: 'call the doctor',
      when: new Date('2022-01-01T10:00:00.000Z'),
      who: 'me',
    });
  });
});
