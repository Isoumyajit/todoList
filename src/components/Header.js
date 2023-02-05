import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/esm/Button'
export class header extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="to-do-list.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Todo List Maker
            </Navbar.Brand>
            <Button style={{ borderRadius: '50px', backgroundColor: 'green' }}>
              Sign Out
            </Button>
          </Container>
        </Navbar>
      </>
    )
  }
}

export default header
