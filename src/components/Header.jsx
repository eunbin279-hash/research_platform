import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

function Header({ onShowModal }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">수요조사 플랫폼</Navbar.Brand>
        <Button variant="outline-primary" onClick={onShowModal}>새 수요조사 추가</Button>
      </Container>
    </Navbar>
  );
}

export default Header;
