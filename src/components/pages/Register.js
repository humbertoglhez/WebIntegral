import React from 'react';
import '../../App.css';
import swal from 'sweetalert';

export default function Register() {

    
  function validaregistro(){
    let cli_id = document.getElementById("cli_correo").value;
    let cli_correo = document.getElementById("cli_correo").value;
    let cli_password = document.getElementById("cli_password").value;
    if(cli_correo =='usuario')
        {
            if(cli_password=='1234')
            {
                localStorage.setItem('userName', cli_correo);
                localStorage.setItem('password', cli_password);
                document.location.href="/";
            }
            else
            swal("contraseña incorrecta"); //Alert of password
        }
      else
      swal("usuario incorrecto");//Alert of user
  }
  function testState(){
      let stateRegisterForm = "off";
      localStorage.setItem('stateRegisterForm', stateRegisterForm);
      window.location.reload();
  }

  return(
<center>
  <div className="divEdit"> 
    <table className="tableEdit" border="1">
        <tr>
            <td className="tdEdit" colSpan="2"> Bienvenido al registro </td>
        </tr>
        <tr>
            <td className="tdEdit"> Número de identificación:</td>
            <td className="tdEdit" > <input id="cli_id"/> </td>
            <td className="tdEdit"> Nota:su número de identificación debe conformare de sus iniciales y 4 números de su elección</td>
            <td className="tdEdit"> Ejemplo: JAVL4398</td>
        </tr>
        <tr>
            <td className="tdEdit"> Nombre completo:</td>
            <td className="tdEdit" > <input id="cli_nombre"/> </td>
        </tr>
        <tr>
            <td className="tdEdit"> Corre eléctronico:</td>
            <td className="tdEdit" > <input id="cli_correo"/> </td>
        </tr>
        <tr>
            <td className="tdEdit"> Número teléfonico:</td>
            <td className="tdEdit" > <input id="cli_telefono"/> </td>
        </tr>
        <tr>
            <td className="tdEdit"> Contraseña:</td>
            <td className="tdEdit"> <input id="cli_password" type="password"/> </td>
        </tr>
        <tr>
            <td  className="tdEdit" colSpan="2"><button style={{width:"100%"}} class="btn2" outline onClick={testState}>Aceptar</button></td>
        </tr>
    </table>
</div>
</center>
)
}
