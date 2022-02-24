import { ParsingOption } from 'chrono-node';
import { ParsingResult } from 'chrono-node/dist/results';

interface ParsingResultWithStartOfDay extends ParsingResult {
  tags: {
    StartOfWorkDayRefiner: true;
  };
}

interface ParsingOptionWithStartOfDay extends ParsingOption {
  startOfDay: number;
}

module.exports = {
  refine(text: string, results: ParsingResultWithStartOfDay[], opt?: ParsingOptionWithStartOfDay) {
    if (opt?.startOfDay) {
      results.forEach((result) => {
        if (!result.start.isCertain('hour')) {
          result.start.imply('hour', opt.startOfDay);
          result.tags['StartOfWorkDayRefiner'] = true;
        }
      });
    }

    return results;
  },
};
