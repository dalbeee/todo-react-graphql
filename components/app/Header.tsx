const Header = () => {
  return (
    <div className="flex justify-center px-2 py-2 bg-blue-100 shadow-xl rounded-xl">
      <div className="w-full px-4 py-2">
        <div className="flex justify-center text-4xl font-bold text-gray-700">
          TODO
        </div>
        <div className="flex justify-end w-full text-sm text-gray-700">
          with React+graphQL
        </div>
      </div>
    </div>
  );
};

export default Header;
