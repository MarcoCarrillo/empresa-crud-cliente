import React, { useState, useReducer } from 'react';
import { Table, Icon, Form, Button, Modal } from 'semantic-ui-react';
import ModalEditar from './ModalEditar';
import ModalEliminar from './ModalEliminar';

function Empresa({registro}) {


    const [modalEditar, setModalEditar] = useState(false);

    const [empresaSeleccionada, setEmpresaSeleccionada] = useState({
        nombre: '',
        fecha_constitucion: '',
        tipo: '',
        comentarios: ''
    });

    const seleccionarEmpresa = (empresa, modal) => {
        setEmpresaSeleccionada(empresa);
        (modal === 'Editar' ? setModalEditar(true) : setModalEditar(false));
    }

    return(
        <Table.Row>
            <Table.Cell textAlign='center'>{registro.nombre}</Table.Cell>
            <Table.Cell textAlign='center'>{registro.tipo}</Table.Cell>
            <Table.Cell textAlign='center'>{registro.fecha_constitucion}</Table.Cell>
            <Table.Cell textAlign='center'>
            <Button.Group size='medium'>
                
                <ModalEditar 
                    registro={registro}                
                />
                <ModalEliminar 
                    registro={registro}
                />
            </Button.Group>
            </Table.Cell>
        </Table.Row>
        
    );
}

export default Empresa;