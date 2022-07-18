import React, {useState} from 'react'
import { Message, Input, Button, Modal, Icon } from 'semantic-ui-react'

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

function ModalEliminar({registro}) {

  const [exito, setExito] =  useState(false);

  const [state, dispatch] = React.useReducer(reducer, {
    centered: false,
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

  const onClickEliminar = async id => {
    try {
      const url = `http://localhost:3001/eliminarEmpresa/${id}`;
      const respuesta = await fetch(url, {
        method: 'DELETE'
      })
      const resultado = await respuesta.json();
      setExito(true);
      setTimeout(() => {
        setExito(false);
        dispatch({ type: 'CLOSE_MODAL' })
      }, 4000);
      window.location.reload();
      console.log(resultado);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div>
        <Button style={{marginRight: '5px'}} color='red' animated='fade' onClick={() => dispatch({ type: 'OPEN_MODAL' })}>
            <Button.Content hidden>Eliminar</Button.Content>
                    <Button.Content visible>
                        <Icon name='trash' />
            </Button.Content>
        </Button>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        style={{top: '10%'}}
      >
        <Modal.Header>Eliminar Empresa</Modal.Header>
        
        <Modal.Content>
        {exito ? <Message color='green'>La empresa se eliminó correctamente</Message> : <p>¿Estás seguro que deseas eliminar esta empresa </p>}
          
        </Modal.Content>
        <Modal.Actions>
          <Button color='yellow' onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
            Cancelar
          </Button>
          <Button negative onClick={() => onClickEliminar(registro.id)}>
            Eliminar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ModalEliminar;
