import React, {useState, useReducer} from 'react'
import { Button, Modal, Form, Input, TextArea, Message } from 'semantic-ui-react';

function reducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

function ModalAgregar() {

  const [empresa, guardarEmpresa] = useState({
    nombre: '',
    fecha_constitucion: '',
    tipo: '',
    comentarios: ''
  });
  const {nombre, fecha_constitucion, tipo, comentarios} = empresa;

  const [exito, setExito] =  useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);
  const [errorTipo, setErrorTipo] = useState(false);
  const [errores, setErrores] = useState([]);
  

  const [state, dispatch] = useReducer(reducer, {
    centered: false,
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

  const onChange = e => {
    guardarEmpresa({
      ...empresa,
      [e.target.name] : e.target.value
    });
  }

  const limpiarCampos = () => {
    guardarEmpresa({
      nombre: '',
      fecha_constitucion: '',
      tipo: '',
      comentarios: ''
    })
  }

  const mostrarE = msg => {
    setErrores([...errores, msg])
  }

  function onSubmitAgregar ()  {
    const err = [];
    if(nombre.trim() ==='') {
        const msgName = { err: 'El nombre de la empresa es obligatorio'};
        err.push(msgName);
        setErrorNombre(true);
        setTimeout(() => {
          setErrorNombre(false)
        }, 2000);
        
        limpiarCampos();
        return;
    }
    if(fecha_constitucion.trim() ==='') {
      const msgFec = { err: 'La fecha de constitucion es obligatoria'};
      err.push(msgFec);
      setErrorFecha(true);
      setTimeout(() => {
        setErrorFecha(false)
      }, 2000);
      console.log(err);
      limpiarCampos();
      return;
    }
    if(tipo.trim() ==='') {
      const msgTipo = { err: 'El tipo de empresa es obligatorio'};
      err.push(msgTipo);
      setErrorTipo(true);
      setTimeout(() => {
        setErrorTipo(false)
      }, 2000);
      limpiarCampos();
      return;
    }
    mostrarE(err);
    console.log(errores);
    if (err.length === 0) {
      agregarEmpresa(empresa);
      setExito(true);
      setTimeout(() => {
        dispatch({ type: 'CLOSE_MODAL' })
        setExito(false);
      }, 2000);
      window.location.reload();
      setErrorNombre(false);
      setErrorFecha(false);
      setErrorTipo(false);
      limpiarCampos();
    } 
  }

  const agregarEmpresa = async empresa => {
    try {
      console.log(JSON.stringify(empresa));
      const url = 'http://localhost:3001/crearEmpresas';
      const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(empresa),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const resultado = await respuesta.json();
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button primary align='center' size='large' onClick={() => dispatch({ type: 'OPEN_MODAL' })}>Agregar Empresa</Button>


      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        style={{top: '10%'}}
      >
        <Modal.Header>Agregar Empresa</Modal.Header>
        
        <Modal.Content>
          {errorNombre ? <Message color='red'>Hubo un error en el Nombre de la empresa</Message> : null}
          {errorFecha ? <Message color='red'>Hubo un error en la Fecha de constitución</Message> : null}
          {errorTipo ? <Message color='red'>Hubo un error en el Tipo de empresa</Message> : null}
          {exito ? <Message color='green'>La empresa se agrego correctamente</Message> : null}
          <Form>
            <Form.Field required>
              <label>Nombre</label>
              <Input placeholder='Nombre de la empresa' onChange={onChange} type='text' name='nombre' value={nombre}/>
            </Form.Field>
            <Form.Field required>
              <label>Fecha de constitucion</label>
              <Input placeholder='Fecha de creacion' onChange={onChange} type='date' name='fecha_constitucion' value={fecha_constitucion}/>
            </Form.Field>
            <Form.Field required>
              <label>Tipo de empresa</label>
              <select name='tipo' onChange={onChange}>
                <option disable='true' value="" selected>Seleccione</option>
                <option value="Distribuidor">Distribuidor</option>
                <option value="Mayorista">Mayorista</option>
                <option value="Usuario Final">Usuario Final</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Comentarios</label>
              <TextArea placeholder='Excelente servicio' onChange={onChange} type='textArea' name='comentarios' value={comentarios}/>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Cancelar
          </Button>
          <Button positive onClick={() => onSubmitAgregar()}>
            Agregar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ModalAgregar;
