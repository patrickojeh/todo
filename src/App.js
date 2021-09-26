import './App.css';
import Styles from './components/UI/Styles.module.css';
import Todo from './components/Todo/Todo';

function App() {
  // let todosObj = [{
  //   id: 1,
  //   title: "",
  //   description: "",
  //   date: "",
  //   completed: false
  // }]

  const savedTodos = JSON.parse(localStorage.getItem('todos'));
  let todosObj = savedTodos ? savedTodos : [];

  return (
    <div className={Styles.app}>
      <Todo data={todosObj} />
    </div>
  );
}

export default App;
