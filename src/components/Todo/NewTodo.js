import Styles from '../UI/Styles.module.css';
import {useState} from 'react';

function NewTask(props) {

  function currentDate() {
    const DATE = new Date();
    let dd, mm, yyyy;
    dd = DATE.getDate();
    mm = DATE.getMonth();
    yyyy = DATE.getFullYear();
    return `${yyyy}-${String(mm).padStart(2,0)}-${String(dd).padStart(2,0)}`;
  }

  let [formData, setFormData] = useState({
    title: '',
    description: '',
    date: currentDate(),
    id: Math.floor(Math.random() * 100),
    completed: false
  })

  function cancelHandler() {
    return props.onCancel(false);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (formData.title.trim().length > 0) {
      props.onAddTask(formData);
      setFormData({
        title: '',
        description: '',
        date: currentDate(),
        id: Math.floor(Math.random() * 1000),
        done: false
      })
    }
    return false;
  }

  function titleHandler(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        title: e.target.value
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

  function descriptionHandler(e) {
    setFormData((prevData) => {
      return {
        ...prevData,
        description: e.target.value
      }
    })
  }

  function preventFormSubmit(e) {    
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  return (
    <form onSubmit={submitHandler} className={`${Styles.card} ${Styles['new-task']}`} onKeyDown={preventFormSubmit}>
      <div>
        <input type="checkbox" disabled />
      </div>
      <div>
        <input value={formData.title} onChange={titleHandler} className={Styles['new-task__text-input']} type="text" placeholder="Title" autoFocus />
        <input value={formData.description} onChange={descriptionHandler} className={Styles['new-task__text-input']} type="text" placeholder="Description" />
        <hr />
        <div className={Styles['new-task__footer']}>
          <div>
            <input value={formData.date} onChange={dateHandler} className={Styles['new-task__date-input']} min="2021-05-24" type="date" />
          </div>
          <div>
            <button onClick={cancelHandler} className={Styles['new-task__button']} type="button">Cancel</button>
            <button className={Styles['new-task__button']}>Done</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewTask;