
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export const verificarUsuario = async (usuario, clave) => {
  try {
    const docRef = doc(db, "usuarios", usuario);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { ok: false, mensaje: "Usuario no encontrado" };
    }

    const data = docSnap.data();

    if (data.clave === clave) {
      return { ok: true, rol: data.rol, nombre: data.nombre };
    } else {
      return { ok: false, mensaje: "Clave incorrecta" };
    }
  } catch (e) {
    console.error("Error al buscar el usuario:", e);
    return { ok: false, mensaje: "Error al conectar con Firestore" };
  }
};
