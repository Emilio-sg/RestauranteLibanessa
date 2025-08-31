
import React, { useState } from 'react';
import UsuariosAdmin from '../components/admin/UsuariosAdmin';
import MenusAdmin from '../components/admin/MenusAdmin';
import PedidosAdmin from '../components/admin/PedidosAdmin';

const Admin = () => {
  const [tab, setTab] = useState('usuarios');

  return (
    <div className="container mt-5">
      <h2>Panel de Administración</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link${tab === 'usuarios' ? ' active' : ''}`} onClick={() => setTab('usuarios')}>Usuarios</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link${tab === 'menus' ? ' active' : ''}`} onClick={() => setTab('menus')}>Menús</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link${tab === 'pedidos' ? ' active' : ''}`} onClick={() => setTab('pedidos')}>Pedidos</button>
        </li>
      </ul>
      {tab === 'usuarios' && <UsuariosAdmin />}
      {tab === 'menus' && <MenusAdmin />}
      {tab === 'pedidos' && <PedidosAdmin />}
    </div>
  );
};

export default Admin;
