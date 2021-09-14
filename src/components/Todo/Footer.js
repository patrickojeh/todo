import React from 'react';
import Styles from '../UI/Styles.module.css';

function Footer() {
  let currentYear = new Date().getFullYear();

  return <React.Fragment>
    <footer>
      <p className={Styles.footer__text}>&copy; {currentYear} Patrick Ojeh.</p>
    </footer>
  </React.Fragment>
}

export default Footer;