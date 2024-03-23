export const test = [
  {
    _id: "65fc807d48a54759d5ca8cdc",
    text: "Первый коммент!",
    dateCreate: "2024-03-21T18:46:21.133Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65f8321af3360f03347a5fe2",
    },
    parent: {
      _id: "65f8322cf3360f03347a6be8",
      _type: "article",
    },
    isDeleted: false,
  },
  {
    _id: "65fc80ad48a54759d5ca8cde",
    text: "Ответ 1!",
    dateCreate: "2024-03-21T18:47:09.855Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65f8321af3360f03347a5fe2",
    },
    parent: {
      _id: "65fc807d48a54759d5ca8cdc",
      _type: "comment",
    },
    isDeleted: false,
  },
  {
    _id: "65fc80ad48a5egegegeg",
    text: "Ответ 2",
    dateCreate: "2024-03-21T18:47:09.855Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65f8321af3360f03347a5fe2",
    },
    parent: {
      _id: "65fc807d48a54759d5ca8cdc",
      _type: "comment",
    },
    isDeleted: false,
  },
  {
    _id: "65fc80adegwegwegwee",
    text: "Ответ 3",
    dateCreate: "2024-03-21T18:47:09.855Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65f8321af3360f03347a5fe2",
    },
    parent: {
      _id: "65fc807d48a54759d5ca8cdc",
      _type: "comment",
    },
    isDeleted: false,
  },
  {
    _id: "65fc80ad48a54rgerherh759d5ca8cde",
    text: "Ответ 1 к ответу 1!",
    dateCreate: "2024-03-21T18:47:09.855Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65f8321af3360f03347a5fe2",
    },
    parent: {
      _id: "65fc80ad48a54759d5ca8cde",
      _type: "comment",
    },
    isDeleted: false,
  },
  {
    _id: "hrherherh",
    text: "Ответ 2 к ответу 1!",
    dateCreate: "2024-03-21T18:47:09.855Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65f8321af3360f03347a5fe2",
    },
    parent: {
      _id: "65fc80ad48a54759d5ca8cde",
      _type: "comment",
    },
    isDeleted: false,
  },
  {
    _id: "herherherherh",
    text: "Ответ 1 к ответу 3!",
    dateCreate: "2024-03-21T18:47:09.855Z",
    author: {
      profile: {
        name: "User №1",
      },
      _id: "65f8321af3360f03347a5fe2",
    },
    parent: {
      _id: "65fc80adegwegwegwee",
      _type: "comment",
    },
    isDeleted: false,
  },
];
