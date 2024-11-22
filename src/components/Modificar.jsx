import React, { useState } from 'react';

export function Modificar() {
  const [idVehiculo, setIdVehiculo] = useState('');  // Estado para almacenar el ID del vehículo
  const [idColor, setIdColor] = useState('');         // Estado para el ID del color
  const [idMarca, setIdMarca] = useState('');         // Estado para el ID de la marca
  const [modelo, setModelo] = useState('');           // Estado para el modelo
  const [chasis, setChasis] = useState('');           // Estado para el chasis
  const [motor, setMotor] = useState('');             // Estado para el motor
  const [nombre, setNombre] = useState('');           // Estado para el nombre
  const [estado, setEstado] = useState(1);            // Estado para activo (1 para activo, 0 para inactivo)
  const [error, setError] = useState(null);           // Para manejar errores
  const [mensajeExito, setMensajeExito] = useState(null);  // Para manejar el mensaje de éxito

  // Función para manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'idVehiculo':
        setIdVehiculo(value);
        break;
      case 'idColor':
        setIdColor(value);
        break;
      case 'idMarca':
        setIdMarca(value);
        break;
      case 'modelo':
        setModelo(value);
        break;
      case 'chasis':
        setChasis(value);
        break;
      case 'motor':
        setMotor(value);
        break;
      case 'nombre':
        setNombre(value);
        break;
      case 'estado':
        setEstado(1);
        break;
      default:
        break;
    }
  };

  // Función para enviar la solicitud de actualización
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    if (!idVehiculo) {
      alert('Por favor, ingresa un ID de vehículo válido.');
      return;
    }

    const requestBody = {
      primero: idVehiculo,  // ID del vehículo a modificar
      idColor,              // ID del color
      idMarca,              // ID de la marca
      modelo,               // Modelo del vehículo
      chasis,               // Chasis del vehículo
      motor,                // Motor del vehículo
      nombre,               // Nombre del vehículo
      estado,               // Estado (activo/inactivo)
      accion: 'U',          // Acción de actualización
    };

    try {
      const response = await fetch('http://segparcialms.somee.com/api/Principal/Actualizar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Enviar el cuerpo de la solicitud en formato JSON
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al actualizar el vehículo');
      }

      // Si la actualización es exitosa
      const result = await response.json();
      setMensajeExito(result);  // Guardar el mensaje de éxito que regresa la API
      setError(null);           // Limpiar cualquier error previo
    } catch (err) {
      setMensajeExito(null);    // Limpiar el mensaje de éxito si hay un error
      setError(err.message);    // Mostrar el mensaje de error
    }
  };

  return (
    <div className="modificar-vehiculo">
      <h1>Modificar Vehículo</h1>

      {/* Mostrar el mensaje de éxito si la actualización fue exitosa */}
      {mensajeExito && <p className="exito">{mensajeExito}</p>}

      {/* Mostrar error si ocurre */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Vehículo:</label>
          <input
            type="number"
            name="idVehiculo"
            value={idVehiculo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>ID Color:</label>
          <input
            type="number"
            name="idColor"
            value={idColor}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>ID Marca:</label>
          <input
            type="number"
            name="idMarca"
            value={idMarca}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Modelo:</label>
          <input
            type="text"
            name="modelo"
            value={modelo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Chasis:</label>
          <input
            type="text"
            name="chasis"
            value={chasis}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Motor:</label>
          <input
            type="text"
            name="motor"
            value={motor}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            required
          />
        </div>


        <button type="submit" className="submit-btn">Actualizar Vehículo</button>
      </form>
    </div>
  );
}
