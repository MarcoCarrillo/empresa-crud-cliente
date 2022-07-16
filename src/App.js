import React from 'react';
import { Grid, Header, Icon, Card, Segment, Button  } from 'semantic-ui-react';
import ListaEmpresas from './components/ListaEmpresas'

function App() {
  return (
    <Grid container style={{ padding: '3em 0em' }}> 
      <Grid.Row>
        <Grid.Column >
          <Header  as='h1' dividing>
            <Icon name='building outline'/>
            Reto Técnico CRUD Empresas
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Segment style={{marginBottom: '30px'}} align='center'>
            <Card  fluid color='blue' header='Nueva empresa' />
            <Button primary align='center' size='large'>Agregar empresa</Button>
          </Segment>
          <Segment  align='center'>
            <Card fluid color='green' header='Lista de empresas' />
            <ListaEmpresas />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    );
}

export default App;
