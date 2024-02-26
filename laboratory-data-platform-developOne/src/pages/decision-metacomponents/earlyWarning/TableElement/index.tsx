import { Table } from 'antd';
import { translateAlarmType, translateAttributes } from '@/utils/translate';
import { getEarlyWaringOptionOnRedux } from '../service';
import { useEffect, type ReactElement, useState } from 'react';
import { getEarlyWaring02 } from '../service';

const TableElement = (props: { firstLevelPathKey: string }): ReactElement => {
  const { firstLevelPathKey } = props;

  // 保存在redux的选择的预警数据
  const { earlyWarningOption } = getEarlyWaringOptionOnRedux(firstLevelPathKey);
  // let earlyWarningOption1=earlyWarningOption;
  // 保存在redux的返回的预警数据
  // const { earlyWarningReturn = {} } = getEarlyWaringReturnOnRedux(firstLevelPathKey);
  // console.log("table",earlyWarningOption);

  // 选择的预警紧急程度
  const alarmTypeOption = earlyWarningOption?.alarmType ?? 2;
  // 选择的预警阈值波动范围
  const attributes = earlyWarningOption?.attributes;
  // 选择的公司
  const company = earlyWarningOption?.company;

  const [CompanyOption, setCompanyOption] = useState<any>();

  // 格式化事件时间戳
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // 将时间戳转换为Date对象
    const month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并补0
    const day: any = (date.getDate() + 1).toString().padStart(2, '0');

    if (earlyWarningOption?.granularity == '1') {
      return `第${Math.floor((month - 1) / 3) + 1}季度`;
    } else if (earlyWarningOption?.granularity == '2') {
      return `${month}月`;
    } else if (earlyWarningOption?.granularity == '3') {
      return `${month}月${day}日`;
    } else {
      return '无';
    }
  };

  // if(firstLevelPathKey==="production"){
  // console.log('earlyWarningOption1111',earlyWarningOption);
  // if(earlyWarningOption1?.attributes==="生产费用1")
  //   earlyWarningOption1.attributes="生产费用";
  // }

  // 翻译后的英文预警波动范围
  const attributesResult = translateAttributes(firstLevelPathKey, attributes);

  //获取预警数据
  async function getEarlyWaring02Message() {
    const { data } = (await getEarlyWaring02(
      firstLevelPathKey,
      earlyWarningOption,
    )) as any;
    // console.log("res",res.data['海尔']);
    // console.log("com",company,data[company]);

    setCompanyOption(data[company as any]);
    // data[earlyWarningOption?.company].filter((item:any)=>{
    //   if(item)
    // })
  }

  useEffect(() => {
    getEarlyWaring02Message();
  }, [earlyWarningOption]);

  // 表格列
  const columns = [
    {
      title: '时间',
      dataIndex: 'eventTime',
      key: 'eventTime',
    },
    {
      title: attributes,
      dataIndex: attributesResult,
      key: attributesResult,
    },
    {
      title: '原因',
      dataIndex: 'causeType',
      key: 'causeType',
    },
    {
      title: '紧急程度',
      dataIndex: 'level',
      key: 'level',
    },
  ];

  const tableNeedProperties = columns.map((as) => {
    // console.log("key",as);
    if (as.title === '生产费用1') {
      as.title = '生产费用';
    }
    if (as.title === '运输费用1') {
      as.title = '运输费用';
    }
    return as.key;
  }); // 表格列所需要的数据项
  const tableNeedData: object[] = []; // 表格需要的数据

  // 处理表格数据
  if (company !== undefined) {
    // console.log(1111111111,earlyWarningReturn[company]);

    CompanyOption?.forEach((item: any, index: any) => {
      // console.log('找到了');
      // console.log('earlyWarningOption1111',item);
      const newObj: {
        eventTime?: number; // 时间
        categories?: string; // 种类
        [key: string]: any; // 阈值波动范围
        causeType?: string; // 原因
        level?: string | number; // 紧急程度
        // measures?: string,  // 决策措施
      } = {};
      // console.log("newObj",newObj);

      let isFilterAlarmTypeOption = false; // 是否通过紧急程度过滤
      for (const prop of tableNeedProperties) {
        // 根据紧急程度过滤
        if (
          Object.prototype.hasOwnProperty.call(item, prop) &&
          (alarmTypeOption === item['alarmType'] || alarmTypeOption === 2)
        ) {
          if (prop === 'level') {
            isFilterAlarmTypeOption = true;
            // 翻译紧急程度
            const levelResult = translateAlarmType(item['level'] as number);
            newObj['level'] = levelResult;
          } else if (prop === 'eventTime') {
            newObj['eventTime' as string] = formatDate(
              Number(item['eventTime']),
            );
          } else {
            // console.log("newObj[prop]",newObj[attributesResult]);

            newObj[prop] = item[prop];
          }
        }
      }
      // console.log("newObj",newObj);
      // 消除警告：Warning: Each child in a list should have a unique "key" prop.
      newObj['key'] = index;
      // 未通过紧急程度过滤，不展示数据
      isFilterAlarmTypeOption && tableNeedData.push(newObj);
    });
    // console.log('tableNeedData', tableNeedData);
  }

  return (
    <>
      <Table columns={columns} dataSource={tableNeedData} />
    </>
  );
};

export default TableElement;
