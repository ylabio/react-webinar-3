import addCommentToTree from './index';

describe('addCommentToTree', () => {
  test('test1', () => {
    const comments = [
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
    ];

    const newComment = {
      "_id": "6805dd227e843dad8961109e",
      "text": "1",
      "dateCreate": "2025-04-21T05:52:34.839Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "67fb67eb8702ec3fc67ff18d",
        "_type": "article"
      },
      "isDeleted": false
    };

    const parent = {
      _id: comments[0]._id,
      _type: 'article'
    };

    expect(addCommentToTree(comments, newComment, parent)).toEqual([
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
      {
        "_id": "6805dd227e843dad8961109e",
        "text": "1",
        "dateCreate": "2025-04-21T05:52:34.839Z",
        "author": {
          "profile": {
            "name": "User №1"
          },
          "_id": "67fb67dc8702ec3fc67fe37f"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
    ]);
  }); //test1

  test('test2', () => {
    const comments = [
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
    ];

    const newComment = {
      "_id": "6805dd227e843dad8961109e",
      "text": "1",
      "dateCreate": "2025-04-21T05:52:34.839Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "680563767e843dad896109b4",
        "_type": "comment"
      },
      "isDeleted": false
    };
    // Добавляем ответ на первый комментарий
    const parent = {
      _id: comments[0]._id,
      _type: 'comment'
    };

    expect(addCommentToTree(comments, newComment, parent)).toEqual([
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        children: [
          {
            "_id": "6805dd227e843dad8961109e",
            "text": "1",
            "dateCreate": "2025-04-21T05:52:34.839Z",
            "author": {
              "profile": {
                "name": "User №1"
              },
              "_id": "67fb67dc8702ec3fc67fe37f"
            },
            "parent": {
              "_id": "680563767e843dad896109b4",
              "_type": "comment"
            },
            "isDeleted": false
          },
        ],
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
    ]);
  }); //test2

  test('test3', () => {
    const comments = [
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        children: [
          {
            "_id": "6805dd227e843dad8961109e",
            "text": "1",
            "dateCreate": "2025-04-21T05:52:34.839Z",
            "author": {
              "profile": {
                "name": "User №1"
              },
              "_id": "67fb67dc8702ec3fc67fe37f"
            },
            "parent": {
              "_id": "680563767e843dad896109b4",
              "_type": "comment"
            },
            "isDeleted": false
          },
        ],
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
    ];

    const newComment = {
      "_id": "6808aee37e843dad89615ed3",
      "text": "1",
      "dateCreate": "2025-04-21T05:52:34.839Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6805dd227e843dad8961109e",
        "_type": "comment"
      },
      "isDeleted": false
    };
    // Добавляем ответ на ответ первого комментария
    const parent = {
      _id: '6805dd227e843dad8961109e',
      _type: 'comment'
    };

    expect(addCommentToTree(comments, newComment, parent)).toEqual([
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        children: [
          {
            "_id": "6805dd227e843dad8961109e",
            "text": "1",
            "dateCreate": "2025-04-21T05:52:34.839Z",
            "author": {
              "profile": {
                "name": "User №1"
              },
              "_id": "67fb67dc8702ec3fc67fe37f"
            },
            children: [
              {
                "_id": "6808aee37e843dad89615ed3",
                "text": "1",
                "dateCreate": "2025-04-21T05:52:34.839Z",
                "author": {
                  "profile": {
                    "name": "User №1"
                  },
                  "_id": "67fb67dc8702ec3fc67fe37f"
                },
                "parent": {
                  "_id": "6805dd227e843dad8961109e",
                  "_type": "comment"
                },
                "isDeleted": false
              }
            ],
            "parent": {
              "_id": "680563767e843dad896109b4",
              "_type": "comment"
            },
            "isDeleted": false
          },
        ],
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
    ]);
  }); //test3

  test('test4', () => {
    const comments = [
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        children: [
          {
            "_id": "6805dd227e843dad8961109e",
            "text": "1",
            "dateCreate": "2025-04-21T05:52:34.839Z",
            "author": {
              "profile": {
                "name": "User №1"
              },
              "_id": "67fb67dc8702ec3fc67fe37f"
            },
            "parent": {
              "_id": "680563767e843dad896109b4",
              "_type": "comment"
            },
            "isDeleted": false
          },
        ],
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
    ];

    const newComment = {
      "_id": "6808aee37e843dad89615ed3",
      "text": "1",
      "dateCreate": "2025-04-21T05:52:34.839Z",
      "author": {
        "profile": {
          "name": "User №1"
        },
        "_id": "67fb67dc8702ec3fc67fe37f"
      },
      "parent": {
        "_id": "6805dd227e843dad8961109e",
        "_type": "comment"
      },
      "isDeleted": false
    };
    // Добавляем ответ на несуществующий ответ
    const parent = {
      _id: '111',
      _type: 'comment'
    };

    expect(addCommentToTree(comments, newComment, parent)).toEqual([
      {
        "_id": "680563767e843dad896109b4",
        "text": "Есть два способа создания дизайна программы. Один из них, это сделать его настолько простым, что в нем, очевидно, не будет недостатков. Другой способ — сделать его настолько запутанным, что в нем не будет очевидных недостатков.\n— C.A. R. Hoare",
        "dateCreate": "2025-04-20T21:13:26.022Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        children: [
          {
            "_id": "6805dd227e843dad8961109e",
            "text": "1",
            "dateCreate": "2025-04-21T05:52:34.839Z",
            "author": {
              "profile": {
                "name": "User №1"
              },
              "_id": "67fb67dc8702ec3fc67fe37f"
            },
            "parent": {
              "_id": "680563767e843dad896109b4",
              "_type": "comment"
            },
            "isDeleted": false
          },
        ],
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "680565447e843dad896109c0",
        "text": "Большинство хороших программистов делают свою работу не потому, что ожидают оплаты или признания, а потому что получают удовольствие от программирования.\n— Linus Torvalds",
        "dateCreate": "2025-04-20T21:21:08.480Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "67fb67eb8702ec3fc67ff18d",
          "_type": "article"
        },
        "isDeleted": false
      },
      {
        "_id": "6805658b7e843dad896109c4",
        "text": "Итерация свойственна человеку, рекурсия божественна.\n— L. Peter Deutsch",
        "dateCreate": "2025-04-20T21:22:19.521Z",
        "author": {
          "profile": {
            "name": "User №77"
          },
          "_id": "67fb67dd8702ec3fc67fe3cb"
        },
        "parent": {
          "_id": "680563767e843dad896109b4",
          "_type": "comment"
        },
        "isDeleted": false
      },
    ]);
  }); //test4
});
