import { UserImage, UserImageTwo } from "./UI-Components/Images";

export const COMMENTS = [
  {
    id: "1",
    author: "John Doe",
    content: "Great video! Really helpful content.",
    timestamp: new Date(Date.now() - 3600000),
    likes: 5,
    avatar: UserImage,
    dislikes: 0,
    replies: [],
  },
  {
    id: "2",
    author: "Jane Smith",
    avatar: UserImageTwo,
    content:
      "The quality selector feature is amazing. Works perfectly with different network conditions.",
    timestamp: new Date(Date.now() - 7200000),
    likes: 3,
    dislikes: 1,
  },
];
