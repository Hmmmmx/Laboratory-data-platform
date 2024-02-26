import axios from "axios";

const getCorporations = () => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getCorporations");
}

const getStaff = (corporationName: string) => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getStaff", {
    params: {
      corporationName
    }

  });
}

const getCost = (corporationName: string) => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getCost", {
    params: {
      corporationName
    }
  });
}

const getConvey = (corporationName: string) => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getConvey", {
    params: {
      corporationName
    }
  });
}

const getBirthInfo = (corporationName: string) => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getBirthInfo", {
    params: {
      corporationName
    }

  });
}

const getSaleInfo = (corporationName: string) => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getSaleInfo", {
    params: {
      corporationName
    }
  });
}

const getService = (corporationName: string) => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getService", {
    params: {
      corporationName
    }
  });
}

const getQuality = (corporationName: string) => {
  return axios.get("http://8.134.59.53/optimize/costPriority/getQuality", {
    params: {
      corporationName
    }
  });
}


export { getCorporations, getBirthInfo, getConvey, getCost, getQuality, getSaleInfo, getService, getStaff };