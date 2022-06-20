import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



const url="http://castrowebapi.somee.com/api/Ordens";

class Crud extends Component{


state={
    data:[],
    modalInsertar: false,
  modalEliminar: false,
  form:{
    or_id:"",
    or_noSerie: "",
    or_precio: 0,
    or_propietario: "",
    or_fecha: "dia/mes/año",
    or_modelo: "",
    or_marca: "",
    or_detalles: "",
    or_nombreE: ""
  }
  }


  
////////////////GET.UPDATE.POST.PUT
peticionGet=()=>{
  axios.get(url).then(response=>{
    console.log(response.data);
    this.setState({data: response.data});
  }).catch(error=>{
    console.log(error.message);
  })
  }

  peticionPost=async()=>{
    await axios.post(url,this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }


  peticionPut=()=>{
    axios.put(url+"/"+this.state.form.or_id, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }
  
  peticionDelete=()=>{
    axios.delete(url+"/"+this.state.form.or_id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

////////////////GET.UPDATE.POST.PUT


seleccionarEquipo=(ordenes)=>{
  this.setState({
    tipoModal: 'actualizar',
    form:{
      or_id: ordenes.or_id,
      or_noSerie:  ordenes.or_noSerie,
      or_precio: ordenes.or_precio,
      or_propietario:  ordenes.or_propietario,
      or_fecha:  ordenes.or_fecha,
      or_modelo:  ordenes.or_modelo,
      or_marca:  ordenes.or_marca,
      or_detalles:  ordenes.or_detalles,
      or_nombreE:  ordenes.or_nombreE
    }
  })
}




  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }


  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }
    componentDidMount() {
      this.peticionGet();
    }
    
   
    render(){
      const {form}=this.state;
        return(
          <div className="cont-tabla">
          <br />
          <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Equipo a Reparar</button>
        <br /><br />
          <table>
            <thead>
              <tr>
              <th>Numero de serie</th>
                <th>color</th>
                <th>precio</th>
                <th>propietario</th>
                
                <th>modelo</th>
                <th>marca</th>
                <th>detalles</th>
                <th>nombre del equipo</th>
                <th>editar</th>
                <th>eliminar</th>
              </tr>
            </thead>
            <tbody>
            {this.state.data.map(ordenes=>{
          return(
            <tr>
          <td>{ordenes.or_id}</td>
          <td>{ordenes.or_noSerie}</td>
          <td>{ordenes.or_precio}</td>
          <td>{ordenes.or_propietario}</td>
          
          <td>{ordenes.or_modelo}</td>
          <td>{ordenes.or_marca}</td>
          <td>{ordenes.or_detalles}</td>
          <td>{ordenes.or_nombreE}</td>
          
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarEquipo(ordenes); this.modalInsertar()}}>Edit</button>
             
                </td>
                <td>
               
                
                <button className="btn btn-danger" onClick={()=>{this.seleccionarEquipo(ordenes); this.setState({modalEliminar: true})}}>eliminar</button>
                </td> 
         
          </tr>
          )
        })}
            </tbody>
          </table>


          <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}}  onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">Numero de serie</label>
                    <input className="form-control" type="text" name="or_id" id="or_id" onChange={this.handleChange} value={form?form.or_id: ''}/>
                    <br />
                    <label htmlFor="propietario">Propietario</label>
                    <input className="form-control" type="text" name="or_propietario" id="or_propietario" onChange={this.handleChange} value={form?form.or_propietario: ''}/>
                    <br />
                    <label htmlFor="precio">precio</label>
                    <input className="form-control" type="text" name="or_precio" id="or_precio" onChange={this.handleChange} value={form?form.or_precio: ''}/>
                    <br />
                    <label htmlFor="nombreE">Nombre del equipo</label>
                    <input className="form-control" type="text" name="or_nombreE" id="or_nombreE" onChange={this.handleChange} value={form?form.or_nombreE: ''} />
                    <br />
                    <label htmlFor="modelo">Modelo</label>
                    <input className="form-control" type="text" name="or_modelo" id="or_modelo" onChange={this.handleChange} value={form?form.or_modelo: ''} />
                    <br />
                    <label htmlFor="noSerie">Color</label>
                    <input className="form-control" type="text" name="or_noSerie" id="or_noSerie" onChange={this.handleChange} value={form?form.or_noSerie: ''} />
                    <br />
                    <label htmlFor="marca">Marca</label>
                    <input className="form-control" type="text" name="or_marca" id="or_marca" onChange={this.handleChange} value={form?form.or_marca: ''}/>
                    <br />
                    <label htmlFor="detalles">detalles</label>
                    <input className="form-control" type="text" name="or_detalles" id="or_detalles" onChange={this.handleChange} value={form?form.or_detalles: ''}/>
                    <br />
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el equipo  {form && form.or_nombreE}
               {"  "}
               del propietario  {form && form.or_propietario}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
          
        </div>
        );

    }
}

export default Crud