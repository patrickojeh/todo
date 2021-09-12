import './App.css';
import Styles from './components/UI/Styles.module.css';
import Todo from './components/Todo/Todo';

function App() {
  let todosObj = [{
    id: 1,
    title: "Yo",
    description: "Sample description",
    date: "24-05-1990",
    completed: false
  }]

  return (
    <div className={Styles.app}>
      <Todo data={todosObj} />
    </div>
  );
}

export default App;
