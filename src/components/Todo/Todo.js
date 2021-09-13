import Styles from '../UI/Styles.module.css';
import Button from '../UI/Button';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';
import plusIcon from '../../icon--plus.svg';
import {useState} from 'react';

function Todo(props) {
  let [enableNewTask, setEnableNewTask] = useState(false);

  let todoObj = props.data;

  let [todoData, setTodoData] = useState(todoObj);


  function enableNewTaskHandler() {
    setEnableNewTask(true);
  }

  function disableNewTaskHandler(data) {
    setEnableNewTask(data);
  }

  function addTaskHandler(newTask) {
    setTodoData((prevData) => {
      return [
        newTask,
        ...prevData        
      ]
    })
  }

  function checkboxIdHandler(checkboxId) {
    let newTodoData = todoData.filter(checkedTodoId => {
      if (checkedTodoId.id === parseInt(checkboxId)) {
        checkedTodoId.completed = !checkedTodoId.completed;
      }
      return false;
    })

    setTodoData((prevData) => {
      return [
        ...prevData
      ]
    })
  }

  return (
    <div>
      <header className={Styles.app__header}>
        <span className={Styles.app__logo}>Todo</span>
        <Button onClick={enableNewTaskHandler}>
          <img src={plusIcon} alt="Plus icon" />
        </Button>
      </header>
      <div>
        {enableNewTask ? <NewTodo onAddTask={addTaskHandler} onCancel={disableNewTaskHandler} /> : ''}
      </div>
      <div>
        {
          todoData.map(todo => {
            return (!todo.completed) && 
            <TodoItem onCheckboxId={checkboxIdHandler} id={todo.id} key={todo.id} title={todo.title} description={todo.description} date={todo.date} completed={todo.completed} />
          })
        }
        {/* <p>Completed tasks</p> */}
        {
          todoData.map(todo => {
            return (todo.completed) && 
            <TodoItem onCheckboxId={checkboxIdHandler} id={todo.id} key={todo.id} title={todo.title} description={todo.description} date={todo.date} completed={todo.completed} />
          })
        }
      </div>
      <footer>
        <p className={Styles.footer__text}>&copy; 2020 Patrick Ojeh.</p>
      </footer>
    </div>
  )
}

export default Todo;