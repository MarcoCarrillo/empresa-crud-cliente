import React, { useState, useReducer } from 'react';
import { Table, Icon, Form, Button, Modal } from 'semantic-ui-react';
import ModalEditar from './ModalEditar';
import ModalEliminar from './ModalEliminar';

function Empresa({registro}) {

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