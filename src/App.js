import './App.css';
import Styles from './components/UI/Styles.module.css';
import Todo from './components/Todo/Todo';
import Footer from './components/Todo/Footer';
import { useEffect } from 'react';
import {greenbiisdk} from 'greenbiisdk';

function App() {
  const savedTodos = JSON.parse(localStorage.getItem('todos'));
  let todosObj = savedTodos ? savedTodos : [];
  const API_KEY = 'dgm7dcn7fyflsgn7tlbh0ux7i0bvwkjfc7z3d6812thtk1e9t6fu2pqfj015pd2y';
  useEffect(() => {
    const greenbii = new greenbiisdk();

    const param = new URLSearchParams(window.location.search);
    greenbii.init(
      {access_token: param.get("request_access_token"), api_key: API_KEY}
    ).then(status=>{
      if(status === true) {
        console.log('patrick: ' + greenbii.getCurrentUser());
        // greenbii.getBusinessDetails()
      }
      else {
        // console.log(greenbii.getStatusMessage())
      }
    })
  }, []);

  return (
    <div className={Styles.app}>
      <Todo data={todosObj} />
      <Footer />
    </div>
  );
}

export default App;
