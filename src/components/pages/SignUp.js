import React from 'react';
import '../../App.css';
import swal from 'sweetalert';
import axios from "axios";

var formVar=localStorage.getItem('registerForm'); //Take value of LocalStorage
const url="http://castrowebapi.somee.com/api/users";
export default function SignUp() {
    let form;
    if(formVar==null){//If value of LocalStorage are null you need SingUp/Register
        form=
    <center>
        <div className="divEdit"> 
    <table className="tableEdit" border="1">
        <tr>
            <td className="tdEdit" colSpan="2"> Inicio de sesión </td>
        </tr>
        <tr>
            <td className="tdEdit"> Usuario:</td>
            <td className="tdEdit" > <input id="cli_cve"/> </td>
        </tr>
        <tr>
            <td className="tdEdit"> Password:</td>
            <td className="tdEdit"> <input id="cli_password" type="password"/> </td>
        </tr>
        <tr>
            <td  className="tdEdit" colSpan="2"><button style={{width:"100%"}} class="btn btn-primary" outline onClick={validarFormLogin}>Aceptar</button></td>
        </tr>
        <tr>
            <td className="tdEdit" colSpan="2"> ¿No está registrado? click en el botón para hacerlo</td>
        </tr>
        <tr>
            <td  className="tdEdit" colSpan="2"><button style={{width:"100%"}} class="btn btn-primary" outline onClick={registro}>Registro</button></td>
        </tr>
    </table>
    <h3> Equipo: </h3>
    <h3> Juan de Dios Castro Espinoza </h3>
    <h3> Julio Cesar Fuentes Lopez </h3>
    <h3> Jesus Alfonso Valenzuela Lagarda </h3>
        </div>
     </center>;
    }else   //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    form=
    <center>
    <div className="divEdit"> 
      <table className="tableEdit" border="1">
          <tr>
              <td className="tdEdit" colSpan="2"> Bienvenido al registro </td>
          </tr>
          <tr>
              <td className="tdEdit"> Número de identificación:</td>
              <td className="tdEdit" > <input id="cli_cve"/> </td>
              <td className="tdEdit"> Nota:su número de identificación debe conformare de sus iniciales y 4 números de su elección</td>
              <td className="tdEdit"> Ejemplo: JAVL4398</td>
          </tr>
          <tr>
              <td className="tdEdit"> Nombre completo:</td>
              <td className="tdEdit" > <input id="cli_nombre"/> </td>
              <td className="tdEdit"> Nota:debe ser su nombre completo</td>
              <td className="tdEdit"> Ejemplo: Jose Eduardo Ramirez Ochoa</td>
          </tr>
          <tr>
              <td className="tdEdit"> Corre eléctronico:</td>
              <td className="tdEdit" > <input id="cli_correo"/> </td>
              <td className="tdEdit"> Nota:use de preferencia correo eléctronico Gmail personal</td>
              <td className="tdEdit"> Ejemplo: ejemplo@gmail.com</td>
          </tr>
          <tr>
              <td className="tdEdit"> Número teléfonico:</td>
              <td className="tdEdit" > <input id="cli_telefono"/> </td>
              <td className="tdEdit"> Nota:No coloque su lada solamente el número</td>
              <td className="tdEdit"> Ejemplo: 6442847593</td>
          </tr>
          <tr>
              <td className="tdEdit"> Contraseña:</td>
              <td className="tdEdit"> <input id="cli_password" type="password"/> </td>
              <td className="tdEdit"> Nota:Se recomienda 10 digitos minimo</td>
              <td className="tdEdit"> Ejemplo: ****************</td>
          </tr>
          <tr>
              <td  className="tdEdit" colSpan="2"><button style={{width:"100%"}} class="btn2" outline onClick={validarFormRegistro}>Aceptar</button></td>
              <td  className="tdEdit" colSpan="2"><button style={{width:"100%"}} class="btn2" outline onClick={refrescar}>Ir a iniciar sesión</button></td>
          </tr>
      </table>
  </div>
  </center>;
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  async function validarFormRegistro(){
    let cli_cve_form = document.getElementById("cli_cve").value;
    let cli_nombre_form = document.getElementById("cli_nombre").value;
    let cli_correo_form = document.getElementById("cli_correo").value;
    let cli_telefono_form = document.getElementById("cli_telefono").value;
    let cli_password_form = document.getElementById("cli_password").value;
    let formRegister={
        cli_cve: cli_cve_form,
        cli_nombre: cli_nombre_form,
        cli_correo: cli_correo_form,
        cli_telefono: cli_telefono_form,
        cli_password: cli_password_form
    };
    console.log(formRegister);
    await axios.post(url,formRegister).then((response) => {
        // Success
        console.log(response);
        alertCorrect();
        }).catch((error) => {
        // Error
        if (error.response) {
            /* Show errors*/
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });

    localStorage.removeItem('registerForm');
    //refresh()
    setTimeout(() => window.location.reload(), 5000);
  }
  function alertCorrect(){
    swal("Usuario registrado, recargando..."); //Alert
  }
  function alertError(){
    swal("Ha ocurrido un error, recargando..."); //Alert
  }
  function refrescar(){
    localStorage.removeItem('registerForm');
    window.location.reload();
  }
  function registro(){
    localStorage.setItem('registerForm', "on");
    window.location.reload();
  }
  function validarFormLogin(){
    let id = document.getElementById("cli_cve").value;
    let password = document.getElementById("cli_password").value;
    console.log(id,password)
    axios.get(url+"/"+id).then((response) => {
        console.log(response);
        let  idbd = response.data.cli_cve;
        let  passwordbd = response.data.cli_password;
        console.log(idbd,passwordbd)
        
        {
            if(password== passwordbd)
            {
                localStorage.setItem('sesion', id);
                document.location.href="/";
                
            }
            else
            swal("contraseña incorrecta"); //Alert of password
            
        
      
        }
    }).catch((err) => {
        console.log(err);
        swal("Numero de identificacion incorrecto");//Alert of Id
    })
    
           
  }
  return(
    <div className="App">
      <header className="App-header">
        {form}
      </header>
    </div>
    );
}