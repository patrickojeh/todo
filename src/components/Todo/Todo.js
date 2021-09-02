import Styles from '../UI/Styles.module.css';
import Button from '../UI/Button';
import NewTask from './NewTask';

function Todo() {
  return (
    <div>
      <header className={Styles.app__header}>
        <span className={Styles.app__logo}>Todo</span>
        <Button>New task</Button>
      </header>
      <div>
        <NewTask />
      </div>
    </div>
  )
}

export default Todo;