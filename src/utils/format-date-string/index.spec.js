import {formatDateString} from "./index";

const inputDate = "2023-06-08T11:49:36.330Z";

describe('format-date-string test', function () {
  test('ru locale', () => {
    const localeRu = 'ru-RU';
    const formattedDateRu = formatDateString(inputDate, localeRu);
    expect(formattedDateRu).toBe('8 июня 2023 г. в 14:49');
  })
  test('en locale', () => {
    const localeEn = 'en-US';
    const formattedDateEn = formatDateString(inputDate, localeEn);
    expect(formattedDateEn).toBe(' 8, 2023 at 2:49 PM')
  })
});