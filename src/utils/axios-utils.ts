import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:4000" });

// 이렇게하면 interceptor를 구현할 수 있는 데 이미 axios에서는
// 해당 기능을 기본으로 제공하는 걸로 아는 데 왜 이렇게 하는 걸까요?
export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };
  return client(options).then(onSuccess).catch(onError);
};
