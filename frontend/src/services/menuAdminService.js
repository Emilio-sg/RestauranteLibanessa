const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getMenus = async () => {
  const res = await fetch(`${API_URL}/menus`);
  return res.json();
};

export const crearMenu = async (menu, token) => {
  const res = await fetch(`${API_URL}/menus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(menu)
  });
  return res.json();
};

export const editarMenu = async (id, menu, token) => {
  const res = await fetch(`${API_URL}/menus/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(menu)
  });
  return res.json();
};

export const eliminarMenu = async (id, token) => {
  const res = await fetch(`${API_URL}/menus/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};
