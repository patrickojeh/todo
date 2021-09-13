import Styles from '../UI/Styles.module.css';
import chevronIcon from '../../icon--chevron-down.svg';
import {useState} from 'react';

function TodoItem(props) {
  let [isCollapsed, setIsCollapsed] = useState(false)

  function checkboxHandler(e) {
    let checkboxId = e.target.id;
    props.onCheckboxId(checkboxId);
  }

  function toggleCollapseHandler(e) {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div>
      <a href="/#" className={`${Styles['todo-item']}`} onClick={toggleCollapseHandler}>
        <div>
          <input type="checkbox" id={props.id} onChange={checkboxHandler} checked={props.completed} />
        </div>
        <div>
          <p>{props.title}</p>
          <div className={`${Styles.collapsed} ${isCollapsed && Styles.expand}`}>
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
        <div>
          <button type="button">
            <img alt="chevron icon pointing downwards" src={chevronIcon} />
          </button>
        </div>
      </a>
    </div>
  )
}

export default TodoItem;