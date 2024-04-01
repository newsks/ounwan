import {create} from 'apisauce';

const baseURL = 'http://54.180.90.124:8080/';

export const API = create({
  baseURL,
  withCredentials: true,
});
