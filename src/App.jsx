import React, { useState } from 'react';
import Login from './components/Login';

const App = () => {
  const [usuario, setUsuario] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!usuario ? (
        <Login onLoginSuccess={(user) => setUsuario(user)} />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bienvenido, {usuario.nombre}</h1>
          <p className="text-gray-600">Rol: {usuario.rol}</p>
        </div>
      )}
    </div>
  );
};

export default App;