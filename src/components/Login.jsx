import React, { useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const Login = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'usuarios', usuario);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError('Usuario no encontrado');
        return;
      }

      const data = docSnap.data();
      if (data.clave !== clave) {
        setError('Usuario o clave incorrectos.');
        return;
      }

      setError('');
      onLoginSuccess(data);
    } catch (err) {
      console.error(err);
      setError('Error al ingresar.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Ingreso a Clínica Hall</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Clave"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded w-full">
        Entrar
      </button>
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
    </form>
  );
};

export default Login;