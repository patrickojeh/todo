import './App.css';
import Styles from './components/UI/Styles.module.css';
import Todo from './components/Todo/Todo';

function App() {
  // let todosObj = [{
  //   id: 1,
  //   title: "Hey 👋",
  //   description: "I'll get rid of this task soon.",
  //   date: "24-05-2021",
  //   completed: false
  // }]

  let todosObj = []

  return (
    <div className={Styles.app}>
      <Todo data={todosObj} />
    </div>
  );
}

export default App;
