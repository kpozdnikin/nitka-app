import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './App.scss';

const App: React.FC = () => {

  function submit() {

  }

  return (
    <div className="app">
      <header className="app-header">Welcome to Nitka test app!</header>
      <div className="app-body">
        <div className="initial-form">
          <Form onSubmit={submit}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Please type some text here</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
