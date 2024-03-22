import commentsToTree from './index';

describe('commentsToTree', () => {
  test('test1', () => {
    const list = [
      {
        "_id": "65fc807d48a54759d5ca8cdc",
        "parent": {
            "_id": "65f8322cf3360f03347a6be8",
            "_type": "article"
        },
    },
    {
        "_id": "65fc80ad48a54759d5ca8cde",
        "parent": {
            "_id": "65fc807d48a54759d5ca8cdc",
            "_type": "comment"
        },
    }
    ]

    expect(commentsToTree(list)).toEqual([
      {
        _id: '65fc807d48a54759d5ca8cdc', 
        parent: {
          "_id": "65f8322cf3360f03347a6be8",
          "_type": "article"
      },
      children: [
          {
            _id: "65fc80ad48a54759d5ca8cde", 
            parent: {
              "_id": "65fc807d48a54759d5ca8cdc",
              "_type": "comment"
          }, 
            children: [

            ]
          },
        ]
      },
    ]);
  });

});
