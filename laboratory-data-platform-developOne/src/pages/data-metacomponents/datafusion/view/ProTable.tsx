import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { employeePositions, employee, transportationModes, transportedGoods, productTypes, products, soldProducts } from '../../../../utils/constant';
interface DataType {
  id: number;
  corporation: string;
  categories: number;
  positions: number;
  skill: string;
  amount: number;
  eventTime: number;
  updateTime: number;
  types: number;
}

// 格式化事件时间戳
const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // 将时间戳转换为Date对象
  const year = date.getFullYear();
  const month: any = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，并补0
  const day: any = (date.getDate() + 1).toString().padStart(2, '0');

  return `${year}-${month}-${day}`
}

const columnsStaff: ColumnsType<DataType> = [
  // {
  //     title: 'id',
  //     dataIndex: 'id',
  //     key: 'id',
  //   },
  {
    title: '企业名称',
    dataIndex: 'corporation',
    key: 'corporation',
  },
  {
    title: '类别',
    dataIndex: 'categories',
    key: 'categories',
  },
  {
    title: '员工职位',
    dataIndex: 'positions',
    key: 'positions',
  },
  {
    title: '员工技能',
    dataIndex: 'skill',
    key: 'skill',
  },
  {
    title: '员工数量',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '事件时间',
    dataIndex: 'eventTime',
    key: 'eventTime',
    render: (text: number) => {
      const time: string = formatDate(text);
      return time;
    }
  },

];

const columnsWealth = [
  {
    title: '单位名称',
    dataIndex: 'corporation',
    key: 'corporation',
  },
  {
    title: '时间',
    dataIndex: 'eventTime',
    key: 'eventTime',
    render: (text: number) => {
      const date: string = formatDate(text);
      return <span>{date}</span>
    }
  },
  {
    title: '研发支出',
    dataIndex: 'research',
    key: 'research',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '设备支出',
    dataIndex: 'device',
    key: 'device',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '生产支出',
    dataIndex: 'production',
    key: 'production',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '仓储支出',
    dataIndex: 'storage',
    key: 'storage',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '物料支出',
    dataIndex: 'materiel',
    key: 'materiel',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '运输支出',
    dataIndex: 'transportation',
    key: 'transportation',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '人员工资支出',
    dataIndex: 'salary',
    key: 'salary',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '总收入',
    dataIndex: 'revenue',
    key: 'revenue',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '利润',
    dataIndex: 'profit',
    key: 'profit',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '固定资产',
    dataIndex: 'fixedAssets',
    key: 'fixedAssets',
    render: (text: number) => {
      return <span >{text}</span>
    }
  },
  {
    title: '流动资产',
    dataIndex: 'cashAssets',
    key: 'cashAssets',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '融资',
    dataIndex: 'finance',
    key: 'finance',
    render: (text: number) => {
      return <span >{text}</span>
    }
  },
];

const columnsConvey = [
  {
    title: '单位名称',
    dataIndex: 'corporation',
    key: 'corporation',
  },
  {
    title: '时间',
    dataIndex: 'eventTime',
    key: 'eventTime',
    render: (text: number) => {
      const date: string = formatDate(text);
      return <span>{date}</span>
    }
  },
  {
    title: '运输工具',
    dataIndex: 'categories',
    key: 'categories',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '运输货物',
    dataIndex: 'types',
    key: 'types',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '运输量（万吨）',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '剩余库存（万吨）',
    dataIndex: 'inventory',
    key: 'inventory',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '运输里程（公里）',
    dataIndex: 'mileage',
    key: 'mileage',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '运输花费（万元）',
    dataIndex: 'cost',
    key: 'cost',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
];

const columnsProduction = [
  {
    title: '单位名称',
    dataIndex: 'corporation',
    key: 'corporation',
  },
  {
    title: '时间',
    dataIndex: 'eventTime',
    key: 'eventTime',
    render: (text: number) => {
      const date: string = formatDate(text);
      return <span>{date}</span>
    }
  },
  {
    title: '产品类型',
    dataIndex: 'categories',
    key: 'categories',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '产品',
    dataIndex: 'types',
    key: 'types',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '产量（万吨）',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '生产费用（万元）',
    dataIndex: 'cost',
    key: 'cost',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '原产省份',
    dataIndex: 'province',
    key: 'province',
    render: (text: string) => {
      return <span>{text}</span>
    }
  },
  {
    title: '原产国家',
    dataIndex: 'country',
    key: 'country',
    render: (text: string) => {
      return <span>{text}</span>
    }
  },
  {
    title: '产品质量',
    dataIndex: 'quality',
    key: 'quality',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
];

const columnsSale = [
  {
    title: '单位名称',
    dataIndex: 'corporation',
    key: 'corporation',
  },
  {
    title: '时间',
    dataIndex: 'eventTime',
    key: 'eventTime',
    render: (text: number) => {
      const date: string = formatDate(text);
      return <span>{date}</span>
    }
  },
  {
    title: '产品类型',
    dataIndex: 'categories',
    key: 'categories',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '销售产品',
    dataIndex: 'types',
    key: 'types',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '销量',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '销售营收',
    dataIndex: 'income',
    key: 'income',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '销售支出',
    dataIndex: 'cost',
    key: 'cost',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '销售省份',
    dataIndex: 'province',
    key: 'province',
    render: (text: string) => {
      return <span>{text}</span>
    }
  },
  {
    title: '销售国家',
    dataIndex: 'country',
    key: 'country',
    render: (text: string) => {
      return <span>{text}</span>
    }
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    key: 'inventory',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
  {
    title: '服务评价',
    dataIndex: 'score',
    key: 'score',
    render: (text: number) => {
      return <span>{text}</span>
    }
  },
];

interface Iprops {
  url: string;
}

const App: React.FC<Iprops> = ({ url }: Iprops) => {

  const [data, setData] = useState<DataType[]>([]);
  // console.log(url);

  useEffect(() => {
    fetch(`http://8.134.59.53/rest/data/element/${url}/fusion/query?statement=&types=1&limit=999&offset=0`).then((res) => {
      // console.log(res);

      return res.json()

    }).then((res) => {
      const newData = res[`${url}s`];
      const nextData: DataType[] = newData.map((item: DataType) => {
        // console.log(url)
        if (url == 'staff') {
          for (const key in employeePositions) {


            item.positions = item.positions == Number(key) ? employeePositions[key] : item.positions;
            if (item.positions == employeePositions[key]) break;
          }
          for (const key in employee) {
            item.categories = item.categories == Number(key) ? employee[key] : item.categories;

            if (item.categories == employee[key]) break;
          }
        } else if (url == 'convey') {
          for (const key in transportationModes) {

            item.categories = item.categories == Number(key) ? transportationModes[key] : item.categories;
            if (item.categories == transportationModes[key]) break;
          }
          for (const key in transportedGoods) {
            item.types = item.types == Number(key) ? transportedGoods[key] : item.types;

            if (item.types == transportedGoods[key]) break;
          }
        } else if (url == 'production') {
          for (const key in productTypes) {

            item.categories = item.categories == Number(key) ? productTypes[key] : item.categories;
            if (item.categories == productTypes[key]) break;
          }
          for (const key in products) {
            item.types = item.types == Number(key) ? products[key] : item.types;

            if (item.types == products[key]) break;
          }
        } else if (url == 'sale') {
          for (const key in productTypes) {

            item.categories = item.categories == Number(key) ? productTypes[key] : item.categories;
            if (item.categories == productTypes[key]) break;
          }
          for (const key in soldProducts) {
            item.types = item.types == Number(key) ? soldProducts[key] : item.types;
            if (item.types == soldProducts[key]) break;
          }
        }
        return item
      });
      setData(nextData);
    })
  }, [url])                                         


  return <>
    <Table
      columns={
        url === 'staff' ?
          columnsStaff :
          url === 'wealth' ?
            columnsWealth :
            url === 'convey' ?
              columnsConvey :
              url === 'production' ?
                columnsProduction :
                url === 'sale' ?
                  columnsSale :
                  columnsStaff
      }
      dataSource={data}
    />
  </>
};

export default App;