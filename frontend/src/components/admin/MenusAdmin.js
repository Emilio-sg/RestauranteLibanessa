
import React, { useEffect, useState } from 'react';
import { getMenus, crearMenu, editarMenu, eliminarMenu } from '../../services/menuAdminService';

const MenusAdmin = () => {
	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(true);
	const [form, setForm] = useState({ nombre: '', precio: '', detalle: '', categoria: '' });
	const [editId, setEditId] = useState(null);
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');
	const token = localStorage.getItem('token');

	const cargarMenus = () => {
		setLoading(true);
		getMenus().then(data => {
			setMenus(data);
			setLoading(false);
		});
	};

	useEffect(() => {
		cargarMenus();
	}, []);

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setMensaje(''); setError('');
		if (editId) {
			const res = await editarMenu(editId, form, token);
			if (res._id) {
				setMensaje('Menú editado');
				setEditId(null);
				setForm({ nombre: '', precio: '', detalle: '', categoria: '' });
				cargarMenus();
			} else {
				setError(res.error || 'Error al editar menú');
			}
		} else {
			const res = await crearMenu(form, token);
			if (res._id) {
				setMensaje('Menú creado');
				setForm({ nombre: '', precio: '', detalle: '', categoria: '' });
				cargarMenus();
			} else {
				setError(res.error || 'Error al crear menú');
			}
		}
	};

	const handleEdit = menu => {
		setEditId(menu._id);
		setForm({ nombre: menu.nombre, precio: menu.precio, detalle: menu.detalle, categoria: menu.categoria });
	};

	const handleDelete = async id => {
		setMensaje(''); setError('');
		const res = await eliminarMenu(id, token);
		if (res.message) {
			setMensaje('Menú eliminado');
			cargarMenus();
		} else {
			setError(res.error || 'Error al eliminar menú');
		}
	};

	return (
		<div>
			<h5>{editId ? 'Editar menú' : 'Alta de menú'}</h5>
			<form className="row g-2 mb-4" onSubmit={handleSubmit} style={{maxWidth: 500}}>
				<div className="col-md-6">
					<input className="form-control" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
				</div>
				<div className="col-md-6">
					<input className="form-control" name="precio" placeholder="Precio" type="number" value={form.precio} onChange={handleChange} required />
				</div>
				<div className="col-md-6">
					<input className="form-control" name="categoria" placeholder="Categoría" value={form.categoria} onChange={handleChange} />
				</div>
				<div className="col-md-6">
					<input className="form-control" name="detalle" placeholder="Detalle" value={form.detalle} onChange={handleChange} />
				</div>
				<div className="col-12">
					<button className="btn btn-primary w-100" type="submit">{editId ? 'Guardar cambios' : 'Crear menú'}</button>
					{editId && <button className="btn btn-secondary w-100 mt-2" type="button" onClick={() => { setEditId(null); setForm({ nombre: '', precio: '', detalle: '', categoria: '' }); }}>Cancelar</button>}
				</div>
			</form>
			{mensaje && <div className="alert alert-success">{mensaje}</div>}
			{error && <div className="alert alert-danger">{error}</div>}
			<h5>Listado de menús</h5>
			{loading ? <div>Cargando...</div> : (
				<table className="table table-sm">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Precio</th>
							<th>Categoría</th>
							<th>Detalle</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{menus.map(menu => (
							<tr key={menu._id}>
								<td>{menu.nombre}</td>
								<td>${menu.precio}</td>
								<td>{menu.categoria}</td>
								<td>{menu.detalle}</td>
								<td>
									<button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(menu)}>Editar</button>
									<button className="btn btn-danger btn-sm" onClick={() => handleDelete(menu._id)}>Eliminar</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default MenusAdmin;
