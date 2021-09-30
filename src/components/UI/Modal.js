import React, { useState, useEffect } from 'react';
import Styles from './Styles.module.css';

function Modal(props) {
  let [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    setFormData({
      id: props.id,
      title: props.title || '',
      description: props.description || '',
      date: props.date || ''
    })
  }, [props.id, props.title, props.description, props.date])

  function titleHandler(e) {    
    setFormData((prevData) => {
      return {
        ...prevData,
        title: e.target.value
      }
    })
  }
  function descriptionHandler(e) {    
    setFormData((prevData) => {
      return {
        ...prevData,
        description: e.target.value
      }
    })
  }

  function dateHandler(e) {    
    setFormData((prevData) => {
      return {
        ...prevData,
        date: e.target.value
      }
    })
  }

  function submitHandler(e) {
    e.preventDefault();
    props.onSubmit(formData)
  }

  return <React.Fragment>
    <div className={`${Styles.modal} ${props.showModal && Styles['show-modal']}`}>
      <div>
        <div className={Styles['modal-form']}>
          <h1>Edit</h1>
          <hr/>
          <br/>
          <form onSubmit={submitHandler}>
            <input onChange={titleHandler} value={formData.title} className={Styles['new-task__text-input']} type="text" placeholder="Title" autoFocus />
            <input onChange={descriptionHandler} value={formData.description} className={Styles['new-task__text-input']} type="text" placeholder="Description" />
            <div className={Styles['new-task__footer']}>
              <div>
                <input onChange={dateHandler} value={formData.date} className={Styles['new-task__date-input']} min="2021-05-24" type="date" />
              </div>
              <div>
                <button onClick={props.onClose} className={Styles['new-task__button']}>Cancel</button>
                <button className={Styles['new-task__button']}>Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={Styles['modal-overlay']} onClick={props.onBackdrop}></div>
    </div>
  </React.Fragment>
}

export default Modal;