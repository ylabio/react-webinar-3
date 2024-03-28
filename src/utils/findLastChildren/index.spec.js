import findLastChildren from "./index";

describe("findLastChildren", () => {
  test("test1", () => {
    const list = [
      {
        _id: "65f8321af3360f03347a5fe6",
        children: [
          {
            _id: "6602d7b006b1a85d442fc1a2",
            children: [{ _id: "6602dd4106b1a85d442fc313", children: [] }],
          },
        ],
      },
      {
        _id: "6602d7a706b1a85d442fc19e",
        children: [],
      },
      {
        _id: "6602d7b406b1a85d442fc1a4",
        children: [],
      },
    ];
    expect(findLastChildren(list)).toEqual("6602d7b406b1a85d442fc1a4");
  });
  test("test2", () => {
    const list = [
      {
        _id: "65f8321af3360f03347a5fe6",
        children: [
          {
            _id: "6602d7b006b1a85d442fc1a2",
            children: [
              {
                _id: "6602dd4106b1a85d442fc313",
                children: [
                  {
                    _id: "6602d7a706b1a85d442fc19e",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    expect(findLastChildren(list)).toEqual("6602d7a706b1a85d442fc19e");
  });
  test("test3", () => {
    const list = [
      {
        _id: "65f8321af3360f03347a5fe6",
        children: [],
      },
    ];
    expect(findLastChildren(list)).toEqual("65f8321af3360f03347a5fe6");
  });
});
