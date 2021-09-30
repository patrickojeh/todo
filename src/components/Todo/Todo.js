import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Modal from '../UI/Modal';
import NewTodo from './NewTodo';
import TodoItem from './TodoItem';
import Header from './Header';
import Footer from './Footer';

import Styles from '../UI/Styles.module.css';

function Todo(props) {
  let [enableNewTask, setEnableNewTask] = useState(false);

  let [enableModal, setEnableModal] = useState(false);

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

    // set data to localstorage.
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

  let completedTasks = todoData.filter(task => {
    return task.completed;
  });

  let uncompletedTasks = todoData.filter(task => {
      return !task.completed;
  });

  let [modalData, setModalData] = useState({});
  function editHandler(todoId) {
    setEnableModal(true);
    let [editData] = todoData.filter(todo => {
      return todo.id === Number(todoId);
    });
    setModalData(editData);
  }

  function backdropHandler() {
    setEnableModal(!enableModal);
  }

  function closeHandler() {
    setEnableModal(!enableModal);
  }

  function submittedEditHandler(formData) {
    let editedTodoId = todoData.findIndex(todo => {
      return todo.id === formData.id;
    })
    let {formId, 
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
    })
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
          <div className={Styles.emptystate}>
            <svg width="128" height="109" viewBox="0 0 128 109" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className={Styles.sun} fillRule="evenodd" clipRule="evenodd" d="M29.9015 9.65368C29.8446 9.6598 29.7872 9.6598 29.7303 9.65368C29.5077 9.6083 29.3123 9.47636 29.1871 9.28689C29.0619 9.09742 29.017 8.86594 29.0625 8.64342L30.5008 1.55876C30.5409 1.24022 30.7559 0.970896 31.0576 0.861127C31.3592 0.751357 31.697 0.819599 31.9324 1.03789C32.1678 1.25618 32.2613 1.58782 32.1746 1.89694L30.7406 8.98588C30.6522 9.37775 30.3032 9.65548 29.9015 9.65368ZM37.3329 26.995C37.1231 23.198 34.3663 20.103 30.3082 19.1098C26.1815 18.0996 22.8768 19.1098 19.9059 22.3461C17.2775 25.1928 16.5412 29.572 18.1508 32.7612C19.4822 35.2578 21.7753 37.1025 24.4992 37.8681C25.4892 38.1667 26.5173 38.3195 27.5514 38.3219C29.1227 38.3385 30.671 37.943 32.0419 37.1746C35.8047 35 37.5855 31.5754 37.3329 26.995ZM42.7437 16.7366C42.8634 17.0812 43.1882 17.3121 43.5529 17.3119C43.7455 17.312 43.9325 17.2471 44.0837 17.1278L48.6256 13.532C48.8657 13.3416 48.986 13.0375 48.9412 12.7344C48.8963 12.4312 48.6932 12.175 48.4082 12.0623C48.1233 11.9496 47.7998 11.9974 47.5597 12.1878L43.0221 15.7837C42.7358 16.0096 42.6241 16.3921 42.7437 16.7366ZM11.674 13.8788C11.4223 13.88 11.1827 13.7704 11.0191 13.5791L8.42494 10.5355C8.18396 10.1766 8.24833 9.69438 8.575 9.41125C8.90168 9.12813 9.38817 9.13296 9.70917 9.4225L12.3076 12.4661C12.4547 12.6392 12.527 12.8637 12.5085 13.0901C12.49 13.3165 12.3823 13.5263 12.2091 13.6733C12.0597 13.8012 11.8707 13.8738 11.674 13.8788ZM5.50542 26.4942C5.55385 26.4983 5.60254 26.4983 5.65097 26.4942V26.5156C6.12381 26.5558 6.5397 26.205 6.57989 25.7322C6.62008 25.2594 6.26935 24.8435 5.79651 24.8033L1.05771 23.9899C0.59078 23.9107 0.148054 24.225 0.0688534 24.692C-0.0103473 25.1589 0.303969 25.6016 0.770898 25.6808L5.50542 26.4942ZM39.8577 46.2786C40.1078 46.308 40.3322 46.446 40.4713 46.6558L42.6752 49.9929C42.8706 50.3785 42.748 50.8493 42.3892 51.0905C42.0305 51.3317 41.5482 51.2676 41.2649 50.9411L39.0567 47.6035C38.9318 47.4138 38.8875 47.1822 38.9334 46.9597C38.9793 46.7372 39.1118 46.5421 39.3016 46.4173C39.4655 46.3086 39.6619 46.2596 39.8577 46.2786ZM47.5179 34.509C47.4703 34.499 47.422 34.493 47.3734 34.4912L47.376 34.47C46.9116 34.3725 46.4561 34.6699 46.3586 35.1343C46.2611 35.5987 46.5585 36.0543 47.0229 36.1518L51.6273 37.5366C52.0811 37.6721 52.5588 37.4141 52.6943 36.9603C52.8298 36.5065 52.5718 36.0288 52.118 35.8932L47.5179 34.509ZM5.41559 45.8946C5.05233 45.8943 4.7288 45.6648 4.60846 45.322C4.48811 44.9793 4.59716 44.5979 4.8805 44.3706L8.84448 41.1943C9.08194 40.9915 9.41096 40.9341 9.70305 41.0445C9.99515 41.1548 10.204 41.4155 10.248 41.7246C10.2921 42.0337 10.1643 42.3423 9.91467 42.5299L5.95069 45.7019C5.79948 45.8252 5.6107 45.8932 5.41559 45.8946ZM19.5334 53.7498C19.6334 53.7869 19.7392 53.8057 19.8459 53.8054C20.1978 53.8051 20.5137 53.5894 20.6421 53.2618L22.2902 49.0281C22.4011 48.7429 22.3514 48.4201 22.1598 48.1815C21.9682 47.9429 21.6639 47.8246 21.3614 47.8711C21.059 47.9177 20.8044 48.1221 20.6935 48.4074L19.0454 52.641C18.963 52.8528 18.9681 53.0886 19.0596 53.2965C19.1511 53.5045 19.3216 53.6675 19.5334 53.7498Z" fill="#EFC456"/>
              <path d="M115.152 74.7636C111.72 73.5557 107.967 73.6319 104.587 74.9781C108.81 66.5984 113.63 53.2444 106.437 45.783C103.668 42.9138 99.9009 41.5663 95.5301 41.8881C89.329 42.3507 82.5246 46.1584 77.7649 50.5427C79.575 44.2881 81.3716 37.8055 78.9448 31.1017C77.7247 27.7028 74.6812 24.8872 70.384 23.171C65.2489 21.1264 59.4032 21.0862 55.4882 23.0705C49.153 26.2682 44.6883 35.9083 42.0805 43.43C40.2039 48.6948 38.8148 54.1209 37.9309 59.6398C36.7309 57.3203 35.2493 56.1337 33.5063 54.6991C31.4952 53.0298 25.9981 52.8354 23.4104 53.9013C17.377 56.3885 14.3603 65.5861 13.8709 70.795C13.2809 77.0228 13.8709 88.6874 17.987 95.2974C22.1836 102.075 31.2136 106.024 37.6761 107.364C43.542 108.584 51.0838 109 56.8155 109C57.9216 109 58.9674 109 59.9194 108.96C64.7193 108.812 68.6343 108.658 72.1807 108.457C87.3179 107.606 98.9155 105.836 109.789 102.719C110.754 102.444 111.8 102.189 112.839 101.921C119.456 100.265 127.688 98.2001 127.487 88.969C127.38 82.5668 122.861 77.3848 115.152 74.7636Z" fill="#EAEAEF"/>
              <path d="M108.634 73.3802C105.704 72.349 102.5 72.4141 99.6141 73.5634C103.22 66.4092 107.335 55.0082 101.194 48.6381C98.83 46.1885 95.6134 45.0381 91.8818 45.3129C86.5877 45.7078 80.7785 48.9586 76.7149 52.7017C78.2602 47.3618 79.7941 41.8273 77.7222 36.104C76.6805 33.2022 74.0821 30.7984 70.4135 29.3332C66.0294 27.5876 61.0386 27.5533 57.6961 29.2474C52.2876 31.9774 48.4758 40.2076 46.2494 46.6292C44.6472 51.124 43.4613 55.7565 42.7067 60.4683C41.6822 58.488 40.4173 57.475 38.9292 56.2502C37.2122 54.8251 32.5191 54.6591 30.3099 55.5691C25.1588 57.6925 22.5833 65.5449 22.1655 69.992C21.6619 75.309 22.1655 85.2676 25.6797 90.9109C29.2625 96.6972 36.9719 100.068 42.4892 101.213C47.4971 102.255 53.9359 102.609 58.8294 102.609C59.7737 102.609 60.6666 102.609 61.4793 102.575C65.5772 102.449 68.9197 102.318 71.9473 102.146C84.8707 101.419 94.7721 99.908 104.055 97.2467C104.88 97.012 105.772 96.7945 106.66 96.5656C112.308 95.1519 119.337 93.3891 119.165 85.508C119.073 80.0422 115.216 75.6181 108.634 73.3802Z" fill="white"/>
            </svg>

            <p>Create new tasks and get productive!</p>
          </div>
        }

        {
          todoData.map(todo => {
            return (!todo.completed) && 
            <TodoItem onEdit={editHandler} onCheckboxId={checkboxIdHandler} id={todo.id} key={todo.id} title={todo.title} description={todo.description} date={todo.date} completed={todo.completed} />
          })
        }

        {completedTasks.length > 0 && <p className={Styles.title}>Done</p>}

        {
          todoData.map(todo => {
            return (todo.completed) && 
            <TodoItem onEdit={editHandler} onCheckboxId={checkboxIdHandler} id={todo.id} key={todo.id} title={todo.title} description={todo.description} date={todo.date} completed={todo.completed} />
          })
        }
      </div>
      <Footer />

      {
        ReactDOM.createPortal(
          <Modal 
            id={modalData.id} 
            showModal={enableModal} 
            title={modalData.title}
            description={modalData.description}
            date={modalData.date}
            onClose={closeHandler}
            onSubmit={submittedEditHandler}
            onBackdrop={backdropHandler} />, 
          document.querySelector('#modal'))
      }
    </React.Fragment>
  )
}

export default Todo;