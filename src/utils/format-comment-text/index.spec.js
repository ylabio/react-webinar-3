import formatCommentText from './index';

describe('formatCommentText', () => {
  test('test1', () => {
    const text = '';
    expect(formatCommentText(text)).toEqual(null);
  });
  test('test2', () => {
    const text = '     ';
    expect(formatCommentText(text)).toEqual(null);
  });

  test('test3', () => {
    const text = '1       2';
    expect(formatCommentText(text)).toEqual('1 2');
  });

  test('test4', () => {
    const text = '1        2         3';
    expect(formatCommentText(text)).toEqual('1 2 3');
  });

  test('test5', () => {
    const text = '123451234512345';
    expect(formatCommentText(text, 5)).toEqual('12345 12345 12345');
  });
  test('test6', () => {
    const text = '123451234512345123';
    expect(formatCommentText(text, 5)).toEqual('12345 12345 12345 123');
  });
});
