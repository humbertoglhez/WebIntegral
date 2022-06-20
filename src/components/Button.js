import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button() {
  function salir(){
    localStorage.removeItem('sesion');
    localStorage.removeItem('stateRegisterForm');
    window.location.reload();
    document.location.href="/";
  }
  return (
    <Link to='sesión'>
      <button className='btn2' onClick={salir}>Cerrar sesión</button>
    </Link>
  );
}
