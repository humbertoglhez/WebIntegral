import axios from "axios";
import React from "react";




const url="http://castrowebapi.somee.com/api/users";
class Usuarios extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            usuarios:[],
            claveU:"",
            correo:"",
            nombre:"",
            telefono:"",
            password:""
        
        };
        this.handleClaveU=this.handleClaveU.bind(this);
        this.handleTelefono=this.handleTelefono.bind(this);
        this.handleCorreo=this.handleCorreo.bind(this);
        this.handleNombre=this.handleNombre.bind(this);
        this.handlePassword=this.handlePassword.bind(this);

        this.GuardarDatos=this.GuardarDatos.bind(this);
        this.BorrarDatos=this.BorrarDatos.bind(this);
        this.EditarDatos=this.EditarDatos.bind(this);
        
    }
    
    handleClaveU(event){
        this.setState({claveU:event.target.value});
    }
    handleNombre(event){
        this.setState({nombre:event.target.value});
    }
    handleCorreo(event){
        this.setState({correo:event.target.value});
    }
    handleTelefono(event){
      this.setState({telefono:event.target.value});
  }


  handlePassword(event){
    this.setState({password:event.target.value});
}
    cargarDatos(){
        axios.get(url).then(Response=>{
            this.setState({usuarios: Response.data});
        })
    }
    
 
    BorrarDatos(){
        axios.delete(url+"/"+this.state.claveU).then(Response=>{
            this.cargarDatos();
        })
    }
    EditarDatos(){
        axios.put(url+"/"+this.state.claveU, {

            cli_cve:this.state.claveU,
            cli_nombre:this.state.nombre,
            cli_telefono:this.state.telefono,
            cli_correo:this.state.correo,
            cli_password:this.state.password

        }
       
        
        ).then(Response=>{
            this.cargarDatos();
           
        })
    }
    GuardarDatos(){
        let usuarios={
            cli_cve:this.state.claveU,
            cli_nombre:this.state.nombre,
            cli_telefono:this.state.telefono,
            cli_correo:this.state.correo,
            cli_password:this.state.password
        }
        console.log(usuarios);
        axios.post(url,usuarios).then(Response=>{
            this.cargarDatos();
            
        })
    }
    
    componentDidMount(){
        this.cargarDatos();
    }

   
    render(){
        return(
            <div className="cont-tabla">
                 <table >
                     <tr>
                         <td>ID:</td><td><input value={this.state.claveU} onChange={this.handleClaveU}/></td>
                     </tr>
                     <tr>
                         <td>NOMBRE:</td><td><input  value={this.state.nombre} onChange={this.handleNombre}/></td>
                     </tr>
                     <tr>
                         <td>CORREO:</td><td><input  value={this.state.correo} onChange={this.handleCorreo}/></td>
                     </tr>
                     <tr>
                         <td>TELEFONO:</td><td><input value={this.state.telefono} onChange={this.handleTelefono}/></td>
                     </tr>
                     <tr>
                         <td>CONTRASEÑA:</td><td><input  value={this.state.password} onChange={this.handlePassword}/></td>
                     </tr>
                     <tr>
                                        <td colSpan={2}>
                                            <button >Nuevo</button>
                                            {" "}
                                            <button onClick={this.EditarDatos}>Editar</button>
                                            {" "}
                                            <button onClick={this.GuardarDatos}>Guardar</button>
                                            {" "}
                                            <button onClick={this.BorrarDatos}>Borrar</button>
                                            {" "}
                                        </td>
                     </tr>
                 </table>
                 <table border='1' className="tabla">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Contraseña</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usuarios.map(users=>{
                                return(
                                    <tr>
                                        <td>{users.cli_cve}</td>
                                        <td>{users.cli_nombre}</td>
                                        <td>{users.cli_telefono}</td>
                                        <td>{users.cli_correo}</td>
                                        <td>{users.cli_password}</td>
                                    
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>


            </div>
        );

    }
}

export default Usuarios