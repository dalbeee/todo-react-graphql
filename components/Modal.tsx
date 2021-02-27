import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function ClientOnlyPortal({ children, selector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}

const Modal = ({ title, visible, onConfirm, onCancel, children }) => {
  // console.log(isShow, visible);

  // const handleConfirm = () => {
  //   setIsShow((prev) => !prev);
  // };
  // const handleCancel = () => setIsShow((prev) => !prev);

  return (
    <ClientOnlyPortal selector="#root-modal">
      <div
        className={`absolute inset-0 z-0 transform ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Overlay visible={visible} />
        <Wrapper visible={visible}>
          <p className="flex justify-center pb-6 text-xl font-semibold text-gray-700">
            {title}
          </p>
          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              className="px-4 py-2 mr-4 font-semibold text-gray-200 bg-red-500 shadow-xl rounded-xl"
            >
              confirm
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 font-semibold text-gray-200 bg-blue-500 shadow-xl rounded-xl "
            >
              cancel
            </button>
          </div>
        </Wrapper>
      </div>
    </ClientOnlyPortal>
  );
};

const Overlay = ({ visible }) => {
  return (
    <div
      className={`z-45 fixed w-full h-full bg-gray-700 opacity-70 ${
        visible ? "block" : "hidden "
      }`}
    ></div>
  );
};

const Wrapper = ({ visible, children }) => {
  return (
    <div
      className={`z-50 absolute w-2/5 py-6  bg-gray-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl min-w-1/2 ${
        visible ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
};

Modal.defaultProps = {
  title: "title",
  children: "",
  visible: false,
};

export default Modal;
