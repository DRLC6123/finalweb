import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import { Eliminar } from './components/Eliminar.jsx';
import { Inicio } from './components/Inicio.jsx';
import { CrearSinImagen } from './components/CrearSinImagen.jsx';
import { Consultar } from './components/Consultar.jsx';
import { Modificar } from './components/Modificar.jsx';


// Layout para envolver todas las rutas
const Layout = () => (
  <>
    <Inicio></Inicio>
    <Outlet /> {/* Aquí se renderizan las rutas hijas */}
  </>
);

// Definición de rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,  // Usamos el Layout que contiene la navegación común
    children: [
      { path: "/", element: <Inicio /> },
      { path: "/Crear", element: <CrearSinImagen /> },
      { path: "/Eliminar", element: <Eliminar /> },
      { path: "/Modificar", element: <Modificar/>},
      { path: "/Consultar", element: <Consultar /> },
    ],
  },
]);

// Renderización de la aplicación
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
