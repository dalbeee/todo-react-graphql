import { useEffect, useRef, useState } from "react";
import { IPost } from "../..";
import { posts } from "../../graphql/store/post";
import Modal from "../Modal";

const Card = ({ post }: { post: IPost }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const indicateInputBox = useRef<HTMLInputElement>(null);

  useEffect(() => setContent(post.content), [post]);

  const handleCheckBoxToggle = (e) => {
    posts.postUpdate(post.id, {
      ...post,
      finished: post.finished === "finish" ? "start" : "finish",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditMode((prev) => !prev);

    posts.postUpdate(post.id, {
      ...post,
      content,
    });
    setContent("");
  };

  const handleDelete = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDeleteConfirm = () => {
    setIsModalOpen((prev) => !prev);
    posts.postDelete(post.id);
  };

  return (
    <>
      <Modal
        title="정말 삭제할까요?"
        visible={isModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsModalOpen((prev) => !prev)}
      />

      <div className="mb-4 bg-gray-300 box-primary">
        <div className="flex items-center justify-between bg-gray-300 rounded-xl">
          <div className="flex items-center w-full">
            <input
              type="checkbox"
              name="check"
              checked={post.finished === "finish" ? true : false}
              onChange={handleCheckBoxToggle}
              id=""
              className="w-5 h-5 mr-4 "
            />
            <div className="w-full pr-4">
              <div
                className={`font-semibold text-gray-700 ${
                  isEditMode ? "hidden" : "block"
                }`}
              >
                {post.content}
              </div>
              <form action="" className="w-full" onSubmit={handleUpdate}>
                <input
                  ref={indicateInputBox}
                  className={`w-full font-semibold text-gray-700 bg-gray-300 border-blue-500 border-b-2 ${
                    isEditMode ? "block" : "hidden"
                  } `}
                  value={content}
                  name="inputBox"
                  onChange={(e) => setContent(e.target.value)}
                ></input>
              </form>
            </div>
          </div>
          <div className="flex">
            <button
              className={`px-2 py-2 mr-4 bg-blue-500 rounded-xl ${
                isEditMode ? "hidden" : "block"
              }`}
              onClick={() => {
                setIsEditMode((prev) => !prev);
                setTimeout(() => indicateInputBox.current.focus(), 100);
              }}
            >
              edit
            </button>
            <button
              className={`px-2 py-2 mr-4 bg-green-500 rounded-xl ${
                isEditMode ? "block" : "hidden"
              }`}
              onClick={handleUpdate}
            >
              OK
            </button>
            <button
              className="px-2 py-2 bg-red-300 rounded-xl "
              onClick={handleDelete}
            >
              del
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
