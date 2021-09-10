import Styles from '../UI/Styles.module.css';
import {useState} from 'react';

function TodoItem(props) {
  let [x, setX] = useState(!props.done);
  function checkboxHandler(e) {
    let checkboxId = e.target.id;
    props.onCheckboxId(checkboxId);
  }

  return (
    <div>
      <div className={Styles['todo-item']}>
        <div>
          <input type="checkbox" id={props.id} onChange={checkboxHandler} />
        </div>
        <div>
          <p>{props.title}</p>
          <div>
            <div>
              <span></span>
              <small>{props.description}</small>
            </div>
            <div>
              <span></span>
              <small>{props.date}</small>
            </div>
          </div>
        </div>
        <div>...</div>
      </div>
      <hr />
    </div>
  )
}

export default TodoItem;