import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import actions from '../actions';

const Modal = () => {
  const dispatch = useAppDispatch();
  
  const modalContent = useAppSelector(state => state.modalContent);

  if (modalContent) {
    return (
      <div id="modal-aura">
        <button type="button" id="close-modal-button" onClick={dispatch.bind(null, actions.doChangeModalContent(null))}>
          X
        </button>
        {modalContent}
      </div>
    );
  }
  
  return (
    <div id="modal-disabled" />
  );
};

export default Modal;
