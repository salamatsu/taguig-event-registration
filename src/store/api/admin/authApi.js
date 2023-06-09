import { axiosDefault } from "../axios";

export const login_api = async (payload) => {
  return await axiosDefault.post("/api/admin/auth/login", payload);
};
