export const mockItems = [
  {
    _id: '67fee024de177582e52335bb',
    text: 'Первый коммент!',
    dateCreate: '2025-04-15T22:39:32.013Z',
    author: {
      profile: {
        name: 'User №1',
      },
      _id: '67fb67dc8702ec3fc67fe37f',
    },
    parent: {
      _id: '67fb67e98702ec3fc67fef7c',
      _type: 'article',
    },
    isDeleted: false,
  },

  {
    _id: '67fee064de177582e52335c2',
    text: 'Второй коммент! It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    dateCreate: '2025-04-15T22:40:36.407Z',
    author: {
      profile: {
        name: 'User №1',
      },
      _id: '67fb67dc8702ec3fc67fe37f',
    },
    parent: {
      _id: '67fb67e98702ec3fc67fef7c',
      _type: 'article',
    },
    isDeleted: false,
  },
  {
    _id: '67fee07ede177582e52335c5',
    text: 'Ответ на первый коммент! It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    dateCreate: '2025-04-15T22:41:02.889Z',
    author: {
      profile: {
        name: 'User №1',
      },
      _id: '67fb67dc8702ec3fc67fe37f',
    },
    parent: {
      _id: '67fee024de177582e52335bb',
      _type: 'comment',
    },
    isDeleted: false,
  },
  {
    _id: '67ff6be2de177582e52338d7',
    text: 'Ответ на первый ответ!',
    dateCreate: '2025-04-16T14:57:46.363Z',
    author: {
      profile: {
        name: 'User №44',
      },
      _id: '67fb67dc8702ec3fc67fe37f',
    },
    parent: {
      _id: '67fee07ede177582e52335c5',
      _type: 'comment',
    },
    isDeleted: false,
  },
  {
    _id: '67ff9540de177582e5233a59',
    text: 'Ответ на 2-й ответ! It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    dateCreate: '2025-04-16T17:12:33.175Z',
    author: {
      profile: {
        name: 'User №44',
      },
      _id: '67fb67dc8702ec3fc67fe37f',
    },
    parent: {
      _id: '67ff6be2de177582e52338d7',
      _type: 'comment',
    },
    isDeleted: false,
  },{
    _id: '67ff953dde177582e5233a57',
    text: 'Третий коммент!',
    dateCreate: '2025-04-16T14:50:00.599Z',
    author: {
      profile: {
        name: 'User №1',
      },
      _id: '67fb67dc8702ec3fc67fe37f',
    },
    parent: {
      _id: '67fb67e98702ec3fc67fef7c',
      _type: 'article',
    },
    isDeleted: false,
  },  
];
