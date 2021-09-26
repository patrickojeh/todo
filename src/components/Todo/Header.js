import Button from '../UI/Button';
import Styles from '../UI/Styles.module.css';
import plusIcon from '../../svg/icon--plus.svg';

function Header(props) {
  return <header className={Styles.app__header}>
    <span className={Styles.app__logo}>Todo</span>
    <Button onClick={props.onEnableNewTask}>
      <img src={plusIcon} alt="Plus icon" />
    </Button>
  </header>
}

export default Header;