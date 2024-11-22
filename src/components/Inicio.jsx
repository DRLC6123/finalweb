import { NavLink } from 'react-router-dom';


export function Inicio(){
    return (
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <NavLink to="/Crear" className="nav-button">
                Crear
              </NavLink>
            </li>
            <li>
              <NavLink to="/Consultar" className="nav-button">
                Consultar
              </NavLink>
            </li>
            <li>
              <NavLink to="/Modificar" className="nav-button">
                Modificar
              </NavLink>
            </li>
            <li>
              <NavLink to="/Eliminar" className="nav-button">
                Eliminar
              </NavLink>
            </li>
          
          </ul>
        </nav>
      );
}