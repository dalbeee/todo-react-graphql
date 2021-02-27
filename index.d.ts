export interface IPost {
  id: number;
  content: string;
  finished: "start" | "stop" | "finish";
  created_At: number;
}
