import { makeVar, ReactiveVar } from "@apollo/client";
import { IPost } from "../..";
import cloneDeep from "lodash.clonedeep";

class Posts {
  index: number;
  data: ReactiveVar<IPost[]>;

  constructor(data = [] as IPost[]) {
    let loadResult = this.loadFromLocalStorage();

    this.data = makeVar(loadResult);
    this.index = data.length;
  }

  private get getNextItem(): IPost {
    return {
      id: this.index++,
      content: "",
      finished: "start",
      created_At: Date.now(),
    };
  }

  get() {
    return this.data;
  }

  syncToLocalStorage = (data: IPost[]) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("posts", JSON.stringify(data));
  };

  loadFromLocalStorage = () => {
    if (typeof window === "undefined") return;

    let loadFromLocalStorageData = localStorage.getItem("posts");
    if (!loadFromLocalStorageData) loadFromLocalStorageData;
    const result = JSON.parse(loadFromLocalStorageData) as IPost[];
    return result;
  };

  // post create method
  postCreate = (content) => {
    if (!content) return;
    const result = [...posts.data(), { ...posts.getNextItem, content }];
    this.syncToLocalStorage(result);
    posts.data(result);
  };

  // post update method
  postUpdate = (id, post: IPost) => {
    const getPosts = posts.data();
    const postIndex = getPosts.findIndex((i) => i.id === id);

    // slice array
    //   const f = getPosts.slice(0, postIndex);
    //   const g = getPosts.slice(postIndex + 1);
    //   posts([...f, updatedPost, ...g]);

    // use clonedeep
    getPosts[postIndex] = post;
    const result = cloneDeep(getPosts);
    this.syncToLocalStorage(result);

    posts.data(result);
  };

  // post delete method
  postDelete = (id) => {
    const getPosts = posts.data().filter((item) => item.id !== id);
    posts.data(getPosts);
  };
}

export const posts = new Posts();

///////// end store