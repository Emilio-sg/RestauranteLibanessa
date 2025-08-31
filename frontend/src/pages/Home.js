


import React, { useEffect, useState, useContext } from 'react';
import { getMenus } from '../services/menuService';
import { CartContext } from '../context/CartContext';
import '../styles/libanessa.css';


const Home = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);


  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    getMenus().then(data => {
      setMenus(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div
        className="header-bg-libanessa mb-4"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/imagenLibanessa.jpg)` }}
      >
        <img src={`${process.env.PUBLIC_URL}/imagenLibanessa.jpg`} alt="Logo Libanessa" className="logo-libanessa" />
      </div>
      <div className="container mt-3">
        <h2>Bienvenido a Restaurante Libanessa</h2>
        <p>Elige entre nuestros menús:</p>
        {loading ? (
          <div>Cargando menús...</div>
        ) : (
          <div className="row">
            {menus.length === 0 && <div>No hay menús disponibles.</div>}
            {menus.map(menu => (
            <div className="col-md-4 mb-4" key={menu._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{menu.nombre}</h5>
                  <p className="card-text">{menu.detalle}</p>
                  <p className="card-text"><strong>Categoría:</strong> {menu.categoria}</p>
                  <p className="card-text"><strong>Precio:</strong> ${menu.precio}</p>
                  <button className="btn btn-success mt-2 w-100" onClick={() => addToCart(menu)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
