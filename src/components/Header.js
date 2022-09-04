import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

export class header extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src=""
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Todo List Maker
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>
    )
  }
}

export default header
