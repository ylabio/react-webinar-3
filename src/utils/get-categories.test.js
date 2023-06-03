import { getCategories } from './get-categories';

const mockData_1 = [];

const mockData_2 = [
  {
    "_id": "1",
    "title": "parent",
    "parent": null
  },
  {
    "_id": "2",
    "title": "child 1",
    "parent": {
      "_id": "1"
    }
  },
  {
    "_id": "3",
    "title": "child 2",
    "parent": {
      "_id": "1"
    }
  },
];

const mockData_3 = [
  {
    "_id": "1",
    "title": "Электроника",
    "parent": null
  },
  {
    "_id": "2",
    "title": "Телефоны",
    "parent": {
      "_id": "1"
    }
  },
  {
    "_id": "3",
    "title": "Ноутбуки",
    "parent": {
      "_id": "1"
    }
  },
  {
    "_id": "4",
    "title": "Книги",
    "parent": null
  },
  {
    "_id": "5",
    "title": "Учебники",
    "parent": {
      "_id": "4"
    }
  },
  {
    "_id": "6",
    "title": "Художественная",
    "parent": {
      "_id": "4"
    }
  },
  {
    "_id": "7",
    "title": "Смартфоны",
    "parent": {
      "_id": "2"
    }
  },
  {
    "_id": "8",
    "title": "Аксессуары",
    "parent": {
      "_id": "2"
    }
  }
];

describe('getCategories module', () => {
  test('result to equal empty array', () => {
    expect(getCategories(mockData_1))
      .toEqual([]);
  });
  
  test('result to equal 1 parent and 2 children', () => {
    expect(getCategories(mockData_2))
      .toEqual([
        { value: '1', title: 'parent' },
        { value: '2', title: '- child 1' },
        { value: '3', title: '- child 2' }
      ]);
  });
  
  test('result to equal 2 roots and 2 levels', () => {
    expect(getCategories(mockData_3))
      .toEqual([
        { value: '1', title: 'Электроника' },
        { value: '2', title: '- Телефоны' },
        { value: '7', title: '- - Смартфоны' },
        { value: '8', title: '- - Аксессуары' },
        { value: '3', title: '- Ноутбуки' },
        { value: '4', title: 'Книги' },
        { value: '5', title: '- Учебники' },
        { value: '6', title: '- Художественная' },
      ]);
  });
})
