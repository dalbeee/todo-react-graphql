import { posts } from "../../graphql/store/post";

const NewItem = () => {
  // useEffect(() => console.log(data), [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.inputbox.value;
    console.log("newitem", content);
    posts.postCreate(content);
    e.target.inputbox.value = "";
  };

  return (
    <div className="px-2 py-4 my-4 bg-gray-300 rounded-xl">
      <div className="flex items-center bg-gray-300 rounded-xl">
        <form action="" onSubmit={handleSubmit} className="w-full">
          <div className="flex justify-center px-2 ">
            <input
              name="inputbox"
              id=""
              className="block w-full px-4 mr-4 bg-gray-300 border-b-2 border-blue-700 "
            />
            <button className="inline-block px-2 py-2 font-semibold text-gray-300 bg-blue-500 rounded-xl">
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewItem;
