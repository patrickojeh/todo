import Styles from '../UI/Styles.module.css';
import chevronIcon from '../../svg/icon--chevron-down.svg';
import detailsIcon from '../../svg/icon--details.svg';
import calendarIcon from '../../svg/icon--calendar.svg';
import React, {useState} from 'react';

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
    <React.Fragment>
      <a href="/#" className={`${Styles['todo-item']}`} onClick={toggleCollapseHandler}>
        <div>
          <input type="checkbox" id={props.id} onChange={checkboxHandler} checked={props.completed} />
        </div>
        <div>
          <p>{props.title}</p>
          <div className={`${Styles.collapsed} ${isCollapsed && Styles.expand}`}>
            <div>
              <span>
                <img alt="details icon" src={detailsIcon} height="9" />
              </span>
              <small>{props.description.length > 0 ? props.description : '-'}</small>
            </div>
            <div>
              <span>
                <img alt="details icon" src={calendarIcon} height="10" />
              </span>
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
    </React.Fragment>
  )
}

export default TodoItem;