
import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { crearPedido } from '../services/pedidoService';

const Pedidos = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useContext(CartContext);

  const decreaseQty = (item) => {
    if (item.qty <= 1) {
      removeFromCart(item._id);
    } else {
      // Disminuir cantidad
      addToCart({ ...item, qty: -1, decrease: true });
    }
  };
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
        setMensaje('Gracias por tu compra, que disfrutes! 😊');
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
      {mensaje ? (
        <div className="alert alert-success">{mensaje}</div>
      ) : cart.length === 0 ? (
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
                  <td>
                    <button
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={() => decreaseQty(item)}
                      title="Quitar uno"
                    >
                      -
                    </button>
                    {item.qty}
                    <button
                      className="btn btn-outline-primary btn-sm ms-2"
                      onClick={() => addToCart(item)}
                      title="Agregar uno más"
                    >
                      +
                    </button>
                  </td>
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
