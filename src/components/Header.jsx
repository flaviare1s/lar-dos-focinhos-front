import { Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <Navbar bg='success' variant="success" expand="sm">
        <Container fluid>
          <Link to='/' className='text-decoration-none'>
              <h1 className='text-white'><span className="material-symbols-outlined">pets</span> Lar dos Focinhos</h1>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Link className="nav-link text-white" to='/clientes'>Clientes</Link>
              <Link className="nav-link text-white" to='/pets'>Pets</Link>
              <Link className="nav-link text-white" to='/reservas'>Reservas</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
