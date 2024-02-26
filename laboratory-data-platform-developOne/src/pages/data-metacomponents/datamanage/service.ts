import axios from 'axios'
import { GetDeviceParams } from './type';

export const getDevice = (params: GetDeviceParams) => {
  return axios({
    method: 'get',
    url: 'http://8.134.59.53/rest/data/access/device/query',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      // resolve(res);
      return res;
    } else {
      // reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
};

export const addDevice = (data: any) => {
  return axios({
    method: 'post',
    url: 'http://8.134.59.53/rest/data/access/device/action/add',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (res && res.status === 200) {
      // resolve(res);
      return res;
    } else {
      // reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
};

export const deleteDevice = (data: any) => new Promise((resolve, reject) => {
  return axios({
    method: 'post',
    url: 'http://8.134.59.53/rest/data/access/device/action/delete',
    data: data,
  }).then(res => {
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
});

export const uploadFile = (data: any) => new Promise((resolve, reject) => {
  return axios({
    method: 'post',
    url: 'http://8.134.59.53/rest/data/access/file/upload',
    data: data,
  }).then(res => {
    if (res && res.status === 200) {
      resolve(res);
    } else {
      reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
});

export const getTableData = (params: any) => {
  return axios({
    method: 'get',
    url: 'http://8.134.59.53/rest/data/access/original/query',
    params: params,
  }).then(res => {
    if (res && res.status === 200) {
      // resolve(res);
      return res;
    } else {
      // reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
};

export const getCsv = () => {
  return axios({
    method: 'get',
    url: '/数据模板.csv',
  }).then(res => {
    if (res && res.status === 200) {
      // resolve(res);
      return res;
    } else {
      // reject(res);
    }
  }).catch(err => {
    console.log(err)
  });
};