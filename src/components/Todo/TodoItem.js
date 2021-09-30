import Styles from '../UI/Styles.module.css';
import chevronIcon from '../../svg/icon--ellipsis.svg';
import detailsIcon from '../../svg/icon--details.svg';
import calendarIcon from '../../svg/icon--calendar.svg';
import React, {useState} from 'react';

function TodoItem(props) {
  let [isCollapsed, setIsCollapsed] = useState(false);
  let [showMore, setShowMore] = useState(false);

  function checkboxHandler(e) {
    let checkboxId = e.target.id;
    props.onCheckboxId(checkboxId);
  }

  function toggleCollapseHandler(e) {
    setIsCollapsed(!isCollapsed);
  }

  function moreOptionHandler(e) {
    e.stopPropagation();
    setShowMore(!showMore);
  }

  function editBtnHandler(e) {
    e.stopPropagation();
    props.onEdit(e.target.closest('[data-todo-id]').getAttribute('data-todo-id'))
    setShowMore(!showMore);
  }

  return (
    <React.Fragment>
      <a href="/#" data-todo-id={props.id} className={Styles['todo-item']} onClick={toggleCollapseHandler}>
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
          <button type="button" onClick={moreOptionHandler}>
            <img alt="ellipsis icon for more options" src={chevronIcon} />
          </button>
          <div className={`${Styles.more} ${showMore && Styles['show-more']}`}>
            <ul>
              <li><button type="button" onClick={editBtnHandler}>Edit</button></li>
              <li><button type="button">Delete</button></li>
            </ul>
          </div>
        </div>
      </a>
    </React.Fragment>
  )
}

export default TodoItem;