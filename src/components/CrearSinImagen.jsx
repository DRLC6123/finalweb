import React, { useState } from 'react';

export function CrearSinImagen() {
  const [idColor, setIdColor] = useState(1); // Valor predeterminado de color
  const [idMarca, setIdMarca] = useState(1); // Valor predeterminado de marca
  const [modelo, setModelo] = useState('');  // Modelo del vehículo
  const [chasis, setChasis] = useState('');  // Chasis del vehículo
  const [motor, setMotor] = useState('');    // Motor del vehículo
  const [nombre, setNombre] = useState('');  // Nombre del vehículo
  const [estado, setEstado] = useState(1);   // Estado (activo/inactivo)
  const [error, setError] = useState(null);  // Para manejar errores

  // Función para manejar el cambio de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
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
        setEstado(value);
        break;
      default:
        break;
    }
  };

  // Función para enviar los datos del formulario a la API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    const requestBody = {
      primero: null,      // Enviar null para el ID ya que es nuevo
      idColor: idColor,   // ID del color seleccionado
      idMarca: idMarca,   // ID de la marca seleccionada
      modelo: modelo,     // Modelo del vehículo
      chasis: chasis,     // Chasis del vehículo
      motor: motor,       // Motor del vehículo
      nombre: nombre,     // Nombre del vehículo
      estado: 1,     // Estado del vehículo (1 para activo, 0 para inactivo)
      accion: 'C',        // Acción de creación (según el API)
    };

    try {
      const response = await fetch('http://segparcialms.somee.com/api/Principal/Guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Enviar el objeto como JSON
      });

      if (!response.ok) {
        throw new Error('Hubo un problema al crear el vehículo');
      }

      const result = await response.json();
      alert('Vehículo creado exitosamente!');
      // Limpiar formulario después de enviar correctamente
      setIdColor(1);
      setIdMarca(1);
      setModelo('');
      setChasis('');
      setMotor('');
      setNombre('');
      setEstado(1);
      setError(null); // Limpiar errores
    } catch (err) {
      setError(err.message); // Mostrar mensaje de error si ocurre
    }
  };

  return (
    <div className="crear-vehiculo">
      <h1>Crear Vehículo</h1>
      
      {/* Mostrar error si ocurre */}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
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
            type="number"
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

        <button type="submit" className="submit-btn">Crear Vehículo</button>
      </form>
    </div>
  );
}
