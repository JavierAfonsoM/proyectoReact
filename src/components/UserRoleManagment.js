import React from 'react';
import './MiLista.css'; //reutilizado

function UserRoleManagement({ usuarios, setUsuarios }) {

    const cambiarRol = async (usuario) => {
        // Definimos los dos objetos de rol según tu db.json
        const rolComun = {
            id: 1,
            nombre_rol: "comun",
            descripcion: "Usuario regular del sistema"
        };
        const rolAdmin = {
            id: 2,
            nombre_rol: "admin",
            descripcion: "Administrador del sistema con permisos totales"
        };

        // Decidimos cuál es el nuevo objeto según el actual
        const nuevoRol = usuario.rol.nombre_rol === "admin" ? rolComun : rolAdmin;

        try {
            const respuesta = await fetch(`http://localhost:3004/users/${usuario.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rol: nuevoRol }) // Enviamos el objeto completo
            });

            if (respuesta.ok) {
                // Actualizamos el estado en App.js para que se vea el cambio
                const usuariosActualizados = usuarios.map(u =>
                    u.id === usuario.id ? { ...u, rol: nuevoRol } : u
                );
                setUsuarios(usuariosActualizados);
                alert(`Rol de ${usuario.email} actualizado a ${nuevoRol.nombre_rol}`);
            }
        } catch (error) {
            console.error("Error al cambiar rol:", error);
        }
    };

    return (
        <div className="gestion-usuarios-container">
            <h2>Gestión de Usuarios</h2>
            <table className="tablaLista">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol Actual</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.email}</td>

                            <td>{u.rol.nombre_rol}</td>
                            <td>
                                <button
                                    className="btn-cerrar"
                                    onClick={() => cambiarRol(u)}
                                    style={{ backgroundColor: u.rol.nombre_rol === 'admin' ? '#f1c40f' : '#3498db' }}
                                >
                                    Hacer {u.rol.nombre_rol === "admin" ? "Común" : "Admin"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserRoleManagement;