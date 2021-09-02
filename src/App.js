import './App.css';
import Styles from './components/UI/Styles.module.css';
import Todo from './components/Todo/Todo';

function App() {
  return (
    <div className={Styles.app}>
      <Todo />
    </div>
  );
}

export default App;
