
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/libanessa.css';


const Navbar = () => {
  /*const navigate = useNavigate();*/
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={`${process.env.PUBLIC_URL}/imagenLibanessa.jpg`} alt="Logo" className="logo-libanessa me-2" style={{width: 40, height: 40}} />
          Libanessa
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/pedidos">Mis Pedidos</Link>
              </li>
            )}
            {user && user.rol === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/registro">Registro</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Salir</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
