import request from "./index";

export const apiLogin = (data:any) => {
  return request({
    url: "admin/login",
    method: "post",
    data,
  });
};
