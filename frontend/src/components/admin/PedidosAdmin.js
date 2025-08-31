
import React, { useEffect, useState } from 'react';
import { getPedidos, cambiarEstadoPedido } from '../../services/pedidoAdminService';

const PedidosAdmin = () => {
	const [pedidos, setPedidos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [mensaje, setMensaje] = useState('');
	const [error, setError] = useState('');
	const token = localStorage.getItem('token');

	const cargarPedidos = () => {
		setLoading(true);
		getPedidos(token).then(data => {
			setPedidos(data);
			setLoading(false);
		});
	};

	useEffect(() => {
		cargarPedidos();
		// eslint-disable-next-line
	}, []);

	const handleEstado = async (id, estado) => {
		setMensaje(''); setError('');
		const res = await cambiarEstadoPedido(id, estado, token);
		if (res._id) {
			setMensaje('Estado actualizado');
			cargarPedidos();
		} else {
			setError(res.error || 'Error al actualizar estado');
		}
	};

	return (
		<div>
			<h5>Listado de pedidos</h5>
			{mensaje && <div className="alert alert-success">{mensaje}</div>}
			{error && <div className="alert alert-danger">{error}</div>}
			{loading ? <div>Cargando...</div> : (
				<table className="table table-sm">
					<thead>
						<tr>
							<th>Usuario</th>
							<th>Fecha</th>
							<th>Menús</th>
							<th>Estado</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{pedidos.map(p => (
							<tr key={p._id}>
								<td>{p.usuario?.nombre || 'Sin usuario'}</td>
								<td>{new Date(p.fecha).toLocaleString()}</td>
								<td>
									<ul className="mb-0">
										{p.menu.map(m => <li key={m._id}>{m.nombre}</li>)}
									</ul>
								</td>
								<td>{p.estado}</td>
								<td>
									{p.estado === 'pendiente' && (
										<button className="btn btn-success btn-sm" onClick={() => handleEstado(p._id, 'realizado')}>
											Marcar como realizado
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

export default PedidosAdmin;
