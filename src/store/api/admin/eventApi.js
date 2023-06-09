import { axiosDefault } from "../axios";

export const getEvents_api = async () => {
  return await axiosDefault.get("/api/admin/cms/getEvents");
};
export const searchTraceUser_api = async ({ params }) => {
  return await axiosDefault.get("/api/admin/cms/searchTraceUser/" + params);
};
export const getAttendees_api = async ({ params }) => {
  return await axiosDefault.get("/api/admin/cms/getAttendees/" + params);
};
export const addAttendee_api = async (payload) => {
  return await axiosDefault.get("/api/admin/cms/addAttendee", payload);
};
