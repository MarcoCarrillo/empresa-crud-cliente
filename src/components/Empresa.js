import React from 'react';
import { Table, Message, Grid, Button, Icon } from 'semantic-ui-react';

function Empresa({registro}) {
    return(
        <Table.Row>
                <Table.Cell textAlign='center'>{registro.nombre}</Table.Cell>
                <Table.Cell textAlign='center'>{registro.tipo_empresa}</Table.Cell>
                <Table.Cell textAlign='center'>{registro.fecha_constitucion}</Table.Cell>
                <Table.Cell textAlign='center'>
                <Button.Group size='medium'>
                <Button color='yellow' animated='fade'>
                    <Button.Content hidden>Editar</Button.Content>
                    <Button.Content visible>
                        <Icon name='pencil' />
                    </Button.Content>
                </Button>
                <Button color='red' animated='fade'>
                    <Button.Content hidden>Eliminar</Button.Content>
                    <Button.Content visible>
                        <Icon name='trash' />
                    </Button.Content>
                </Button>
                </Button.Group>
                </Table.Cell>
            </Table.Row>
    );
}

export default Empresa;