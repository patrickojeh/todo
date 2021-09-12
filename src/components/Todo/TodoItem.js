import Styles from '../UI/Styles.module.css';
import chevronIcon from '../../icon--chevron-down.svg';

function TodoItem(props) {
  function checkboxHandler(e) {
    let checkboxId = e.target.id;
    props.onCheckboxId(checkboxId);
  }

  return (
    <div>
      <a href="#" className={Styles['todo-item']}>
        <div>
          <input type="checkbox" id={props.id} onChange={checkboxHandler} checked={props.completed} />
        </div>
        <div>
          <p>{props.title}</p>
          <div className={Styles.collapsed}>
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