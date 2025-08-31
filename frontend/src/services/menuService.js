const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getMenus = async () => {
  const res = await fetch(`${API_URL}/menus`);
  return res.json();
};
