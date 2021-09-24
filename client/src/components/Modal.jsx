import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from './../actions';


const Modal = props => {
  const dispatch = useDispatch();
  
  const modalContent = useSelector(state => state.modalContent);

  if (modalContent) {
    return (
      <div id="modal-aura">
        <button id="close-modal-button" onClick={dispatch.bind(null, actions.doChangeModalContent(null))}>X</button>
        {modalContent}
      </div>
    );
  } else {
    return (
      <div id="modal-disabled"></div>
    )
  }
};

export default Modal;