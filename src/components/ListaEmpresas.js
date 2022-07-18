import React, {useEffect, useState} from 'react';
import { Table, Message, Loader } from 'semantic-ui-react';
import Empresa from './Empresa';

function ListaEmpresas(){

    const [empresas, setEmpresas] = useState([{}]);
    const [cargando, setCargando] = useState(false);

    const obtenerEmpresas = async () => {
        try {
            setCargando(true);
            const url = 'http://localhost:3001/obtenerEmpresas';
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            setEmpresas(resultado);
            setCargando(false);
            console.log(resultado);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        obtenerEmpresas();
    }, [])

    if(empresas.length === 0 || empresas === undefined){
        return (<Message warning>Sin Empresas...</Message>);
    }

    return(
    <div>
        {cargando ? <Loader active inline='centered' /> : 
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
                {empresas.map(registro => {
                    return (
                        <Empresa 
                            key={registro.id}
                            registro={registro}
                        />
                    );
                })}
            </Table.Body>
        </Table> 

        }
    </div>
    
  
    );
}

export default ListaEmpresas;