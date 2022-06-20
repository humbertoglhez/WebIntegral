import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import sesión from './components/pages/Products';
import Productos from './components/pages/Productos';
import SignUp from './components/pages/SignUp';
import Usuarios from './components/pages/Usuarios';

//Declare value of sesion
var sesionVar=localStorage.getItem('sesion'); //Take value of LocalStorage
function App() {
  let sesion;
  if(sesionVar==null){//If value of LocalStorage are null you need SingUp/Register
  sesion=<SignUp/>;
  }else //Else you are logged, you can access to all Website/webApp
  sesion=
  <Router>
    <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/sesión' component={sesión} />
        <Route path='/productos' component={Productos} />
        <Route path='/sesión' component={SignUp} />
        <Route path='/usuarios' component={Usuarios} />
    </Switch>
  </Router>;
  return (
    <div className="App">
      <header className="App-header">
        {sesion}
      </header>
    </div>
  );
}

export default App;
