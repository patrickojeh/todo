import Styles from '../UI/Styles.module.css';
import Button from '../UI/Button';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';
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

  function checkboxIdHandler(data) {
    // next: filter todoData against the checkbox id passed and set the task status to uncompleted. 
    // then alter displayed data accordingly
    let d = todoData.filter(x => {
      return x.id !== parseInt(data)
    })

    setTodoData((prevData) => {
      return [
        ...d
      ]
    })

    console.log(todoData, data)
  }

  return (
    <div>
      <header className={Styles.app__header}>
        <span className={Styles.app__logo}>Todo</span>
        <Button onClick={enableNewTaskHandler}>New todo +</Button>
      </header>
      <div>
        {enableNewTask ? <NewTodo onAddTask={addTaskHandler} onCancel={disableNewTaskHandler} /> : ''}
      </div>
      <div>
        {
          todoData.map(todo => {
            return <TodoItem onCheckboxId={checkboxIdHandler} id={todo.id} key={todo.id} title={todo.title} description={todo.description} date={todo.date} />
          })
        }
      </div>
    </div>
  )
}

export default Todo;