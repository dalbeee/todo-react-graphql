import React, { useEffect } from "react";
import PropTypes from "prop-types";

import Portal from "./Portal";

function Modal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  //   useEffect(() => {
  //     document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
  //     return () => {
  //       const scrollY = document.body.style.top;
  //       document.body.style.cssText = `position: ""; top: "";`;
  //       window.scrollTo(0, parseInt(scrollY || "0") * -1);
  //     };
  //   }, []);

  return (
    // <Portal elementId="modal-root">
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        visible={visible}
        maskClosable={maskClosable}
        onMaskClick={onMaskClick}
      >
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && (
            <button
              className="bg-blue-500 modal-close"
              value="close"
              onClick={close}
            />
          )}
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
    // </Portal>
  );
}

Modal.defaultProps = {
  visible: false,
  closable: true,
  maskClosable: true,
};

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = ({
  className,
  visible,
  maskClosable,
  onMaskClick,
  children,
}) => {
  return (
    <div
      className={` ${className} ${
        visible ? "block" : "hidden"
      } z-50 overflow-auto`}
      onClick={maskClosable ? onMaskClick : null}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

const ModalOverlay = ({ visible }) => {
  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } z-40 bg-opacity-60 bg-gray-800`}
    ></div>
  );
};

const ModalInner = ({ children, tabIndex, className }) => {
  return (
    <div
      className={`${className} relative shadow-xl w-96 top-1/2 transform -translate-x-1/2 m-auto px-10 py-5`}
    >
      {children}
    </div>
  );
};

export default Modal;
