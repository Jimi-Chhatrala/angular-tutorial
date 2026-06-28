import { ShortNameMakerPipe } from './short-name-maker-pipe';

describe('ShortNameMakerPipe', () => {
  let pipe: ShortNameMakerPipe;

  beforeEach(() => {
    pipe = new ShortNameMakerPipe();
  });

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('formats a full name to first name and last initial', () => {
    expect(pipe.transform('john doe royal')).toBe('John R.');
  });

  it('trims extra whitespace before formatting', () => {
    expect(pipe.transform('  jane   smith  brown  ')).toBe('Jane B.');
  });
});
