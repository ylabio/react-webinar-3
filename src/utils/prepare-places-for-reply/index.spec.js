import findParentInTree from './index.js';

describe('findParentInTree', () => {
  test('test1', () => {
    const tree = [{
        _id: 1,
        children: [
            {
                _id: 2,
                children: [
                    {
                        _id: 5,
                        children: []
                    },
                    {
                        _id: 6,
                        children: []
                    }
                ]
            },
            {
                _id: 3,
                children: [
                    {
                        _id: 7,
                        children: []
                    },
                    {
                        _id: 8,
                        children: []
                    }
                ]
            },
            {
                _id: 4,
                children: [
                    {
                        _id: 9,
                        children: []
                    },
                    {
                        _id: 10,
                        children: [
                            {
                                _id: 12,
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    }];

    expect(findParentInTree(tree)).toEqual({
        '1': 4,
        '2': 6,
        '3': 8,
        '4': 10,
        '10': 12,
    });
  });
});