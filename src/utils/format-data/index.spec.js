import formatDate from "./index.js";

describe('utils/format-data', () => {

  test('equal format', () => {
    expect(formatDate('2024-03-21T18:46:21.133Z')).toEqual('21 марта 2024 в 21:46');
  });

});

