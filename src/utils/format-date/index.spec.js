import formatDate from "./index";

describe("formatDate", () => {
    test('test1', () => {
        const date = "2024-03-21T18:46:21.133Z"
    
        expect(formatDate(date)).toEqual('21 марта 2024 в 21:46');
      });
})