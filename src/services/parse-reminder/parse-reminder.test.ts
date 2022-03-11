process.env.TZ = 'UTC';

import parseReminder from '.';

// All time expressions will be relative to Wednesday, July 5 at 4:03:02.0 UTC
const REFERENCE_DATE = new Date(Date.UTC(2021, 6, 5, 4, 3, 2, 0));

describe('parse-reminder', () => {
  const examples: Record<string, ReminderResult | null> = {
    'nothing to see here': null,

    'remind me nope': null,

    'remind me to call the doctor tomorrow': {
      who: 'me',
      when: new Date(Date.UTC(2021, 6, 6, 4, 3, 2)),
      what: 'call the doctor',
    },

    'remind me to send invites at 3pm tomorrow': {
      who: 'me',
      when: new Date(Date.UTC(2021, 6, 6, 15, 0, 0)),
      what: 'send invites',
    },

    'remind me 8/28 to wish Jamie happy birthday': {
      who: 'me',
      when: new Date('2021-08-28T10:00:00.000Z'),
      what: 'wish Jamie happy birthday',
    },

    'remind me to wish Jamie happy birthday on 8/28': {
      who: 'me',
      when: new Date('2021-08-28T10:00:00.000Z'),
      what: 'wish Jamie happy birthday',
    },

    // 'remind me in 10 minutes to change the laundry': {
    //   who: 'me',
    //   when: new Date('2021-07-05T04:13:00.000Z'),
    //   what: 'change the laundry',
    // },

    // 'remind me tomorrow 10 PM to eat': {
    //   who: 'me',
    //   when: new Date('2021-07-06T22:00:00.000Z'),
    //   what: 'eat',
    // },

    'remind me on 18 Feb to be alive': {
      who: 'me',
      when: new Date('2022-02-18T10:00:00.000Z'),
      what: 'be alive',
    },

    'remind me Tuesday to watch pogo': {
      who: 'me',
      when: new Date('2021-07-06T10:00:00.000Z'),
      what: 'watch pogo',
    },

    'remind me Tuesday': {
      who: 'me',
      when: new Date('2021-07-06T10:00:00.000Z'),
      what: '',
    },

    // 'remind me to go to the dentist on Aug 4 at 3': {
    //   // FIXME: add refiner to prefer work hours for times without am/pm
    //   who: 'me',
    //   when: new Date('2021-08-04T15:00:00.000Z'),
    //   what: 'go to the dentist',
    // },

    // 'remind me to followup with Kathy in 2 weeks': {
    //   who: 'me',
    //   when: new Date('2022-07-05T10:00:00.000Z'),
    //   what: 'followup with Kathy',
    // },

    // 'remind me in 2 weeks to followup with Kathy': {
    //   who: 'me',
    //   when: new Date(2017, 6, 19, 9, 0, 0, 0),
    //   what: 'followup with Kathy',
    // },

    // 'remind me at 4:00 to check in with Dan': {
    //   // FIXME: fix future refiner to work with times later in the day
    //   who: 'me',
    //   when: new Date('2021-07-05T04:00:00.000Z'),
    //   what: 'check in with Dan',
    // },

    'remind me 10am to go to work': {
      // FIXME: fix future refiner to work with times later in the day
      who: 'me',
      when: new Date('2021-07-05T10:00:00.000Z'),
      what: 'go to work',
    },

    'remind me that the oil needs changed on Oct 4': {
      who: 'me',
      when: new Date(2017, 9, 4, 9, 0, 0, 0),
      what: 'the oil needs changed',
    },

    'remind me next Friday to open the pod bay doors': {
      who: 'me',
      when: new Date(2017, 6, 14, 9, 0, 0, 0),
      what: 'open the pod bay doors',
    },

    'remind me tomorrow at noon to buy the new iPhone': {
      who: 'me',
      when: new Date(2017, 6, 6, 12, 0, 0, 0),
      what: 'buy the new iPhone',
    },

    'remind someone to have coffee tomorrow at noon': {
      who: 'someone',
      when: new Date(2017, 6, 6, 12, 0, 0, 0),
      what: 'have coffee',
    },

    'remind @meaku to have coffee tomorrow at noon': {
      who: 'meaku',
      when: new Date(2017, 6, 6, 12, 0, 0, 0),
      what: 'have coffee',
    },

    'remind @probot/everyone to have coffee tomorrow at noon': {
      who: 'probot/everyone',
      when: new Date(2017, 6, 6, 12, 0, 0, 0),
      what: 'have coffee',
    },

    'remind @probot/everyone to have coffee \nwith \nfriends tomorrow at noon': {
      who: 'probot/everyone',
      when: new Date(2017, 6, 6, 12, 0, 0, 0),
      what: 'have coffee \nwith \nfriends',
    },
  };

  // eslint-disable-next-line guard-for-in
  for (const example in examples) {
    it(`parses "${example}"`, () => {
      expect(parseReminder(example, REFERENCE_DATE)).toEqual(examples[example]);
    });
  }
});
