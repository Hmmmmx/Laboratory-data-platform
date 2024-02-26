import axios from 'axios';
import { DecisionParams } from './type';
import { firstLevelMenuEnum } from '@/utils/constant';
import { useAppSelector } from '@/stores/hooks';
import {
  updateStaffOptionData,
  updateWealthOptionData,
  updateConveyOptionData,
  updateProductionOptionData,
  updateSaleOptionData,
} from '@/stores/states/earlyWarningOptionSlice';
// import { updateStaffReturnData, updateWealthReturnData, updateConveyReturnData, updateProductionReturnData, updateSaleReturnData } from '@/states/earlyWarningReturnSlice';
import type { EarlyWarningOptionData } from '@/stores/states/earlyWarningOptionSlice';
// import { message } from 'antd';
// import type { EarlyWarningReturnData } from '@/states/earlyWarningReturnSlice';

const baseUrl = 'http://8.134.59.53/rest/decision/element';

const WarningbaseUrl = 'http://8.134.59.53/rest/decision/element';
const firstLevelPaths = Object.keys(firstLevelMenuEnum);

export const getStaffDecision = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: baseUrl + '/staff/measure/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

export const getWealthDecision = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: baseUrl + '/wealth/measure/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

export const getConveyDecision = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: baseUrl + '/convey/measure/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

export const getProductionDecision = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: baseUrl + '/production/measure/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

export const getSaleDecision = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: baseUrl + '/sale/measure/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
//1.获取weath预警信息
export const getWealthWarning = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: WarningbaseUrl + '/wealth/warning/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
//2.获取Staff预警信息
export const getStaffWarning = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: WarningbaseUrl + '/staff/warning/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
//3.获取convey预警信息
export const getConveyWarning = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: WarningbaseUrl + '/convey/warning/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
//4.获取Sale预警信息
export const getSaleWarning = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: WarningbaseUrl + '/sale/warning/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
//5.获取production预警信息
export const getProductionWarning = (params: DecisionParams) =>
  new Promise((resolve, reject) => {
    if (params.attributes === undefined) {
      // message.info('生成决策前请先到对应链的预警界面生成预警！');
    } else {
      return axios({
        method: 'get',
        url: WarningbaseUrl + '/production/warning/query2',
        params: params,
      })
        .then((res) => {
          if (res && res.status === 200) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
/**
 * 获取保存在redux的选择的预警数据以及其更新方法
 * @param firstLevelPathKey 当前一级路由路径
 * @return 保存在redux的选择的预警数据以及其更新方法
 */
export const getEarlyWaringOptionOnRedux = (
  firstLevelPathKey: string,
): {
  earlyWarningOption: EarlyWarningOptionData | undefined; // 保存在redux的选择的预警数据
  updateOptionData: any; // 其更新方法
} => {
  // 保存在redux的选择的预警数据以及其更新方法
  let earlyWarningOption: EarlyWarningOptionData | undefined = {}; // 初始化预警数据为空对象
  let updateOptionData: any; // 声明更新方法

  switch (
    firstLevelPathKey // 根据当前一级路由路径执行不同的逻辑
  ) {
    case firstLevelPaths[0]: // 如果是第一个一级路径
      // 预警页人力链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        // 从Redux中获取预警数据
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[0] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateStaffOptionData; // 设置更新方法为更新人力链数据的方法
      // earlyWarningOption = {};
      // updateOptionData = () => { };
      break;

    case firstLevelPaths[1]: // 如果是第二个一级路径
      // 预警页资金链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        // 从Redux中获取预警数据
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[1] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateWealthOptionData; // 设置更新方法为更新资金链数据的方法
      // earlyWarningOption = {};
      // updateOptionData = () => { };
      break;

    case firstLevelPaths[2]: // 如果是第三个一级路径
      // 预警页物流链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        // 从Redux中获取预警数据
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[2] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateConveyOptionData; // 设置更新方法为更新物流链数据的方法
      // earlyWarningOption = {};
      // updateOptionData = () => { };
      break;

    case firstLevelPaths[3]: // 如果是第四个一级路径
      // 预警页生产链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        // 从Redux中获取预警数据
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[3] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateProductionOptionData; // 设置更新方法为更新生产链数据的方法
      // earlyWarningOption = {};
      // updateOptionData = () => { };
      break;

    case firstLevelPaths[4]: // 如果是第五个一级路径
      // 预警页销售链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        // 从Redux中获取预警数据
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[4] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateSaleOptionData; // 设置更新方法为更新销售链数据的方法
      // earlyWarningOption = {};
      // updateOptionData = () => { };
      break;

    default: // 如果是其他一级路径
      earlyWarningOption = {}; // 设置预警数据为空对象
      updateOptionData = () => {}; // 设置更新方法为空函数
  }

  return {
    earlyWarningOption, // 返回预警数据
    updateOptionData, // 返回更新方法
  };
};
