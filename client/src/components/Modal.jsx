import React from 'react';

const Modal = props => {

  if (props.modalContent) {
    return props.modalContent
  } else {
    return (
      <div id="modal-disabled"></div>
    )
  }
};

export default Modal;