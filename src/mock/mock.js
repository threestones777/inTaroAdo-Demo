import Mock from "mockjs";

Mock.mock("/api/users", "get", {
  "users|7": [
    {
      "id|+1": 1,
      name: "@cname",
      avatar: '@image("100x100")',
      email: "@email",
    },
  ],
});

Mock.mock("/api/posts", "get", {
  "posts|10": [
    {
      "id|+1": 1,
      title: "@ctitle",
      content: "@cparagraph",
      createdAt: "@datetime",
    },
  ],
});
