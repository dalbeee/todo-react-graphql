import { ApolloClient, InMemoryCache } from "@apollo/client";

import { posts } from "./store/post";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        postsGet: {
          read: () => posts.data(),
        },
      },
    },

    // Mutation: {
    //   fields: {
    //     postCreate: (_, arg) => {
    //       console.log(arg);
    //       const item = { ...postTemplate, content: arg };
    //       console.log(item);

    //       Array.prototype.concat.call(posts, item);
    //       return item;
    //     },
    //   },
    // },
  },
});

const client = new ApolloClient({ cache });

export default client;
