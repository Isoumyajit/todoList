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
              />{" "}
              Todo List Maker
            </Navbar.Brand>
            <button className=" bg-yellow-200 items-center pl-2 pr-2 pt-1 pb-1 rounded-lg hover:scale-105 duration-200 hover:bg-yellow-300">
              {" "}
              Sign In
            </button>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default header
