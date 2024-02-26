import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ProTable from "./ProTable";
// import type { FC } from "react";

const onChange = (_key: string) => {
  console.log(_key);
};

enum urls {
  'production' = "production",
  'sale' = 'sale',
  'wealth' = 'wealth',
  'staff' = 'staff',
  'convey' = 'convey',

}
console.log(urls['production' as keyof typeof urls]);


const items: TabsProps['items'] = [
  {
    key: '1',
    label: '人力链',
    children: <ProTable url={urls['staff' as keyof typeof urls]} />,
  },
  {
    key: '2',
    label: '资金链',
    children: <ProTable url={urls['wealth' as keyof typeof urls]} />,
  },
  {
    key: '3',
    label: '物流链',
    children: <ProTable url={urls['convey' as keyof typeof urls]} />,
  },
  {
    key: '4',
    label: '生产链',
    children: <ProTable url={urls['production' as keyof typeof urls]} />,
  },
  {
    key: '5',
    label: '销售链',
    children: <ProTable url={urls['sale' as keyof typeof urls]} />,
  },
];

const ProTab = () => {
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  )
}

export default ProTab;