import React, {useState} from 'react';
import { Table, Message, Grid, Button, Icon } from 'semantic-ui-react';
import Empresa from './Empresa';

function ListaEmpresas(){

    const data = [
        {id: '1', nombre: 'Amazon', fecha_constitucion: '02/07/1990', tipo_empresa: 'Distribuidor', comentarios: 'Muy buena empresa'},
        {id: '2', nombre: 'Mercado Libre', fecha_constitucion: '02/07/1990', tipo_empresa: 'Mayorista', comentarios: 'Muy buena empresa'},
        {id: '3', nombre: 'Walmart', fecha_constitucion: '02/07/1990', tipo_empresa: 'Usuario Final', comentarios: 'Muy buena empresa'}
    ];

    console.log(data);
    if(data.length === 0 || data === undefined){
        return (<Message warning>Sin Empresas...</Message>);
    }

    return(
    <Table celled selectable>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign='center'>Nombre</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Tipo de empresa</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Fecha de constitución</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Acciones</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {data.map(registro => {
                return (
                    <Empresa 
                        key={registro.id}
                        registro={registro}
                    />
                );
            })}
      
        </Table.Body>
  </Table>
    );
}

export default ListaEmpresas;