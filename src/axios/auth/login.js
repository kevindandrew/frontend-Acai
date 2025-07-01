import { instance } from "../instance";

export async function login(request) {
  try {
    const { data } = await instance.post("/auth/login", request);
    return data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const msg = error.response.data?.message || "Error desconocido";

      if (status === 422 || status === 500) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      throw new Error(msg);
    }

    throw new Error("Error de red o servidor no disponible");
  }
}

export async function users() {
  try {
    const { data } = await instance.get("/users");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const { status } = await instance.delete(`/users/${id}`);
    return status;
  } catch (error) {
    throw error;
  }
}
