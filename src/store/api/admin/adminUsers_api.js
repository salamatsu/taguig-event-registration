import { axiosDefault } from "../axios";

axiosDefault.interceptors.request.use(async function (config) {
  try {
    const auth = JSON.parse(localStorage.getItem("persist:authAdmin"));
    if (auth && auth.token) {
      config.headers.Authorization = `Bearer ${auth.token.split('"')[1]}`;
    } else {
      throw new Error("Authorization token not found.");
    }
  } catch (error) {
    console.error(error);
  }
  return config;
});

export const getAdminUsers_api = async () => {
  return await axiosDefault.get("/api/admin/cms/getAdminUsers");
};

export const addAdminUser_api = async (payload) => {
  return await axiosDefault.post("/api/admin/cms/addAdminUser", payload);
};

export const updateAdminUser_api = async ({ body, params }) => {
  return await axiosDefault.post("/api/admin/cms/updateAdminUser/" + params, body);
};
export const changeAdminUserPassword_api = async ({ body, params }) => {
  return await axiosDefault.post(
    "/api/admin/cms/changeAdminUserPassword/" + params,
    body
  );
};
