import React, {useState, useReducer} from 'react'
import {Button, Modal, Form, Input, TextArea, Message, Icon} from 'semantic-ui-react'

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

function ModalEditar({registro}) {

  const [exito, setExito] =  useState(false);
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorFecha, setErrorFecha] = useState(false);
  const [errorTipo, setErrorTipo] = useState(false);
  const [errores, setErrores] = useState([]);

  const [empresa, guardarEmpresa] = useState({
    nombre: '',
    fecha_constitucion: '',
    tipo: '',
    comentarios: ''
  });
  const {nombre, fecha_constitucion, tipo, comentarios} = empresa;

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

  const editarEmpresa = async (empresa) => {
    try {
      console.log(JSON.stringify(empresa));
      const url = `http://localhost:3001/editarEmpresa/${registro.id}`;
      const respuesta = await fetch(url, {
        method: 'PUT',
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

  const onSubmitEditar = () => {
    const err = [];
    if(nombre.trim() ==='') {
        const msgName = { err: 'El nombre de la empresa es obligatorio'};
        err.push(msgName);
        setErrorNombre(true);
        setTimeout(() => {
          setErrorNombre(false)
        }, 3000);
        return;
    }
    if(fecha_constitucion.trim() ==='') {
      const msgFec = { err: 'La fecha de constitucion es obligatoria'};
      err.push(msgFec);
      setErrorFecha(true);
      setTimeout(() => {
        setErrorFecha(false)
      }, 3000);
      return;
    }
    if(tipo.trim() ==='') {
      const msgTipo = { err: 'El tipo de empresa es obligatorio'};
      err.push(msgTipo);
      setErrorTipo(true);
      setTimeout(() => {
        setErrorTipo(false)
      }, 3000);
      return;
    }
    console.log(errores);
    if (err.length === 0) {
    console.log(empresa);  
    editarEmpresa(empresa);
      
      setExito(true);
      setTimeout(() => {
        dispatch({ type: 'CLOSE_MODAL' })
        setExito(false);
      }, 4000);
      window.location.reload();
      setErrorNombre(false);
      setErrorFecha(false);
      setErrorTipo(false);
    } 
  }

  return (
    <div>
        <Button style={{marginRight: '5px'}} color='yellow' animated='fade' onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
            <Button.Content hidden>Editar</Button.Content>
                    <Button.Content visible>
                        <Icon name='pencil' />
            </Button.Content>
        </Button>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        style={{top: '10%'}}
      >
        <Modal.Header>Editar Empresa</Modal.Header>
        <Modal.Content>
        {errorNombre ? <Message color='red'>Hubo un error en el Nombre de la empresa</Message> : null}
          {errorFecha ? <Message color='red'>Hubo un error en la Fecha de constitución</Message> : null}
          {errorTipo ? <Message color='red'>Hubo un error en el Tipo de empresa</Message> : null}
          
        <Form>
            <Form.Field required>
              <label>Nombre</label>
              <h5 style={{marginTop:'10px'}}>Anterior</h5>
              <Input onChange={onChange} disabled={true} type='text' name='nombre' value={registro.nombre}/>
              <h5 style={{marginTop:'5px'}}>Nuevo</h5>
              <Input onChange={onChange} type='text' name='nombre' value={nombre}/>
            </Form.Field>
            <Form.Field required>
              <label>Fecha de constitucion</label>
              <h5 style={{marginTop:'5px'}}>Anterior</h5>
              <Input onChange={onChange} type='text' disabled={true} name='fecha_constitucion' value={registro.fecha_constitucion}/>
              <h5 style={{marginTop:'5px'}}>Nuevo</h5>
              <Input onChange={onChange} type='date' name='fecha_constitucion' value={fecha_constitucion}/>
              
            </Form.Field>
            <Form.Field required>
              <label>Tipo de empresa</label>
              <h5 style={{marginTop:'5px'}}>Anterior</h5>
              <select disabled={true} name='tipo' onChange={onChange} value={registro.tipo}>
                <option disable='true' value="" selected>Seleccione</option>
                <option value="Distribuidor">Distribuidor</option>
                <option value="Mayorista">Mayorista</option>
                <option value="Usuario Final">Usuario Final</option>
              </select>
              <h5 style={{marginTop:'5px'}}>Nuevo</h5>
              <select name='tipo' onChange={onChange} value={tipo}>
                <option disable='true' value="" selected>Seleccione</option>
                <option value="Distribuidor">Distribuidor</option>
                <option value="Mayorista">Mayorista</option>
                <option value="Usuario Final">Usuario Final</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Comentarios</label>
              <h5 style={{marginTop:'5px'}}>Anterior</h5>
              <TextArea disabled={true} onChange={onChange} type='textArea' name='comentarios' value={registro.comentarios}/>
              <h5 style={{marginTop:'5px'}}>Nuevo</h5>
              <TextArea onChange={onChange} type='textArea' name='comentarios' value={comentarios}/>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Cancelar
          </Button>
          <Button positive onClick={() => onSubmitEditar()}>
            Editar
          </Button>
        </Modal.Actions>
        {exito ? <Message color='green'>La empresa se edito correctamente</Message> : null}
      </Modal>
    </div>
  )
}

export default ModalEditar;
