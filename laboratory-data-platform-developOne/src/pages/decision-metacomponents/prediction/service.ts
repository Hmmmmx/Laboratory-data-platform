import axios from 'axios'
import { PredictionParams } from './type';

const baseUrl="http://8.134.59.53/rest/decision/element"


export const getStaffPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: baseUrl+'/staff/prediction/query',
    params: params,
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

export const getWealthPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: baseUrl+'/wealth/prediction/query',
    params: params,
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

export const getConveyPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {

  console.log("params",params);
  
  return axios({
    method: 'get',
    url: baseUrl+'/convey/prediction/query',
    params: params,
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

export const getProductionPrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: baseUrl+'/production/prediction/query',
    params: params,
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

export const getSalePrediction = (params: PredictionParams) => new Promise((resolve, reject) => {
  return axios({
    method: 'get',
    url: baseUrl+'/sale/prediction/query',
    params: params,
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
