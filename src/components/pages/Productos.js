import axios from "axios";
import React from "react";




const url="http://castrowebapi.somee.com/api/productos";
class HolaMundo extends React.Component{
   
    constructor(props){
        super(props);
        this.state={
            productos:[],
            clave:"",
            marca:"",
            modelo:"",
            nombre:"",
            precio:0
        
        };
        this.handleClave=this.handleClave.bind(this);
        this.handleModelo=this.handleModelo.bind(this);
        this.handleMarca=this.handleMarca.bind(this);
        this.handleNombre=this.handleNombre.bind(this);
        this.handlePrecio=this.handlePrecio.bind(this);
        this.GuardarDatos=this.GuardarDatos.bind(this);
        this.BorrarDatos=this.BorrarDatos.bind(this);
        this.EditarDatos=this.EditarDatos.bind(this);
        
    }
    
    handleClave(event){
        this.setState({clave:event.target.value});
    }
    handleNombre(event){
        this.setState({nombre:event.target.value});
    }
    handlePrecio(event){
        this.setState({precio:event.target.value});
    }
    handleMarca(event){
      this.setState({marca:event.target.value});
  }


  handleModelo(event){
    this.setState({modelo:event.target.value});
}
    cargarDatos(){
        axios.get(url).then(Response=>{
            this.setState({productos: Response.data});
        })
    }
    
 
    BorrarDatos(){
        axios.delete(url+"/"+this.state.clave).then(Response=>{
            this.cargarDatos();
        })
    }
    EditarDatos(){
        axios.put(url+"/"+this.state.clave, {

            pro_cve:this.state.clave,
            pro_nombre:this.state.nombre,
            pro_modelo:this.state.modelo,
            pro_marca:this.state.marca,
            pro_precio:this.state.precio

        }
       
        
        ).then(Response=>{
            this.cargarDatos();
           
        })
    }
    GuardarDatos(){
        let producto={
            pro_cve:this.state.clave,
            pro_nombre:this.state.nombre,
            pro_modelo:this.state.modelo,
            pro_marca:this.state.marca,
            pro_precio:this.state.precio
        }
        //console.log(producto);
        axios.post(url,producto).then(Response=>{
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
                         <td>CLAVE:</td><td><input value={this.state.clave} onChange={this.handleClave}/></td>
                     </tr>
                     <tr>
                         <td>NOMBRE:</td><td><input  value={this.state.nombre} onChange={this.handleNombre}/></td>
                     </tr>
                     <tr>
                         <td>PRECIO:</td><td><input  value={this.state.precio} onChange={this.handlePrecio}/></td>
                     </tr>
                     <tr>
                         <td>MARCA:</td><td><input value={this.state.marca} onChange={this.handleMarca}/></td>
                     </tr>
                     <tr>
                         <td>MODELO:</td><td><input  value={this.state.Modelo} onChange={this.handleModelo}/></td>
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
                            <th>CLAVE</th>
                            <th>NOMBRE</th>
                            <th>PRECIO</th>
                            <th>MARCA</th>
                            <th>MODELO</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.productos.map(producto=>{
                                return(
                                    <tr>
                                        <td>{producto.pro_cve}</td>
                                        <td>{producto.pro_nombre}</td>
                                        <td>{producto.pro_precio}</td>
                                        <td>{producto.pro_marca}</td>
                                        <td>{producto.pro_modelo}</td>
                                    
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>


            </div>
        );

    }
}

export default HolaMundo