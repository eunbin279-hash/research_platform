import React from 'react';
import { Navbar, Container, Button, Nav } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

function Header({ onShowModal }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">수요조사 플랫폼</Navbar.Brand>
        {currentUser && <Button variant="outline-primary" onClick={onShowModal}>새 수요조사 추가</Button>}
        <Nav className="ms-auto">
          {currentUser ? (
            <>
              <Nav.Item className="me-3">
                <Navbar.Text>Signed in as: {currentUser.email}</Navbar.Text>
              </Nav.Item>
              <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button as={Link} to="/login" variant="outline-success">Login</Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
