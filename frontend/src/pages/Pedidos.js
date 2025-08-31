
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { crearPedido } from '../services/pedidoService';

const Pedidos = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.precio * item.qty, 0);

  const handlePedido = async () => {
    setLoading(true);
    setMensaje('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const pedido = {
        usuario: user.id,
        menu: cart.map(item => item._id),
      };
      const res = await crearPedido(pedido, token);
      if (res._id) {
        setMensaje('¡Pedido realizado con éxito!');
        clearCart();
      } else {
        setError(res.error || 'Error al realizar el pedido');
      }
    } catch (e) {
      setError('Error al realizar el pedido');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h2>Mi Carrito</h2>
      {cart.length === 0 ? (
        <div>No hay menús en el carrito.</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id}>
                  <td>{item.nombre}</td>
                  <td>{item.qty}</td>
                  <td>${item.precio * item.qty}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Total: ${total}</h4>
          {mensaje && <div className="alert alert-success">{mensaje}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary" onClick={handlePedido} disabled={loading}>
            {loading ? 'Enviando...' : 'Hacer pedido'}
          </button>
        </>
      )}
    </div>
  );
};

export default Pedidos;
