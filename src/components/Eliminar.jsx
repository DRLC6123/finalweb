import React, { useState } from 'react';

export function Eliminar() {
  const [idVehiculo, setIdVehiculo] = useState('');  // Estado para almacenar el ID del vehículo
  const [error, setError] = useState(null);  // Para manejar errores
  const [mensajeExito, setMensajeExito] = useState(null);  // Para manejar el mensaje de éxito

  // Función para manejar el cambio en el input del ID del vehículo
  const handleChange = (e) => {
    setIdVehiculo(e.target.value);
  };

  // Función para enviar la solicitud de eliminación
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    if (!idVehiculo) {
      alert('Por favor, ingresa un ID de vehículo válido.');
      return;
    }

    const requestBody = {
      primero: idVehiculo,  // El ID del vehículo que se va a eliminar
      idColor: null,         // Los demás campos pueden ser null, ya que no se usan en la eliminación
      idMarca: null,
      modelo: null,
      chasis: null,
      motor: null,
      nombre: null,
      estado: null,
      accion: 'D',           // Acción de eliminación
    };

    try {
      const response = await fetch('http://segparcialms.somee.com/api/Principal/Eliminar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Enviar el cuerpo de la solicitud en formato JSON
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al eliminar el vehículo');
      }

      // Si la eliminación es exitosa
      setMensajeExito('Vehículo eliminado exitosamente');
      setIdVehiculo('');  // Limpiar el campo del ID
      setError(null);      // Limpiar cualquier error previo
    } catch (err) {
      setMensajeExito(null);  // Limpiar el mensaje de éxito si hay un error
      setError(err.message);  // Mostrar el mensaje de error
    }
  };

  return (
    <div className="eliminar-vehiculo">
      <h1>Eliminar Vehículo</h1>

      {/* Mostrar el mensaje de éxito si la eliminación fue exitosa */}
      {mensajeExito && <p className="exito">{mensajeExito}</p>}

      {/* Mostrar error si ocurre */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Vehículo:</label>
          <input
            type="number"
            name="id_vehiculo"
            value={idVehiculo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Eliminar Vehículo</button>
      </form>
    </div>
  );
}
