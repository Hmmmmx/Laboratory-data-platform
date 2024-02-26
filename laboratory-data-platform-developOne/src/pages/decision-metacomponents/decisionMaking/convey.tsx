/* @jsxImportSource @emotion/react */
import { Table, Form } from 'antd';
import {
  Fragment,
  type FC,
  type ReactElement,
  useState,
  useEffect,
  useRef,
} from 'react';
import { productTypes } from '@/utils/constant';
import { getEarlyWaringOptionOnRedux, getConveyDecision } from './service';
// import { EChartOption } from 'echarts';
import { Charts } from '../components/Charts';
import { translationTable } from '@/utils/constant';
import useCurrentPath from '@/hooks/useCurrentPath';
import DecisionOperation from './decisionOperation';
import { EChartsOption } from 'echarts';

const corporationOption: EChartsOption = {
  title: {
    text: '决策对象',
    left: 'center',
    top: 'bottom',
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    // data: [],
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      // data: [],
    },
  ],
};

const levelOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  title: {
    text: '紧急程度',
    left: 'center',
    top: 'bottom',
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    // data: []
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      // data: []
    },
  ],
};

const measureOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
  },
  title: {
    text: '决策措施',
    left: 'center',
    top: 'bottom',
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: [],
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '70%'],
      data: [],
    },
  ],
};

const topoOption: EChartsOption = {
  animationDuration: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      name: 'Topo',
      type: 'graph',
      layout: 'force',
      // data: graph.nodes,
      // links: graph.links,
      label: {
        show: true,
        position: 'inside',
        distance: 5,
        fontSize: 12,
        align: 'center',
      },
      symbolSize: 90,
      roam: true,
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [2, 8], // 两端大小
      cursor: 'pointer',
      force: {
        // 节点排斥力设置
        repulsion: 300, // 两个节点之间的距离
        gravity: 0,
        edgeLength: 100, //节点之间的斥力因子值
        friction: 1, // 节点的移动速度 取值0~1
        layoutAnimation: false,
      },
      itemStyle: {
        // normal: {
        // 不同节点显示不同颜色
        color: function (params: any) {
          return params.data.colors || '#5470c6'; // 获取具体的参数，默认为蓝色
        },
        // },
      },
      lineStyle: {
        color: 'source',
        curveness: 0, // 线的曲率
      },
      edgeLabel: {
        // 边的设置（节点之间的关系）
        show: true,
        position: 'middle',
        fontSize: 12,
        formatter: (params: any) => {
          return params.data.relation.name;
        },
      },
    },
  ],
};

// 紧急程度翻译
const formatLevel = (level: number) => {
  if (level === 1) {
    return '一般';
  } else if (level === 2) {
    return '紧急';
  } else {
    return '';
  }
};

// 计算数组中某个属性值重复出现的个数
const getRepeatNum = (list: Array<any>) => {
  const obj: any = {};
  for (let i = 0, l = list.length; i < l; i++) {
    const item = list[i];
    obj[item] = obj[item] + 1 || 1;
  }

  return obj;
};
const getRepeatMeasure = (measureInitList: Array<any>) => {
  let measureCount = {};
  for (let item of measureInitList) {
    if (measureCount[item.name]) {
      measureCount[item.name].value += 1;
    } else {
      measureCount[item.name] = {
        name: item.name,
        // color: item.color,
        itemStyle: {
          color: item.color,
        },
        value: 1,
      };
    }
  }

  let result = Object.values(measureCount);
  return result;
};
// 更新“可选企业列表”
const getAllCorporationList = (data: any) => {
  const corporationList = Object.keys(data);

  return corporationList;
};

// 翻译
const translateSelectedOption = (newOption: string) => {
  if (newOption === '运输费用') return translationTable['运输费用1'];
  return translationTable[newOption];
};

const Convey: FC = (): ReactElement => {
  // const [alarmType, setAlarmType] = useState(2);
  const [dataSource, setDataSource] = useState([]);
  const [, setCorporationOptions] = useState<EChartsOption>(corporationOption);
  const [levelOptions, setLevelOptions] = useState<EChartsOption>(levelOption);
  const [measureOptions, setMeasureOptions] =
    useState<EChartsOption>(measureOption);
  const { firstLevelPathKey } = useCurrentPath(); // 当前路由
  const [topoOptions, setTopoOptions] = useState(topoOption as any);
  console.log('topoOptions', topoOptions);
  // 保存在redux的选择的预警数据以及其更新方法
  const { earlyWarningOption }: any = getEarlyWaringOptionOnRedux('convey');
  const formData: any = useRef({
    categories: earlyWarningOption?.categories || undefined, // 人力链
    time: earlyWarningOption?.time || undefined, // 以秒为单位的时间戳
    granularity: earlyWarningOption?.granularity || undefined, // 年/月/季
    alarmType: earlyWarningOption?.alarmType || undefined, // 预警类型（全部/高于/低于）
    corporation: earlyWarningOption?.company || undefined, // 公司
    attributes: earlyWarningOption?.attributes || undefined, // 阈值波动范围
    attributesValue: earlyWarningOption?.attributesValue || undefined, // 阈值
  });

  useEffect(() => {
    formData.current = {
      categories: earlyWarningOption?.categories || undefined, // 人力链
      time: earlyWarningOption?.time || undefined, // 以秒为单位的时间戳
      granularity: earlyWarningOption?.granularity || undefined, // 年/月/季
      alarmType: earlyWarningOption?.alarmType || undefined, // 预警类型（全部/高于/低于）
      corporation: earlyWarningOption?.company || undefined, // 公司
      attributes: earlyWarningOption?.attributes || undefined, // 阈值波动范围
      attributesValue: earlyWarningOption?.attributesValue || undefined, // 阈值
    };
  }, [earlyWarningOption]);

  // 格式化事件时间戳
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // 将时间戳转换为Date对象
    // const year = date.getFullYear();
    const month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并补0
    const day: any = (date.getDate() + 1).toString().padStart(2, '0');

    if (
      formData.current.granularity === 1 ||
      formData.current.granularity === '1'
    ) {
      return `第${Math.floor((month - 1) / 3) + 1}季度`;
    } else if (
      formData.current.granularity === 2 ||
      formData.current.granularity === '2'
    ) {
      return `${month}月`;
    } else if (
      formData.current.granularity === 3 ||
      formData.current.granularity === '3'
    ) {
      return `${month}月${day}日`;
    } else {
      return '无';
    }
  };

  const columns = [
    {
      title: '种类',
      dataIndex: 'categories',
      key: 'categories',
      render: (text: number, record: any) => {
        console.log('text', text);

        const level: string = `${formatDate(record.eventTime)}/商品类型：${
          productTypes[text]
        }`;
        return level;
      },
    },
    {
      title: formData.current.attributes,
      dataIndex: translateSelectedOption(formData.current.attributes),
      key: translateSelectedOption(formData.current.attributes),
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
      render: (text: number) => {
        const level: string = formatLevel(text);
        return level;
      },
    },
    {
      title: '决策措施',
      dataIndex: 'measure',
      key: 'measure',
    },
  ];

  const getCurrentDataSource = (data: any) => {
    const currentDataSource = [];
    const corporationList = getAllCorporationList(data);

    for (let i = 0; i < corporationList.length; i++) {
      if (formData.current.corporation === corporationList[i]) {
        currentDataSource.push(...data[corporationList[i]]);
      }
    }
    if (currentDataSource.length === 0) {
      for (let i = 0; i < corporationList.length; i++) {
        currentDataSource.push(...data[corporationList[i]]);
      }
    }

    return currentDataSource;
  };

  const getCorporationList = (data: any) => {
    const allCorporationList = getAllCorporationList(data);
    let corporationList: string[] = [];

    for (let i = 0; i < allCorporationList.length; i++) {
      if (formData.current.corporation === allCorporationList[i]) {
        corporationList = [`${allCorporationList[i]}`];
      }
    }
    if (corporationList.length === 0) {
      for (let i = 0; i < allCorporationList.length; i++) {
        corporationList.push(allCorporationList[i]);
      }
    }

    return corporationList;
  };

  const getCorporationData = (data: any) => {
    const corporationData = [];
    const corporationList = getCorporationList(data);

    for (let i = 0; i < corporationList.length; i++) {
      corporationData.push({
        value: 1,
        name: corporationList[i],
      });
    }

    return corporationData;
  };

  // const getLevelData = (data: any, params: any) => {
  //   const levelData = [];
  //   let normalNum = 0;
  //   let seriousNum = 0;
  //   const currentDataSource = getCurrentDataSource(data);

  //   for (let i = 0; i < currentDataSource.length; i++) {
  //     if (currentDataSource[i].level === 1) {
  //       normalNum++;
  //     } else if (currentDataSource[i].level === 2) {
  //       seriousNum++;
  //     }
  //   }
  //   if (normalNum === 0) {
  //     levelData.push({
  //       value: seriousNum,
  //       name: ' 低于阈值/紧急',
  //     });
  //   } else if (seriousNum === 0) {
  //     levelData.push({
  //       value: normalNum,
  //       name: ' 低于阈值/一般',
  //     });
  //   } else if (normalNum >= params.attributesValue  && seriousNum !== 0){
  //     levelData.push(
  //       {
  //         value: normalNum,
  //         name: '一般',
  //       },
  //       {
  //         value: seriousNum,
  //         name: '紧急',
  //       },
  //     );
  //   }

  //   return levelData;
  // };
  const getLevelData = (data: any) => {
    const blue = '#5470c6';
    const green = '#91cc75';
    const yellow = '#fac858';
    const red = '#ee6666';
    const levelData = [];
    let normalNumAlarm = 0;
    let seriousNumAlarm = 0;
    let seriousNumAlarmNo = 0;
    let normalNumAlarmNo = 0;
    const currentDataSource = getCurrentDataSource(data);

    for (let i = 0; i < currentDataSource.length; i++) {
      if (
        currentDataSource[i].level === 1 &&
        currentDataSource[i].alarmType === 1
      ) {
        normalNumAlarm++;
      } else if (
        currentDataSource[i].level === 2 &&
        currentDataSource[i].alarmType === 1
      ) {
        seriousNumAlarm++;
      } else if (
        currentDataSource[i].level === 1 &&
        currentDataSource[i].alarmType === 0
      ) {
        normalNumAlarmNo++;
      } else if (
        currentDataSource[i].level === 2 &&
        currentDataSource[i].alarmType === 0
      ) {
        seriousNumAlarmNo++;
      }
    }

    if (normalNumAlarm > 0) {
      levelData.push({
        value: normalNumAlarm,
        name: '高于阈值/一般',
        color: 'blue',
        itemStyle: {
          color: `${blue}`,
        },
      });
    }

    if (normalNumAlarmNo > 0) {
      levelData.push({
        value: normalNumAlarmNo,
        name: '低于阈值/一般',
        color: 'green',
        itemStyle: {
          color: `${green}`,
        },
      });
    }

    if (seriousNumAlarm > 0) {
      levelData.push({
        value: seriousNumAlarm,
        name: '高于阈值/紧急',
        color: 'red',
        itemStyle: {
          color: `${red}`,
        },
      });
    }

    if (seriousNumAlarmNo > 0) {
      levelData.push({
        value: seriousNumAlarmNo,
        name: '低于阈值/紧急',
        color: 'yellow',
        itemStyle: {
          color: `${yellow}`,
        },
      });
    }

    return levelData;
  };
  const getMeasureList = (data: any) => {
    const currentDataSource = getCurrentDataSource(data);
    let measureInitList = currentDataSource.map((item: { measure: any }) => {
      return item.measure;
    });
    measureInitList = getRepeatNum(measureInitList);
    const measureList = Object.keys(measureInitList);

    return measureList;
  };

  const getMeasureData = (data: any) => {
    // const measureData = [];
    const currentDataSource = getCurrentDataSource(data);
    let measureInitList = currentDataSource.map((item) => {
      const blue = '#5470c6';
      const green = '#91cc75';
      const yellow = '#fac858';
      const red = '#ee6666';
      let color;
      if (item.level === 1 && item.alarmType === 1) {
        color = blue;
      } else if (item.level === 2 && item.alarmType === 1) {
        color = red;
      } else if (item.level === 1 && item.alarmType === 0) {
        color = green;
      } else if (item.level === 2 && item.alarmType === 0) {
        color = yellow;
      }
      return {
        name: item.measure,
        color: color,
      };
    });
    // measureInitList = getRepeatNum(measureInitList);
    let measureList = getRepeatMeasure(measureInitList);
    console.log('measureList', measureList);
    // console.log('measureInitList', measureInitList);
    // for (const i in measureInitList) {
    //   const obj = {
    //     name: i,
    //     value: measureInitList[i],
    //   };
    //   measureData.push(obj);
    // }

    return measureList;
  };

  const getTopoGraph = (data: any, params: any) => {
    const blue = '#5470c6';
    const green = '#91cc75';
    const yellow = '#fac858';
    const red = '#ee6666';
    let nodesCount = 0; // 记录当前写入的nodes数目
    let categoriesNum = 0; // 记录所有categories数目作为links的增幅
    let categoriesCount = 0; // 记录单次遍历中已经遍历过的categories数目
    let count = 0; //记录当前循环次数
    const graph: any = {
      nodes: [
        {
          itemStyle: {
            opacity: 0, // 设置透明度为 0
          },
        },
      ],
      links: [],
    };
    // 填充nodes与links
    // push公司
    const corporationList = getAllCorporationList(data);
    //获取对应公司的索引
    const index = corporationList.findIndex(
      (item) => item == params.corporation,
    );
    for (let i = 0; i < corporationList.length; i++) {
      // if ((i = 0)) {
      //   graph.nodes.push({
      //     id: `${i + 1}`,
      //     name: `${corporationList[i]}`,
      //     draggable: true,
      //     colors: blue,
      //   });
      // }
      if (corporationList[i] == params.corporation) {
        graph.nodes.push({
          id: `${1}`,
          name: `${corporationList[i]}`,
          draggable: true,
          colors: blue,
        });
      }
    }
    nodesCount = graph.nodes.length;
    // push职位

    for (let j = 0; j < data[corporationList[index]].length; j++) {
      //记录当前循环次数
      count++;
      //如果等于或者超过10次，就跳出循环
      if (count > 10) {
        break;
      }
      graph.nodes.push({
        id: `${nodesCount + j}`,
        name: `${formatDate(data[corporationList[index]][j].eventTime)}/${
          productTypes[data[corporationList[index]][j].categories]
        }`,
        draggable: true,
        colors:
          data[corporationList[index]][j].level === 2
            ? red
            : data[corporationList[index]][j].level === 1
            ? green
            : yellow,
        // colors: data[corporationList[i]][j].alarmType === 1 ? red : data[corporationList[i]][j].alarmType === 0 ? yellow : green,
      });
      graph.links.push({
        source: `${1}`,
        target: `${nodesCount + j}`,
        relation: { name: formatLevel(data[corporationList[index]][j].level) },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      categoriesNum++;
    }
    nodesCount = graph.nodes.length;
    //清空当前循环次数
    count = 0;
    nodesCount = graph.nodes.length;
    // push疑似根因

    for (let j = 0; j < data[corporationList[index]].length; j++) {
      //记录当前循环次数
      count++;
      //如果等于或者超过10次，就跳出循环
      if (count > 10) {
        break;
      }
      graph.nodes.push({
        id: `${nodesCount + j}`,
        // name: `${data[corporationList[index]][j].causeType}`,
        name: `${'原因'}`,
        tooltipContent: `${data[corporationList[index]][j].causeType}`,
        draggable: true,
        colors:
          data[corporationList[index]][j].level === 2
            ? red
            : data[corporationList[index]][j].level === 1
            ? green
            : yellow,
        // colors: data[corporationList[i]][j].alarmType === 1 ? red : data[corporationList[i]][j].alarmType === 0 ? yellow : green,
      });
      graph.links.push({
        source: `${2 + j}`,
        target: `${nodesCount + j}`,
        relation: { name: '疑似根因' },
      });
      categoriesCount++;
    }
    nodesCount = graph.nodes.length;
    //清空当前循环次数
    count = 0;
    nodesCount = graph.nodes.length;
    // push决策措施
    categoriesCount = 0;

    for (let j = 0; j < data[corporationList[index]].length; j++) {
      //记录当前循环次数
      count++;
      //如果等于或者超过10次，就跳出循环
      if (count > 10) {
        break;
      }
      graph.nodes.push({
        id: `${nodesCount + j}`,
        // name: `${data[corporationList[index]][j].measure}`,
        name: `${'措施'}`, // 将 name 更改为数字
        tooltipContent: `${data[corporationList[index]][j].measure}`,
        draggable: true,
        colors:
          data[corporationList[index]][j].level === 2
            ? red
            : data[corporationList[index]][j].level === 1
            ? green
            : yellow,
        // colors: data[corporationList[i]][j].alarmType === 1 ? red : data[corporationList[i]][j].alarmType === 0 ? yellow : green,
      });
      graph.links.push({
        source: `${
          2 +
          (data[corporationList[index]].length > 10
            ? 10
            : data[corporationList[index]].length) +
          j
        }`,
        target: `${nodesCount + j}`,
        relation: { name: '决策措施' },
      });
      categoriesCount++;
    }
    nodesCount = graph.nodes.length;
    //清空当前循环次数
    count = 0;
    nodesCount = graph.nodes.length;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    categoriesCount = 0;

    // byd终于整出来了，累死了
    return graph;
  };

  const onFinish = () => {
    // setAlarmType(values.alarmType);
    const params = {
      time: formData.current.time,
      granularity: formData.current.granularity,
      categories: formData.current.categories,
      attributes: formData.current.attributes,
      corporation: formData.current.corporation, // 公司
      attributesValue: formData.current.attributesValue, // 阈值
    };
    // console.log("测试11",params,);

    getConveyDecision(params).then((res: any) => {
      // table根据当前表单公司来展示对应公司数据
      const currentDataSource: any = getCurrentDataSource(res.data);
      console.log('current', currentDataSource, formData.current.attributes);

      setDataSource(currentDataSource);
      // 填充圆环图数据
      const corporationList = getAllCorporationList(res.data);
      const corporationData = getCorporationData(res.data);
      const levelData = getLevelData(res.data);
      const measureList = getMeasureList(res.data);
      console.log('measureList', measureList);
      const measureData = getMeasureData(res.data);
      console.log('measureData', measureData);
      const graph = getTopoGraph(res.data, params);
      setCorporationOptions({
        title: {
          text: '决策对象',
          left: 'center',
          top: 'bottom',
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
          },
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: corporationList as any,
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: corporationData as any,
          },
        ],
      });
      setLevelOptions({
        tooltip: {
          trigger: 'item',
        },
        title: {
          text: '紧急程度',
          left: 'center',
          top: 'bottom',
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
          },
        },
        legend: {
          orient: 'vertical',
          left: '10%',
          top: '0%', // 设置图例距离底部的距离为10%
          padding: [0, 20, 50, 0], // 设置图例与图表上方的距离为10
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: levelData,
            center: ['60%', '50%'], // 设置饼状图的中心位置
            labelLine: { show: false },
            label: {
              show: false, // 隐藏标签
            },
          },
        ],
      });
      setMeasureOptions({
        tooltip: {
          trigger: 'item',
        },
        title: {
          text: '决策措施',
          left: 'center',
          top: 'bottom',
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
          },
        },
        legend: {
          // orient: 'vertical',
          // left: 'left',
          data: measureList,
          left: '0%',
          top: '0%', // 设置图例距离底部的距离为10%
          padding: [0, 20, 50, 0], // 设置图例与图表上方的距离为10
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            data: measureData,
            center: ['75%', '50%'], // 设置饼状图的中心位置
            labelLine: { show: false },
            label: {
              show: false, // 隐藏标签
            },
          },
        ] as any,
      });
      setTopoOptions({
        animationDuration: 300,
        animationEasingUpdate: 'cubicOut',
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.data.tooltipContent;
          },
        },
        series: [
          {
            name: 'Topo',
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            label: {
              show: true,
              position: 'inside',
              distance: 5,
              fontSize: 12,
              align: 'center',
            },

            symbolSize: 90,
            roam: true,
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [2, 8], // 两端大小
            cursor: 'pointer',
            force: {
              // 节点排斥力设置
              repulsion: 500, // 两个节点之间的距离
              gravity: 0,
              edgeLength: 100, //节点之间的斥力因子值
              friction: 1, // 节点的移动速度 取值0~1
              layoutAnimation: false,
            },
            itemStyle: {
              // normal: {
              // 不同节点显示不同颜色
              color: function (params: any) {
                return params.data.colors || '#5470c6'; //获取具体的参数
              },
              // },
            },
            lineStyle: {
              color: 'source',
              curveness: 0, // 线的曲率
            },
            edgeLabel: {
              // 边的设置（节点之间的关系）
              show: true,
              position: 'middle',
              fontSize: 12,
              formatter: (params: any) => {
                return params.data.relation.name;
              },
            },
          },
        ],
      });
    });
  };

  return (
    <Fragment>
      <div
        css={{
          position: 'relative',
          height: '36px',
        }}
      >
        <div
          css={{
            display: 'inline-block',
            position: 'absolute',
            padding: '0 20px',
            left: '0',
            border: '1px solid #d4d4d4',
            fontSize: '16px',
            lineHeight: '36px',
            color: '#1677ff',
          }}
        >
          物流链决策分析
        </div>
        <div
          css={{
            display: 'inline-block',
            position: 'absolute',
            lineHeight: '36px',
            right: '0',
          }}
        >
          <Form
            layout="inline"
            // initialValues={{ granularity: 1, time: 1690946777 }}
            onFinish={onFinish}
            css={{
              display: 'inline-flex',
            }}
          >
            <Form.Item>
              {/* <Button type="primary" htmlType="submit">
                生成决策
              </Button> */}
            </Form.Item>
          </Form>
        </div>
      </div>
      <DecisionOperation
        firstLevelPathKey={firstLevelPathKey}
        decisionSubmit={onFinish}
      />
      <div
        css={{
          marginTop: '10px',
          padding: '20px 20px',
          fontsize: '18px',
          fontWeight: '800',
          color: '#396685',
        }}
      >
        <h1>1. 物流链决策措施及响应程度</h1>
      </div>
      <div
        css={{
          marginTop: '10px',
        }}
      >
        <Table dataSource={dataSource} columns={columns} rowKey="id" />
      </div>
      <div
        css={{
          marginTop: '10px',
          padding: '20px 20px',
          fontsize: '18px',
          fontWeight: '800',
          color: '#396685',
        }}
      >
        <h1> 2. 物流链决策分析</h1>
      </div>
      <div
        css={{
          marginTop: '5px',
          display: 'flex',
        }}
      >
        {/* <Charts
          options={corporationOptions}
          style={{
            height: '300px',
            width: '50%',
          }}
        /> */}
        <Charts
          options={levelOptions}
          style={{
            height: '400px',
            width: '40%',
          }}
        />
        <Charts
          options={measureOptions}
          style={{
            height: '400px',
            width: '55%',
          }}
        />
      </div>
      {/* <div
        css={{
          marginTop: '10px',
          padding: '20px 20px',
          fontsize: '18px',
          fontWeight: '800',
          color: '#396685',
        }}
      >
        <h1>3. 物流链拓扑</h1>
      </div>

      <div>
        <Charts
          options={measureOptions}
          style={{
            height: '300px',
            width: '100%',
          }}
        />
      </div>

      <div>
        <Charts
          options={topoOptions}
          style={{
            height: '1400px',
            width: '100%',
          }}
        />
      </div> */}
    </Fragment>
  );
};

export default Convey;
