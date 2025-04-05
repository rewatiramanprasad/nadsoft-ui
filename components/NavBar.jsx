import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'

function NavBar({ AddModalShow, setAddModalShow }) {
  return (
    <Navbar expand="lg" className="justify-between">
      <Container>
        <Navbar.Brand className="text-uppercase fs-2 fw-bold">NadSoft</Navbar.Brand>
        <Button
          onClick={() => {
            setAddModalShow(!AddModalShow)
          }}
        >
          Add Student
        </Button>
      </Container>
    </Navbar>
  )
}

export default NavBar
