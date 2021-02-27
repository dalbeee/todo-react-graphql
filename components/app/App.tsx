import Body from "./Body";
import Header from "./Header";
import NewItem from "./NewItem";

const App = () => {
  return (
    <>
      <div className="flex justify-center min-h-screen py-4 ">
        <div className="w-4/5 md:w-3/5 lg:w-2/5">
          <Header />
          <NewItem />
          <Body />
        </div>
      </div>
    </>
  );
};

export default App;
