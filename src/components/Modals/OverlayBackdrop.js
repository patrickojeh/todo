import Styles from '../UI/Styles.module.css';

function OverlayBackdrop(props) {
  return <div 
    className={Styles['modal-overlay']} 
    onClick={props.onBackdropClick}></div>
}

export default OverlayBackdrop;