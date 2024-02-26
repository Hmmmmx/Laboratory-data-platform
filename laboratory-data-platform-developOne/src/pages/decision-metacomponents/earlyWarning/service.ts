import axios from 'axios';
import { firstLevelMenuEnum } from '@/utils/constant';
import { useAppSelector } from '@/stores/hooks';
import {
  updateStaffOptionData,
  updateWealthOptionData,
  updateConveyOptionData,
  updateProductionOptionData,
  updateSaleOptionData,
} from '@/stores/states/earlyWarningOptionSlice';
import {
  updateStaffReturnData,
  updateWealthReturnData,
  updateConveyReturnData,
  updateProductionReturnData,
  updateSaleReturnData,
} from '@/stores/states/earlyWarningReturnSlice';
import type { EarlyWarningOptionData } from '@/stores/states/earlyWarningOptionSlice';
import type { EarlyWarningReturnData } from '@/stores/states/earlyWarningReturnSlice';

const baseUrl = 'http://8.134.59.53/rest/decision/element';

const firstLevelPaths = Object.keys(firstLevelMenuEnum);
// eslint-disable-next-line no-async-promise-executor
export const update = (data: any) =>
  new Promise(async (resolve, reject) => {
    console.log('update', data);

    try {
      const res = await axios({
        method: 'post',
        url: baseUrl + `/threshold/action/update`,
        data,
      });
      if (res && res.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    } catch (err) {
      console.log(err);
    }
  });

// 生成预警
// eslint-disable-next-line no-async-promise-executor
export const getEarlyWaring = (type: string, params: any) =>
  new Promise(async (resolve, reject) => {
    // console.log('getEarlyWarning', params);

    // if(params.categories===4&&params.attributes==="生产费用1"){
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   params.attributes="生产费用"
    // }

    // if(params)

    try {
      const res = await axios({
        method: 'get',
        url: baseUrl + `/${type}/warning/query`,
        params,
      });
      if (res && res.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    } catch (err) {
      console.log(err);
    }
  });

  export const getEarlyWaring02 = (type: string, params: any) =>
  new Promise(async (resolve, reject) => {
    console.log('getEarlyWarning', params);

    try {
      const res = await axios({
        method: 'get',
        url: baseUrl + `/${type}/warning/query2`,
        params,
      });
      if (res && res.status === 200) {
        resolve(res);
      } else {
        reject(res);
      }
    } catch (err) {
      console.log(err);
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
  earlyWarningOption: EarlyWarningOptionData | undefined;
  updateOptionData: any;
} => {
  // 保存在redux的选择的预警数据以及其更新方法
  let earlyWarningOption: EarlyWarningOptionData | undefined = {};
  let updateOptionData: any;

  switch (firstLevelPathKey) {
    case firstLevelPaths[0]:
      // 预警页人力链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[0] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateStaffOptionData;
      break;

    case firstLevelPaths[1]:
      // 预警页资金链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[1] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateWealthOptionData;
      break;

    case firstLevelPaths[2]:
      // 预警页物流链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[2] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateConveyOptionData;
      break;

    case firstLevelPaths[3]:
      // 预警页生产链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[3] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateProductionOptionData;
      break;

    case firstLevelPaths[4]:
      // 预警页销售链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningOption = useAppSelector(
        (state) =>
          state.earlyWarningOption[
            firstLevelPaths[4] as keyof typeof state.earlyWarningOption
          ],
      );
      updateOptionData = updateSaleOptionData;
      break;

    default:
      earlyWarningOption = {};
      updateOptionData = () => {};
  }

  return {
    earlyWarningOption,
    updateOptionData,
  };
};

/**
 * 获取保存在redux的返回的预警数据以及其更新方法
 * @param firstLevelPathKey 当前一级路由路径
 * @return 保存在redux的返回的预警数据以及其更新方法
 */
export const getEarlyWaringReturnOnRedux = (
  firstLevelPathKey: string,
): {
  earlyWarningReturn: EarlyWarningReturnData | undefined;
  updateReturnData: any;
} => {
  // 保存在redux的选择的预警数据以及其更新方法
  let earlyWarningReturn: EarlyWarningReturnData | undefined = {};
  let updateReturnData: any;

  switch (firstLevelPathKey) {
    case firstLevelPaths[0]:
      // 预警页人力链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningReturn = useAppSelector(
        (state) =>
          state.earlyWarningReturn[
            firstLevelPaths[0] as keyof typeof state.earlyWarningReturn
          ],
      );
      updateReturnData = updateStaffReturnData;
      break;

    case firstLevelPaths[1]:
      // 预警页资金链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningReturn = useAppSelector(
        (state) =>
          state.earlyWarningReturn[
            firstLevelPaths[1] as keyof typeof state.earlyWarningReturn
          ],
      );
      updateReturnData = updateWealthReturnData;
      break;

    case firstLevelPaths[2]:
      // 预警页物流链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningReturn = useAppSelector(
        (state) =>
          state.earlyWarningReturn[
            firstLevelPaths[2] as keyof typeof state.earlyWarningReturn
          ],
      );
      updateReturnData = updateConveyReturnData;
      break;

    case firstLevelPaths[3]:
      // 预警页生产链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningReturn = useAppSelector(
        (state) =>
          state.earlyWarningReturn[
            firstLevelPaths[3] as keyof typeof state.earlyWarningReturn
          ],
      );
      updateReturnData = updateProductionReturnData;
      break;

    case firstLevelPaths[4]:
      // 预警页销售链
      // eslint-disable-next-line react-hooks/rules-of-hooks
      earlyWarningReturn = useAppSelector(
        (state) =>
          state.earlyWarningReturn[
            firstLevelPaths[4] as keyof typeof state.earlyWarningReturn
          ],
      );
      updateReturnData = updateSaleReturnData;
      break;

    default:
      earlyWarningReturn = {};
      updateReturnData = () => {};
  }

  return {
    earlyWarningReturn,
    updateReturnData,
  };
};
