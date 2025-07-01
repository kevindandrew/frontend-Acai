import { instance } from "../instance";
export async function user() {
  try {
    const { data } = await instance.get("/auth/me");
    return data;
  } catch (error) {
    throw error;
  }
}
