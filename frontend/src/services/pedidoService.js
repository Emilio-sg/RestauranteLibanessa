const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const crearPedido = async (pedido, token) => {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(pedido)
  });
  return res.json();
};
