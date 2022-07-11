import axios from "axios";
import router from "@/router";
const service = axios.create({
  baseURL: window.baseURL,
  withCredentials: true, 
  timeout: 60000,
});

service.interceptors.response.use(
  (response) => {
    if (
      response.data.Status == 1 ||
      response.data.Status == 2 ||
      response.data.Status == 3
    ) {
      console.log("觸發後端回報錯誤:", response.data);
      if (response.data.Status == 2) {
        router.push("/login");
      } else if (response.data.Status == 3) {
        // router.push("/main");
      }
    }
    return response;
  },
  (err) => {
    alert("系统繁忙中")
    return Promise.reject(err);
  }
);
export default service;
