import { nanoid } from "nanoid";
import { BlogPost } from "@/types/blog";

export const generateInitialPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];
  for (let i = 1; i <= 5; i++) {
    posts.push({
      id: nanoid(),
      title: `Blog 000${i}`,
      description: "Lorem ipsum dolor sit amet.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto odio facilis earum veritatis ipsum, repellendus delectus nemo ad blanditiis nesciunt temporibus quae iure aliquid soluta ipsam. Odio tempore rem adipisci!",
      public: i % 2 === 0,
    });
  }
  return posts;
};
