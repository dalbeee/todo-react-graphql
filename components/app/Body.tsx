import Card from "./Card";

import { useReactiveVar } from "@apollo/client";

import { IPost } from "../..";
import { posts } from "../../graphql/store/post";

const Body: React.FC<any> = (): any => {
  if (typeof window === "undefined") return null;

  const data = useReactiveVar(posts.data);

  if (!data) return null;

  return (
    <div>
      {data.map((d: IPost, index) => {
        return <Card post={d} key={d.id} />;
      })}
    </div>
  );
};

export default Body;
