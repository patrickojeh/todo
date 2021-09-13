import Styles from '../UI/Styles.module.css';
import {useState} from 'react';

function NewTask(props) {

  function currentDate() {
    const DATE = new Date();
    let dd, mm, yyyy;
    dd = DATE.getDate();
    mm = DATE.getMonth();
    yyyy = DATE.getFullYear();
    return `${yyyy}-${String(mm).padStart(2,0)}-${dd}`;
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
    props.onAddTask(formData);
    setFormData({
      title: '',
      description: '',
      date: currentDate(),
      id: Math.floor(Math.random() * 1000),
      done: false
    })
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

  return (
    <form className={`${Styles.card} ${Styles['new-task']}`}>
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
            <button onClick={cancelHandler} className={Styles['new-task__button']}>Cancel</button>
            <button onClick={submitHandler} className={Styles['new-task__button']}>Done</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default NewTask;