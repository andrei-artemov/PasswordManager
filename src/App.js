import './App.css';
import {Route, BrowserRouter as Router} from "react-router-dom";
import ModalReg from './components/ModalReg';
import Home from './components/Home';
import { AuthProvider } from "./components/Auth"
import PrivateRoute from './components/PrivateRoute';
import ModalLogIn from './components/ModalLogIn';
import StartPage from './components/StartPage';

function App() {
  return (
    <AuthProvider>
      <Router>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path ="/login" component={ModalLogIn} />
          <Route exact path="/signup" component={ModalReg}/>
        <StartPage />
      </Router>
    </AuthProvider>
  )
} 

export default App;
