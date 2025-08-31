
import React, { useEffect, useState } from 'react';
import { getUsuarios, crearUsuario, inactivarUsuario } from '../../services/usuarioService';

const UsuariosAdmin = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [loading, setLoading] = useState(true);
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');

	const token = localStorage.getItem('token');

	const cargarUsuarios = () => {
		setLoading(true);
		getUsuarios(token).then(data => {
			setUsuarios(data);
			setLoading(false);
		});
	};

	useEffect(() => {
		cargarUsuarios();
		// eslint-disable-next-line
	}, []);

	const handleCrear = async (e) => {
		e.preventDefault();
		setMensaje(''); setError('');
		const res = await crearUsuario({ nombre, email, password }, token);
		if (res._id) {
			setMensaje('Usuario creado');
			setNombre(''); setEmail(''); setPassword('');
			cargarUsuarios();
		} else {
			setError(res.error || 'Error al crear usuario');
		}
	};

	const handleInactivar = async (id) => {
		setMensaje(''); setError('');
		const res = await inactivarUsuario(id, token);
		if (res._id) {
			setMensaje('Usuario inactivado');
			cargarUsuarios();
		} else {
			setError(res.error || 'Error al inactivar usuario');
		}
	};

	return (
		<div>
			<h5>Alta de usuario</h5>
			<form className="row g-2 mb-4" onSubmit={handleCrear} style={{maxWidth: 400}}>
				<div className="col-12">
					<input className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
				</div>
				<div className="col-12">
					<input className="form-control" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div className="col-12">
					<input className="form-control" placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<div className="col-12">
					<button className="btn btn-primary w-100" type="submit">Crear usuario</button>
				</div>
			</form>
			{mensaje && <div className="alert alert-success">{mensaje}</div>}
			{error && <div className="alert alert-danger">{error}</div>}
			<h5>Listado de usuarios</h5>
			{loading ? <div>Cargando...</div> : (
				<table className="table table-sm">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Email</th>
							<th>Estado</th>
							<th>Rol</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{usuarios.map(u => (
							<tr key={u._id}>
								<td>{u.nombre}</td>
								<td>{u.email}</td>
								<td>{u.estado ? 'Activo' : 'Inactivo'}</td>
								<td>{u.rol}</td>
								<td>
									{u.estado && (
										<button className="btn btn-danger btn-sm" onClick={() => handleInactivar(u._id)}>
											Inactivar
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default UsuariosAdmin;
