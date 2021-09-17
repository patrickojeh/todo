import {useState} from 'react';

import Button from '../UI/Button';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';
import Footer from './Footer';

import Styles from '../UI/Styles.module.css';

import plusIcon from '../../icon--plus.svg';
import emptyStateImg from '../../illustration--sun_cloud.svg';

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

  let numberOfCompletedTasks = todoData.filter(task => {
    return task.completed;
  });

  let totalNumberOfTasks = todoData.length;

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
          totalNumberOfTasks === 0 && 
          <div className={Styles.emptystate}>
            <img alt="Illustration of the sun and cloud" src={emptyStateImg} />  
            <p>Create new tasks and get productive!</p>
          </div>
        }

        {
          todoData.map(todo => {
            return (!todo.completed) && 
            <TodoItem onCheckboxId={checkboxIdHandler} id={todo.id} key={todo.id} title={todo.title} description={todo.description} date={todo.date} completed={todo.completed} />
          })
        }

        {numberOfCompletedTasks.length > 0 && <p className={Styles.title}>Done</p>}

        {
          todoData.map(todo => {
            return (todo.completed) && 
            <TodoItem onCheckboxId={checkboxIdHandler} id={todo.id} key={todo.id} title={todo.title} description={todo.description} date={todo.date} completed={todo.completed} />
          })
        }
      </div>
      <Footer />
    </div>
  )
}

export default Todo;