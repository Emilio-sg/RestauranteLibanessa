const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getUsuarios = async (token) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};

export const crearUsuario = async (usuario, token) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(usuario)
  });
  return res.json();
};

export const inactivarUsuario = async (id, token) => {
  const res = await fetch(`${API_URL}/usuarios/${id}/inactivar`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};
