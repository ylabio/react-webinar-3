import dataFormate from ".";

describe('listToTree', () => {
  test('форматирует дату с апрелем (проверка падежа)', () => {
    const dataStr = '2025-04-15T22:39:32.013Z';
    expect(dataFormate(dataStr)).toEqual('16 апреля 2025 в 02:39');
  });
  test('форматирует дату с августом (проверка падежа)', () => {
    const dataStr = '2025-08-17T01:07:32.013Z';
    expect(dataFormate(dataStr)).toEqual('17 августа 2025 в 05:07');
  });
  test('корректно работает с 1-м числом (проверка дня)', () => {
    const dataStr = '2025-11-01T00:00:00.000Z';
    expect(dataFormate(dataStr)).toEqual('1 ноября 2025 в 04:00');
  });

  test('корректно работает с февралём (проверка короткого месяца)', () => {
    const dataStr = '2025-02-28T23:59:59.999Z';
    expect(dataFormate(dataStr)).toEqual('1 марта 2025 в 03:59');
  });

  test('корректно работает с полночью (проверка времени)', () => {
    const dataStr = '2025-12-31T00:00:00.000Z';
    expect(dataFormate(dataStr)).toEqual('31 декабря 2025 в 04:00');
  });

  test('корректно работает с полуднем (проверка времени)', () => {
    const dataStr = '2025-06-15T12:00:00.000Z';
    expect(dataFormate(dataStr)).toEqual('15 июня 2025 в 16:00');
  });
});