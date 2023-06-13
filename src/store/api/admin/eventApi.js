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

export const getEvents_api = async () => {
  return await axiosDefault.get("/api/admin/cms/getEvents");
};
export const searchTraceUser_api = async ({ params }) => {
  return await axiosDefault.get("/api/admin/cms/searchTraceUser/" + params);
};

export const searchTraceUsers_api = async (payload) => {
  return await axiosDefault.post("/api/admin/cms/searchTraceUsers", payload);
};
export const getAttendees_api = async ({ params }) => {
  return await axiosDefault.get("/api/admin/cms/getAttendees/" + params);
};

export const addAttendee_api = async (payload) => {
  return await axiosDefault.post("/api/admin/cms/addAttendee", payload);
};

export const updateAttendeeInfo_api = async (payload) => {
  return await axiosDefault.post("/api/admin/cms/updateAttendeeInfo", payload);
};
