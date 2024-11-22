import React, { useState } from 'react';

export function Consultar() {
  const [idVehiculo, setIdVehiculo] = useState('');
  const [vehiculo, setVehiculo] = useState(null); // Guardar los datos del vehículo
  const [error, setError] = useState(null); // Para manejar posibles errores

  // Función para manejar el cambio del input
  const handleChange = (e) => {
    setIdVehiculo(e.target.value);
  };

  // Función para consultar el vehículo por ID
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    if (!idVehiculo) {
      alert('Por favor, ingrese un ID de vehículo válido.');
      return;
    }

    const requestBody = {
      primero: idVehiculo, // Enviar el ID del vehículo en "primero"
      idColor: null,       // Puedes enviar estos valores como null si no los usas
      idMarca: null,
      modelo: null,
      chasis: null,
      motor: null,
      nombre: null,
      estado: null,
      accion: 'R', // Acción de consulta (según el ejemplo dado)
    };

    try {
      const response = await fetch('http://segparcialms.somee.com/api/Principal/Buscar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Enviar los parámetros como JSON
      });

      if (!response.ok) {
        throw new Error('Vehículo no encontrado');
      }

      const result = await response.json();
      setVehiculo(result); // Guardar los datos del vehículo en el estado
      setError(null); // Limpiar cualquier error previo

    } catch (err) {
      setVehiculo(null); // Limpiar los datos si hay un error
      setError(err.message); // Guardar el mensaje de error
    }
  };

  return (
    <div className="consultar-vehiculo">
      <h1>Consultar Vehículo por ID</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID del Vehículo:
          <input
            type="number"
            name="id_vehiculo"
            value={idVehiculo}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="submit-btn">Consultar Vehículo</button>
      </form>

      {/* Mostrar el error si ocurre */}
      {error && <p className="error">{error}</p>}

      {/* Mostrar los datos del vehículo en una tabla */}
      {vehiculo && (
        <table>
          <thead>
            <tr>
              <th>ID Vehículo</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Chasis</th>
              <th>Motor</th>
              <th>Nombre</th>
              <th>Color</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{vehiculo.primero}</td> {/* El ID del vehículo */}
              <td>{vehiculo.idMarca}</td> {/* ID de la Marca */}
              <td>{vehiculo.modelo}</td> {/* Modelo del vehículo */}
              <td>{vehiculo.chasis}</td> {/* Chasis del vehículo */}
              <td>{vehiculo.motor}</td> {/* Motor del vehículo */}
              <td>{vehiculo.nombre}</td> {/* Nombre del vehículo */}
              <td>{vehiculo.idColor}</td> {/* ID del Color */}
              <td>{vehiculo.estado === 1 ? 'Activo' : 'Inactivo'}</td> {/* Estado (activo/inactivo) */}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
