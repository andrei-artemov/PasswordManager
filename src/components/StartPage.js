import { useState } from 'react';
import '../App.css';
import ModalReg from './ModalReg';
import ModalLogIn from './ModalLogIn';
import './StartPage.css';

function StartPage() {
    const [modalLActive, setModalLActive] = useState(false)
    const [modalRActive, setModalRActive] = useState(false)

    return (
          <div className="StartPage">
            <div className="StartPage__content">
              <h1>PasswordManeger</h1>
              <div className="autorisation">
                <button className="login__btn btn-primary" onClick={() => setModalLActive(true)}>Login</button>
                <button className="register__btn btn-primary" onClick={() => setModalRActive(true)}>Register</button>
              </div>
              <ModalReg active={modalRActive} setActive={setModalRActive} />
              <ModalLogIn active={modalLActive} setActive={setModalLActive} />
            </div>
          </div>
    )
  } 
  
  export default StartPage;