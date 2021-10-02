import React from "react";
import Styles from '../UI/Styles.module.css';

import OverlayBackdrop from '../Modals/OverlayBackdrop';

function DeleteModal(props) {
  function submitHandler(e) {
    e.preventDefault();
    props.onDelete(props.id);
  }

  return <div className={`${Styles.modal} ${props.showModal ? Styles['show-modal'] : ''}`}>
    <div>
      <div className={`${Styles['modal-form']} ${Styles['modal-form__edit']}`}>
        <p>Are you sure you want to delete this task?</p>
        <form onSubmit={submitHandler}>
          <div className={Styles['new-task__footer']}>
            <div>
              <button onClick={props.onClose} className={Styles['new-task__button']} type="button">Cancel</button>
              <button className={Styles['new-task__button']}>Delete</button>
            </div>
          </div>
        </form>
      </div>
      <OverlayBackdrop onBackdropClick={props.onBackdrop} />
    </div>
  </div>
}

export default DeleteModal;