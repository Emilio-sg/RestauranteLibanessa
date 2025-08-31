const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getPedidos = async (token) => {
  const res = await fetch(`${API_URL}/pedidos`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const cambiarEstadoPedido = async (id, estado, token) => {
  const res = await fetch(`${API_URL}/pedidos/${id}/estado`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ estado })
  });
  return res.json();
};
