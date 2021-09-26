import Styles from '../UI/Styles.module.css';

function Footer() {
  let currentYear = new Date().getFullYear();

  return <footer>
    <p className={Styles.footer__text}>&copy; {currentYear} Patrick Ojeh.</p>
  </footer>
}

export default Footer;