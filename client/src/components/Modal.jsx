import React from 'react';

const Modal = props => {
  if (props.modalContent) {
    return (
      <div id="modal-aura">
        {props.modalContent}
      </div>
    );
  } else {
    return (
      <div id="modal-disabled"></div>
    )
  }
};

export default Modal;