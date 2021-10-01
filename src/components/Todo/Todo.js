import React, {useState, useEffect, useReducer} from 'react';
import ReactDOM from 'react-dom';

import EditModal from '../Modals/EditModal';
import DeleteModal from '../Modals/DeleteModal';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';
import Header from './Header';
import EmptyState from '../EmptyState/EmptyState';

import Styles from '../UI/Styles.module.css';

let modReducer = (state, action) => {
  if (action.type === 'edit') {
    return {type: action.type, isEnabled: action.isEnabled};
  } else if (action.type === 'delete') {
    return {type: action.type, isEnabled:  action.isEnabled};
  } else {
    return {isEnabled: false};
  }
}

function Todo(props) {
  let [enableNewTask, setEnableNewTask] = useState(false);
  let [modalData, setModalData] = useState({});

  let [modalReducer, modalDispatch] = useReducer(modReducer, {
    type: '',
    isEnabled: false
  });

  let todoObj = props.data;

  let [todoData, setTodoData] = useState(todoObj);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoData));
  }, [todoData])

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
    todoData.filter(checkedTodoId => {
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

  let completedTasks = todoData.filter(task => {
    return task.completed;
  });

  let uncompletedTasks = todoData.filter(task => {
      return !task.completed;
  });

  function editHandler(todoId) {
    modalDispatch({type: 'edit', isEnabled: true});

    let [editData] = todoData.filter(todo => {
      return todo.id === Number(todoId);
    });
    setModalData(editData);
  }

  function deleteHandler(todoId) {
    modalDispatch({type: 'delete', isEnabled: true});

    let [editData] = todoData.filter(todo => {
      return todo.id === Number(todoId);
    });
    setModalData(editData);
  }

  function backdropHandler() {
    modalDispatch({type: ''});
  }

  function closeHandler() {
    modalDispatch({type: ''});
  }

  function modalSubmitHandler(formData) {
    let editedTodoId = todoData.findIndex(todo => {
      return todo.id === formData.id;
    })
    
    let {
        title: formTitle, 
        description:formDescription, 
        date: formDate
        } = formData;
    todoData[editedTodoId].title = formTitle;
    todoData[editedTodoId].description = formDescription;
    todoData[editedTodoId].date = formDate;

    setTodoData((prevData) => {
      return [
        ...prevData
      ]
    });
    closeHandler();
  }

  function deleteSubmitHandler(todoId) {
    let selectedTodoId = todoData.findIndex(todo => {
      return todo.id === todoId;
    })
    todoData.splice(selectedTodoId, 1);
    setTodoData(() => {
      return [
        ...todoData
      ]
    });
    closeHandler();
  }

  return (
    <React.Fragment>
      <Header onEnableNewTask={enableNewTaskHandler}/>
      <div>
        {enableNewTask ? <NewTodo onAddTask={addTaskHandler} onCancel={disableNewTaskHandler} /> : ''}
      </div>
      <div>
        {
          uncompletedTasks.length === 0 && 
          <EmptyState />
        }

        {
          todoData.map(todo => {
            return (!todo.completed) && 
            <TodoItem
              onEdit={editHandler} 
              onDelete={deleteHandler}
              onCheckboxId={checkboxIdHandler} 
              id={todo.id} key={todo.id} 
              title={todo.title} 
              description={todo.description} 
              date={todo.date} 
              completed={todo.completed} 
            />
          })
        }

        {completedTasks.length > 0 && <p className={Styles.title}>Done</p>}

        {
          todoData.map(todo => {
            return (todo.completed) && 
            <TodoItem 
              onEdit={editHandler} 
              onDelete={deleteHandler}
              onCheckboxId={checkboxIdHandler} 
              id={todo.id} 
              key={todo.id} 
              title={todo.title} 
              description={todo.description} 
              date={todo.date} 
              completed={todo.completed} 
            />
          })
        }
      </div>      

      {
        ReactDOM.createPortal(
          <EditModal 
            id={modalData.id} 
            showModal={modalReducer.type === 'edit' && modalReducer.isEnabled} 
            title={modalData.title}
            description={modalData.description}
            date={modalData.date}
            onClose={closeHandler}
            onSubmit={modalSubmitHandler}
            onBackdrop={backdropHandler} />, 
          document.querySelector('#modal'))
      }
      {
        ReactDOM.createPortal(
          <DeleteModal 
            id={modalData.id} 
            showModal={modalReducer.type === 'delete' && modalReducer.isEnabled} 
            onClose={closeHandler}
            onDelete={deleteSubmitHandler}
            onBackdrop={backdropHandler} />, 
          document.querySelector('#modal'))
      }
    </React.Fragment>
  )
}

export default Todo;